/// <reference types="node" />

import { Prisma } from ".prisma/client";
import { Session, TokenSet } from "next-auth";

export type UserWorkDayDetail = {
  id: number;
  date: string;
  extraHours: number;
  nonCommissionedHours: number;
  userId: number;
};

export type User = {
  id: number;
  email: string;
  name: string;
  activeDirectoryId: string;
  refreshToken: string;
  hourlyRate: number;
  commission: number;
  tax: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  isSpecialist: boolean;
  workDayDetails: UserWorkDayDetail[];
};

export interface UserSalaryDetails {
  hourlyRate: number;
  commission: number;
  tax: number;
}

export interface CalendarMonthEarnings {
  monthName: string;
  payDay: string;
  workDays: WorkDay[];
  workHours: number;
  gross: number;
  net: number;
  grossFormatted: string;
  netFormatted: string;
}

export type CalendarYearEarnings = {
  year: number;
  workDays: number;
  workHours: number;
  gross: number;
  net: number;
  grossFormatted: string;
  netFormatted: string;
};

export interface UserEarningsDetails {
  workDayDetails: UserWorkDayDetail[];
  monthStatistics: CalendarMonthEarnings;
  currentMonthStatistics: CalendarMonthEarnings;
  lastMonthStatistics: CalendarMonthEarnings;
  nextMonthStatistics: CalendarMonthEarnings;
  nextPayDayStatistics: CalendarMonthEarnings;
  yearSalaryStatistics: CalendarYearEarnings;
  nextYearSalaryStatistics: CalendarYearEarnings;
}

export type PrismaUserUserWorkDayDetail = {
  id: number;
  date: string;
  extraHours: Prisma.Decimal;
  nonCommissionedHours: Prisma.Decimal;
  userId: number;
};

export type PrismaUser = {
  id: number;
  email: string;
  name: string | null;
  activeDirectoryId: string;
  refreshToken: string | null;
  hourlyRate: number;
  commission: Prisma.Decimal;
  tax: Prisma.Decimal;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  isSpecialist: boolean;
  workDayDetails: PrismaUserUserWorkDayDetail[];
};

export type CalendarYear = {
  year: number;
  isLeapYear: boolean;
  months: CalendarMonth[];
};

export type CalendarMonth = {
  month: string;
  days: CalendarDay[];
  payDay?: CalendarDay;
};

export type CalendarDay = {
  date: Date;
  day: number;
  name: string;
  weekNumber: number;
  formattedDate: string;
  formattedShortDate: string;
  formattedLongDate: string;
  isHoliday: boolean;
  isWorkDay?: boolean;
};

export type Holiday = {
  name: string;
  date: Date;
  formattedShortDate: string;
  formattedLongDate: string;
};

export interface NextAuthSessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
  isAdmin?: boolean;
  isSpecialist?: boolean;
}

export interface NextAuthSession extends Session {
  user?: NextAuthSessionUser;
}

export interface NextAuthToken extends TokenSet {
  sub: string;
}
