import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { getEarningsForMonth, getEarningsForYear } from "@/logic/earningsLogic";

export const userIsAdmin = user => user?.isAdmin ?? false;
export const userIsSpecialist = user => user?.isSpecialist ?? false;

export const getUserSalaryDetails = user => ({
  hourlyRate: user?.hourlyRate ?? DEFAULT_USER_SALARY.hourlyRate,
  commission: user?.commission ?? DEFAULT_USER_SALARY.commission,
  tax: user?.tax ?? DEFAULT_USER_SALARY.tax
});

export const getUserEarningsDetails = (
  userSalaryDetails,
  year,
  nextYear,
  monthDetail,
  currentMonthDetail,
  lastMonthDetail,
  nextMonthDetail,
  nonCommissionedHours = 0
) => {
  const { hourlyRate, commission, tax } = userSalaryDetails;

  const monthStatistics = getEarningsForMonth(
    monthDetail,
    hourlyRate,
    commission,
    tax,
    nonCommissionedHours
  );

  const currentMonthStatistics = getEarningsForMonth(
    currentMonthDetail,
    hourlyRate,
    commission,
    tax,
    nonCommissionedHours
  );

  const lastMonthStatistics = getEarningsForMonth(
    lastMonthDetail,
    hourlyRate,
    commission,
    tax,
    nonCommissionedHours
  );
  const nextMonthStatistics = getEarningsForMonth(
    nextMonthDetail,
    hourlyRate,
    commission,
    tax,
    nonCommissionedHours
  );

  return {
    nonCommissionedHours,
    monthStatistics,
    currentMonthStatistics,
    lastMonthStatistics,
    nextMonthStatistics,
    nextPayDayStatistics: new Date().getDate() > 20 ? currentMonthStatistics : lastMonthStatistics,
    // TODO: To be able to calculate yearly salary and include non commissioned hours
    // we need to change the logic to store non commissioned hours per month
    yearSalaryStatistics: getEarningsForYear(year, hourlyRate, commission, tax, 0),
    // TODO: To be able to calculate yearly salary and include non commissioned hours
    // we need to change the logic to store non commissioned hours per month
    nextYearSalaryStatistics: getEarningsForYear(nextYear, hourlyRate, commission, tax, 0)
  };
};
