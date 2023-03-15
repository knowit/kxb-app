import EARNING_CONSTANTS from "@/constants/earning-constants";
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
  workDayDetails: UserWorkDayDetail[]
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
  const net = getNetIncome(gross, taxConsideredHalfTax);

  return {
    monthName: month?.month,
    payDay: month?.payDay?.formattedShortDate ?? "none",
    workDays,
    workHours: totalWorkHours,
    gross,
    net,
    grossFormatted: formatCurrency(gross),
    netFormatted: formatCurrency(getNetIncome(gross, taxConsideredHalfTax)),
    halfTax: month.halfTax
  };
};

export const getEarningsForYear = (
  year: CalendarYear,
  hourlyRate: number,
  commission: number,
  tax: number,
  workHours: number,
  workDayDetails: UserWorkDayDetail[]
): CalendarYearEarnings => {
  const { workDays } = (year?.months ?? []).reduce(
    (result, month) => {
      const earningsForMonth = getEarningsForMonth(
        month,
        hourlyRate,
        commission,
        tax,
        workHours,
        workDayDetails
      );

      return {
        workDays: (result?.workDays ?? 0) + earningsForMonth.workDays.length,
        workHours: (result?.workHours ?? 0) + earningsForMonth.workHours
      };
    },
    {
      workDays: 0,
      workHours: 0
    }
  );

  const workDaysWithoutVacation =
    workDays > EARNING_CONSTANTS.WORK_VACATION_DAYS
      ? workDays - EARNING_CONSTANTS.WORK_VACATION_DAYS
      : workDays;
  const workHoursWithoutVacation = getWorkHours(workHours, workDaysWithoutVacation, 0, 0);

  const gross = getGrossIncome(workHoursWithoutVacation, hourlyRate, commission);
  const grossWithHolidayPay = gross + getHolidayPay(gross);

  const net = getNetIncome(grossWithHolidayPay, tax);

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
