import { DEFAULT_USER_SALARY } from "@/constants/default-user-salary";
import { SITE_CONSTANTS } from "@/constants/site-constants";
import { getEarningsForMonth, getEarningsForYear } from "@/logic/earnings-logic";
import {
  CalendarMonth,
  CalendarYear,
  User,
  UserEarningsDetails,
  UserSalaryDetails,
  UserWorkDayDetail
} from "@/types";
import { JWT } from "next-auth/jwt";

export const getUserSalaryDetails = (user: User): UserSalaryDetails => ({
  hourlyRate: user?.hourlyRate ?? DEFAULT_USER_SALARY.hourlyRate,
  commission: user?.commission ?? DEFAULT_USER_SALARY.commission,
  tax: user?.tax ?? DEFAULT_USER_SALARY.tax,
  workHours: user?.workHours ?? DEFAULT_USER_SALARY.workHours,
  taxTable: user?.taxTable ?? null
});

export const getUserEarningsDetails = (
  userSalaryDetails: UserSalaryDetails,
  year: CalendarYear,
  nextYear: CalendarYear,
  activeCalendarMonthDetail: CalendarMonth,
  currentMonthDetail: CalendarMonth,
  lastMonthDetail: CalendarMonth,
  nextMonthDetail: CalendarMonth,
  workDayDetails: UserWorkDayDetail[] = []
): UserEarningsDetails => {
  const { hourlyRate, commission, tax, workHours, taxTable } = userSalaryDetails;

  const activeCalendarMonthStatistics = getEarningsForMonth(
    activeCalendarMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails,
    taxTable
  );

  const currentMonthStatistics = getEarningsForMonth(
    currentMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails,
    taxTable
  );

  const lastMonthStatistics = getEarningsForMonth(
    lastMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails,
    taxTable
  );
  const nextMonthStatistics = getEarningsForMonth(
    nextMonthDetail,
    hourlyRate,
    commission,
    tax,
    workHours,
    workDayDetails,
    taxTable
  );

  return {
    workDayDetails,
    activeCalendarMonthStatistics,
    currentMonthStatistics,
    lastMonthStatistics,
    nextMonthStatistics,
    nextPayDayStatistics: new Date().getDate() > 20 ? currentMonthStatistics : lastMonthStatistics,
    // TODO: To be able to calculate yearly salary and include non commissioned hours
    // we need to change the logic to store non commissioned hours per month
    yearSalaryStatistics: getEarningsForYear(
      year,
      hourlyRate,
      commission,
      tax,
      workHours,
      workDayDetails,
      taxTable
    ),
    // TODO: To be able to calculate yearly salary and include non commissioned hours
    // we need to change the logic to store non commissioned hours per month
    nextYearSalaryStatistics: getEarningsForYear(
      nextYear,
      hourlyRate,
      commission,
      tax,
      workHours,
      workDayDetails,
      taxTable
    )
  };
};

export const userIsSalesPerson = (token: JWT) =>
  token?.email !== undefined &&
  token?.email !== null &&
  process.env.SALES_EMAILS.split(SITE_CONSTANTS.SALES_EMAILS_DELIMITER).includes(token.email);
