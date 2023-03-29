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

const getHolidayPay = (gross: number): number => {
  return gross * EARNING_CONSTANTS.WORK_HOLIDAY_PAY;
};

export const getWorkHours = (
  workHours: number,
  workDays: number,
  nonCommissionedHours: number,
  extraHours: number
): number => {
  const regularWorkHours = workHours * workDays;
  const regularWorkHoursWithExtraHours = regularWorkHours + Math.max(0, +extraHours);

  return regularWorkHoursWithExtraHours - Math.max(0, +nonCommissionedHours);
};

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getGrossIncome = (
  workHours: number = 0,
  hourlyRate: number,
  commission: number,
  sickHours: number = 0
): number => {
  const grossCommissionedWorkHours: number = +(
    Math.round((workHours * hourlyRate * commission + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  const grossSickHours: number = +(
    Math.round((sickHours * EARNING_CONSTANTS.WORK_SICK_PAY_PER_HOUR + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  return grossCommissionedWorkHours + grossSickHours;
};

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getNetIncome = (grossIncome: number, tax: number): number =>
  +(Math.round((grossIncome - grossIncome * tax + Number.EPSILON) * 100) / 100).toFixed(2);

const getNonCommissionedHoursForMonth = (
  month: CalendarMonth,
  workDayDetails: UserWorkDayDetail[]
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
  workDayDetails: UserWorkDayDetail[],
  useMaxSickHours: boolean = false
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

const getExtraHoursForMonth = (month: CalendarMonth, workDayDetails: UserWorkDayDetail[]) => {
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
  workDayDetails: UserWorkDayDetail[],
  taxTable?: string
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
    ? gross - getTableTax(taxTable, gross)
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
  taxTable?: string
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
        totalGross: (result?.totalGross ?? 0) + earningsForMonth.gross,
        totalNet: (result?.totalNet ?? 0) + earningsForMonth.net
      };
    },
    {
      totalWorkDays: 0,
      totalWorkHours: 0,
      totalGross: 0,
      totalNet: 0
    }
  );

  const workDaysWithoutVacation =
    totalWorkDays > EARNING_CONSTANTS.WORK_VACATION_DAYS
      ? totalWorkDays - EARNING_CONSTANTS.WORK_VACATION_DAYS
      : totalWorkDays;
  const workHoursWithoutVacation = getWorkHours(workHours, workDaysWithoutVacation, 0, 0);

  const grossByDay = totalGross / totalWorkDays;
  const grossSubtractedByVacation = grossByDay * workDaysWithoutVacation;

  const holidayPay = getHolidayPay(grossSubtractedByVacation);

  const grossWithHolidayPay = grossSubtractedByVacation + holidayPay;

  const netByDay = totalNet / totalWorkDays;
  const netSubtractedByVacation = netByDay * workDaysWithoutVacation;

  // average tax percent between gross and net
  const averageTaxPercent = (totalGross - totalNet) / totalGross;

  // Lazily calculate net with holiday pay by using average tax percent
  const net = netSubtractedByVacation + holidayPay * averageTaxPercent;

  return {
    year: year?.year,
    workDays: workDaysWithoutVacation,
    workHours: workHoursWithoutVacation,
    gross: grossWithHolidayPay,
    net,
    grossFormatted: formatCurrency(grossWithHolidayPay),
    netFormatted: formatCurrency(net)
  };
};
