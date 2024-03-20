import { EARNING_CONSTANTS } from "@/constants/earning-constants";
import { getWorkDays } from "@/logic/calendar-logic";
import {
  CalendarDay,
  CalendarMonth,
  CalendarMonthEarnings,
  CalendarYear,
  CalendarYearEarnings,
  UserWorkDayDetail
} from "@/types";
import { formatCurrency } from "@/utils/currency-format";
import { getTableTax } from "@/utils/tax-utils";
import Big from "big.js";
import { SelectUserWorkDayDetail } from "../lib/db/schema";

const getHolidayPay = (gross: Big): Big => {
  return gross.times(EARNING_CONSTANTS.WORK_HOLIDAY_PAY);
};

export const getWorkHours = (
  workHours: number,
  workDays: number,
  nonCommissionedHours: number,
  extraHours: number
): number => {
  const regularWorkHours = workHours * workDays;
  const regularWorkHoursWithExtraHours = regularWorkHours + Math.max(0, +extraHours);

  const totalWorkHours = regularWorkHoursWithExtraHours - Math.max(0, +nonCommissionedHours);
  if (isNaN(totalWorkHours)) {
    console.log("🚀 ~ totalWorkHours1:", totalWorkHours);
  }
  return totalWorkHours;
};

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getGrossIncome = (
  workHours: number = 0,
  hourlyRate: number,
  commission: number,
  sickHours: number = 0
): Big => {
  const grossCommissionedWorkHours = new Big(isNaN(workHours) ? 0 : workHours)
    .times(hourlyRate)
    .times(commission)
    .round(2, 0);

  const grossSickHours = new Big(sickHours)
    .times(EARNING_CONSTANTS.WORK_SICK_PAY_PER_HOUR)
    .round(2, 0);

  return grossCommissionedWorkHours.plus(grossSickHours);
};

export const getNetIncome = (grossIncome: Big, tax: number): Big =>
  grossIncome.minus(new Big(grossIncome).times(tax));

const getNonCommissionedHoursForMonth = (
  month: CalendarMonth,
  workDayDetails: SelectUserWorkDayDetail[]
): number => {
  return (
    month.days.reduce<number>(
      (sum: number, day: CalendarDay) =>
        (sum +=
          workDayDetails?.find(
            workDayDetail => workDayDetail.date === day.formattedDate && !workDayDetail.sickDay
          )?.nonCommissionedHours ?? 0),
      0
    ) ?? 0
  );
};

// When calculating work hours per day, we need to take into account all work hours
// for the user. But when we calculate sick hours per day for gross income, we need
// to cap the sick hours to the max number of work hours per day that the employer
// will cover i.e. 7.5 hours per day.
const getSickHoursForMonth = (
  month: CalendarMonth,
  workDayDetails: SelectUserWorkDayDetail[],
  useMaxSickHours: boolean = true
): number => {
  return (
    month.days.reduce<number>((sum: number, day: CalendarDay) => {
      let nonCommissionedHours =
        workDayDetails?.find(
          workDayDetail => workDayDetail.date === day.formattedDate && workDayDetail.sickDay
        )?.nonCommissionedHours ?? 0;

      nonCommissionedHours =
        useMaxSickHours && nonCommissionedHours > EARNING_CONSTANTS.WORK_HOURS_PER_DAY
          ? EARNING_CONSTANTS.WORK_HOURS_PER_DAY
          : nonCommissionedHours;

      return (sum += nonCommissionedHours);
    }, 0) ?? 0
  );
};

const getExtraHoursForMonth = (month: CalendarMonth, workDayDetails: SelectUserWorkDayDetail[]) => {
  return (
    month.days.reduce(
      (sum: number, day: CalendarDay) =>
        (sum +=
          workDayDetails?.find(workDayDetail => workDayDetail.date === day.formattedDate)
            ?.extraHours ?? 0),
      0
    ) ?? 0
  );
};

