export const getWorkHours = (workHoursPerDay, workDays, nonCommissionedHours) =>
  workHoursPerDay * workDays - nonCommissionedHours;

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getGrossIncome = (workHours, hourlyRate, commission) =>
  (Math.round((workHours * hourlyRate * commission + Number.EPSILON) * 100) / 100).toFixed(2);

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const getNetIncome = (grossIncome, tax) =>
  (Math.round((grossIncome - grossIncome * tax + Number.EPSILON) * 100) / 100).toFixed(2);
