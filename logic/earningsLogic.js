import { formatCurrency } from "../utils/currencyFormat";
import { getWorkDays } from "./calendarLogic";

export const getWorkHours = (workHoursPerDay, workDays, nonCommissionedHours) =>
  workHoursPerDay * workDays - nonCommissionedHours;

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getGrossIncome = (workHours, hourlyRate, commission) =>
  (Math.round((workHours * hourlyRate * commission + Number.EPSILON) * 100) / 100).toFixed(2);

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getNetIncome = (grossIncome, tax) =>
  (Math.round((grossIncome - grossIncome * tax + Number.EPSILON) * 100) / 100).toFixed(2);

export const getEarningsForMonth = (
  month,
  workHoursPerDay,
  hourlyRate,
  commission,
  tax,
  nonCommissionedHours
) => {
  const workDays = getWorkDays(month);
  const workHours = getWorkHours(workHoursPerDay, workDays.length, nonCommissionedHours);
  const gross = getGrossIncome(workHours, hourlyRate, commission);
  return {
    monthName: month.month,
    payDay: month.payDay.formattedLongDate,
    workDays,
    workHours,
    gross: formatCurrency(gross),
    net: formatCurrency(getNetIncome(gross, tax))
  };
};
