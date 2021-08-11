import { getWorkDays } from "@/logic/calendarLogic";
import { formatCurrency } from "@/utils/currencyFormat";

const WORK_HOURS_PER_DAY = 7.5;
const WORK_VACATION_DAYS = 25;
const WORK_HOLIDAY_PAY = 0.12;

const getHolidayPay = gross => {
  return gross * WORK_HOLIDAY_PAY;
};

export const getWorkHours = (workDays = 0, nonCommissionedHours) =>
  WORK_HOURS_PER_DAY * workDays - nonCommissionedHours;

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getGrossIncome = (workHours = 0, hourlyRate, commission) =>
  +(Math.round((workHours * hourlyRate * commission + Number.EPSILON) * 100) / 100).toFixed(2);

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getNetIncome = (grossIncome, tax) =>
  +(Math.round((grossIncome - grossIncome * tax + Number.EPSILON) * 100) / 100).toFixed(2);

export const getEarningsForMonth = (month, hourlyRate, commission, tax, nonCommissionedHours) => {
  const workDays = getWorkDays(month);
  const workHours = getWorkHours(workDays.length, nonCommissionedHours);
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

export const getEarningsForYear = (year, hourlyRate, commission, tax, nonCommissionedHours) => {
  const { workDays } = (year?.months ?? []).reduce((result, month) => {
    const earningsForMonth = getEarningsForMonth(
      month,
      hourlyRate,
      commission,
      tax,
      nonCommissionedHours
    );

    return {
      workDays: (result?.workDays ?? 0) + earningsForMonth.workDays.length,
      workHours: (result?.workHours ?? 0) + earningsForMonth.workHours
    };
  }, {});

  const workDaysWithoutVacation =
    workDays > WORK_VACATION_DAYS ? workDays - WORK_VACATION_DAYS : workDays;
  const workHoursWithoutVacation = getWorkHours(workDaysWithoutVacation, nonCommissionedHours);

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