export const getEarningsForMonth = (
  month: CalendarMonth,
  hourlyRate: number,
  commission: number,
  tax: number,
  workHours: number,
  workDayDetails: SelectUserWorkDayDetail[],
  taxTable: string | null
): CalendarMonthEarnings => {
  const workDays = getWorkDays(month);
  const nonCommissionedHoursForMonth = getNonCommissionedHoursForMonth(month, workDayDetails);
  const sickHoursForMonth = getSickHoursForMonth(month, workDayDetails);
  const extraHours = getExtraHoursForMonth(month, workDayDetails);

  const taxConsideredHalfTax = month.halfTax ? tax / 2 : tax;

  const totalWorkHours = getWorkHours(
    workHours,
    workDays.length,
    nonCommissionedHoursForMonth + sickHoursForMonth,
    extraHours
  );

  const gross = getGrossIncome(
    totalWorkHours,
    hourlyRate,
    commission,
    getSickHoursForMonth(month, workDayDetails, true)
  );

  const net = taxTable
    ? gross.minus(
        month.halfTax ? getTableTax(taxTable, gross).div(2) : getTableTax(taxTable, gross)
      )
    : getNetIncome(gross, taxConsideredHalfTax);

  return {
    monthName: month?.month,
    payDay: month?.payDay?.formattedShortDate ?? "none",
    workDays,
    workHours: totalWorkHours,
    gross,
    net,
    grossFormatted: formatCurrency(gross),
    netFormatted: formatCurrency(net),
    halfTax: month.halfTax
  };
};

// TODO: Includes some hacks to get gross and net without using vacation days
// should traverse the calendar and send EARNING_CONSTANTS.WORK_VACATION_DAYS
// into work day details as non commissioned hours
export const getEarningsForYear = (
  year: CalendarYear,
  hourlyRate: number,
  commission: number,
  tax: number,
  workHours: number,
  workDayDetails: UserWorkDayDetail[],
  taxTable: string | null
): CalendarYearEarnings => {
  const { totalWorkDays, totalWorkHours, totalNet, totalGross } = (year?.months ?? []).reduce(
    (result, month) => {
      const earningsForMonth = getEarningsForMonth(
        month,
        hourlyRate,
        commission,
        tax,
        workHours,
        [],
        taxTable
      );

      return {
        totalWorkDays: (result?.totalWorkDays ?? 0) + earningsForMonth.workDays.length,
        totalWorkHours: (result?.totalWorkHours ?? 0) + earningsForMonth.workHours,
        totalGross: result.totalGross.plus(earningsForMonth.gross),
        totalNet: result.totalNet.plus(earningsForMonth.net)
      };
    },
    {
      totalWorkDays: 0,
      totalWorkHours: 0,
      totalGross: new Big(0),
      totalNet: new Big(0)
    }
  );

  const workDaysWithoutVacation =
    totalWorkDays > EARNING_CONSTANTS.WORK_VACATION_DAYS
      ? totalWorkDays - EARNING_CONSTANTS.WORK_VACATION_DAYS
      : totalWorkDays;
  const workHoursWithoutVacation = getWorkHours(workHours, workDaysWithoutVacation, 0, 0);

  const grossByDay = totalGross.div(totalWorkDays);
  const grossSubtractedByVacation = grossByDay.times(workDaysWithoutVacation);

  const holidayPay = getHolidayPay(grossSubtractedByVacation);

  const gross = grossSubtractedByVacation.plus(holidayPay);

  const netByDay = totalNet.div(totalWorkDays);
  const netSubtractedByVacation = netByDay.times(workDaysWithoutVacation);

  // average tax percent between gross and net
  const averageTaxPercent = totalGross.minus(totalNet).div(totalGross);

  // Lazily calculate net with holiday pay by using average tax percent
  const net = netSubtractedByVacation.plus(holidayPay.times(averageTaxPercent));

  return {
    year: year?.year,
    workDays: workDaysWithoutVacation,
    workHours: workHoursWithoutVacation,
    gross,
    net,
    grossFormatted: formatCurrency(gross),
    netFormatted: formatCurrency(net)
  };
};
