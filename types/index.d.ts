/// <reference types="node" />

export type WithChildren<T = {}> = T & { children?: React.ReactNode };

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export interface UserWorkDayDetail {
  id: number;
  date: string;
  nonCommissionedHours: number;
  extraHours: number;
  sickDay: boolean;
  userId: number;
}

export interface UserFeedback {
  id: number;
  date: string;
  userId: number;
  feedback: string;
  reaction: number;
}

export type User = {
  id: number;
  email: string;
  name?: string;
  activeDirectoryId: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  hourlyRate: number;
  commission: number;
  tax: number;
  workHours: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  isSpecialist: boolean;
  workDayDetails: UserWorkDayDetail[];
  feedback: UserFeedback[];
};

export type UserSalaryDetails = {
  hourlyRate: number;
  commission: number;
  tax: number;
  workHours: number;
};

export type CalendarMonthEarnings = {
  monthName: string;
  payDay: string;
  workDays: WorkDay[];
  workHours: number;
  gross: number;
  net: number;
  grossFormatted: string;
  netFormatted: string;
  halfTax: boolean;
};

export type CalendarYearEarnings = {
  year: number;
  workDays: number;
  workHours: number;
  gross: number;
  net: number;
  grossFormatted: string;
  netFormatted: string;
};

export type UserEarningsDetails = {
  workDayDetails: UserWorkDayDetail[];
  activeCalendarMonthStatistics: CalendarMonthEarnings;
  currentMonthStatistics: CalendarMonthEarnings;
  lastMonthStatistics: CalendarMonthEarnings;
  nextMonthStatistics: CalendarMonthEarnings;
  nextPayDayStatistics: CalendarMonthEarnings;
  yearSalaryStatistics: CalendarYearEarnings;
  nextYearSalaryStatistics: CalendarYearEarnings;
};

export type CalendarHolidayInformation = {
  name: string;
  shortDate: string;
};

export type CalendarYear = {
  year: number;
  isLeapYear: boolean;
  months: CalendarMonth[];
};

export type CalendarMonth = {
  month: string;
  monthNumber: number;
  year: number;
  days: CalendarDay[];
  payDay?: CalendarDay;
  halfTax: boolean;
};

export type CalendarDay = {
  date: Date;
  day: number;
  name: string;
  weekNumber: number;
  formattedDate: string;
  formattedShortDate: string;
  formattedLongDate: string;
  holidayInformation?: CalendarHolidayInformation;
  isHoliday: boolean;
  isWorkDay?: boolean;
  isSunday?: boolean;
  isKnowitClosed?: boolean;
};

export type Holiday = {
  name: string;
  date: Date;
  formattedShortDate: string;
  formattedLongDate: string;
};

type CalendarEntries = {
  type: "header" | "week" | "spacing" | "day";
  value: string | number | null;
  date: string;
  formattedDate: string;
  week?: number;
  isToday?: boolean;
  isOdd?: boolean;
  isHoliday?: boolean;
  isSunday?: boolean;
  isStartOfWeek?: boolean;
  isWorkDay?: boolean;
  isNonCommissionedWorkDay?: boolean;
  workDayDetails?: UserWorkDayDetail;
};

export type AzureAdTokenClaims = {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  family_name: string;
  given_name: string;
  name: string;
  oid: string;
  scp: string;
  sub: string;
  tid: string;
  unique_name: string;
  upn: string;
};

export type GraphUser = {
  "@odata.context": string;
  businessPhones: string[];
  displayName: string;
  givenName: ?string;
  jobTitle: ?string;
  mail: ?string;
  mobilePhone: ?string;
  officeLocation: ?string;
  preferredLanguage: ?string;
  surname: ?string;
  userPrincipalName: string;
  id: string;
};
