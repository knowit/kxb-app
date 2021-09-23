import EARNING_CONSTANTS from "@/constants/earningConstants";
import { getWorkDays } from "@/logic/calendarLogic";
import { formatCurrency } from "@/utils/currencyFormat";

const getHolidayPay = gross => {
  return gross * EARNING_CONSTANTS.WORK_HOLIDAY_PAY;
};

export const getWorkHours = (workDays = 0, nonCommissionedHours = 0, extraHours = 0) => {
  const regularWorkHours = EARNING_CONSTANTS.WORK_HOURS_PER_DAY * workDays;
  const regularWorkHoursWithExtraHours = regularWorkHours + Math.max(0, +extraHours);

  return regularWorkHoursWithExtraHours - Math.max(0, +nonCommissionedHours);
};

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getGrossIncome = (workHours = 0, hourlyRate, commission) =>
  +(Math.round((workHours * hourlyRate * commission + Number.EPSILON) * 100) / 100).toFixed(2);

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getNetIncome = (grossIncome, tax) =>
  +(Math.round((grossIncome - grossIncome * tax + Number.EPSILON) * 100) / 100).toFixed(2);

const getNonCommissionedHoursForMonth = (month, workDayDetails) => {
  return (
    month.days.reduce(
      (sum, day) =>
        (sum +=
          workDayDetails?.find(workDayDetail => workDayDetail.date === day.formattedDate)
            ?.nonCommissionedHours ?? 0),
      0
    ) ?? 0
  );
};

const getExtraHoursForMonth = (month, workDayDetails) => {
  return (
    month.days.reduce(
      (sum, day) =>
        (sum +=
          workDayDetails?.find(workDayDetail => workDayDetail.date === day.formattedDate)
            ?.extraHours ?? 0),
      0
    ) ?? 0
  );
};

export const getEarningsForMonth = (month, hourlyRate, commission, tax, workDayDetails) => {
  const workDays = getWorkDays(month);
  const nonCommissionedHoursForMonth = getNonCommissionedHoursForMonth(month, workDayDetails);
  const extraHours = getExtraHoursForMonth(month, workDayDetails);

  const workHours = getWorkHours(workDays.length, nonCommissionedHoursForMonth, extraHours);
  const gross = getGrossIncome(workHours, hourlyRate, commission);
  const net = getNetIncome(gross, tax);

  return {
    monthName: month?.month,
    payDay: month?.payDay?.formattedShortDate,
    workDays,
    workHours,
    gross,
    net,
    grossFormatted: formatCurrency(gross),
    netFormatted: formatCurrency(getNetIncome(gross, tax))
  };
};

export const getEarningsForYear = (year, hourlyRate, commission, tax, workDayDetails) => {
  const { workDays } = (year?.months ?? []).reduce((result, month) => {
    const earningsForMonth = getEarningsForMonth(
      month,
      hourlyRate,
      commission,
      tax,
      workDayDetails
    );

    return {
      workDays: (result?.workDays ?? 0) + earningsForMonth.workDays.length,
      workHours: (result?.workHours ?? 0) + earningsForMonth.workHours
    };
  }, {});

  const workDaysWithoutVacation =
    workDays > EARNING_CONSTANTS.WORK_VACATION_DAYS
      ? workDays - EARNING_CONSTANTS.WORK_VACATION_DAYS
      : workDays;
  const workHoursWithoutVacation = getWorkHours(workDaysWithoutVacation, 0, 0);

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
