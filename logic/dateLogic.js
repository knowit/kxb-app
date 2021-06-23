// import { nb } from "date-fns/locale";
import { MONTH_NAMES, MONTH_VALUES } from "@/constants/dateConstants";
import { format } from "date-fns";

const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);

export const getFormattedDate = (date, dateFormat, options = {}) =>
  format(date, dateFormat, options);

export const getFormattedLongDate = date => getFormattedDate(date, "EEEE d. MMMM yyyy");

export const getFormattedMonth = date => getFormattedDate(date, "LLLL");

export const getMonthFromName = monthName => {
  switch (monthName?.toUpperCase()) {
    case MONTH_NAMES.JANUARY:
      return MONTH_VALUES.JANUARY;
    case MONTH_NAMES.FEBRUARY:
      return MONTH_VALUES.FEBRUARY;
    case MONTH_NAMES.MARCH:
      return MONTH_VALUES.MARCH;
    case MONTH_NAMES.APRIL:
      return MONTH_VALUES.APRIL;
    case MONTH_NAMES.MAY:
      return MONTH_VALUES.MAY;
    case MONTH_NAMES.JUNE:
      return MONTH_VALUES.JUNE;
    case MONTH_NAMES.JULY:
      return MONTH_VALUES.JULY;
    case MONTH_NAMES.AUGUST:
      return MONTH_VALUES.AUGUST;
    case MONTH_NAMES.SEPTEMBER:
      return MONTH_VALUES.SEPTEMBER;
    case MONTH_NAMES.OCTOBER:
      return MONTH_VALUES.OCTOBER;
    case MONTH_NAMES.NOVEMBER:
      return MONTH_VALUES.NOVEMBER;
    case MONTH_NAMES.DECEMBER:
      return MONTH_VALUES.DECEMBER;
    default:
      return 0;
  }
};

export const getMonthNames = () => {
  return Object.values(MONTH_NAMES);
};

export const getThisYearAndTwoYearsIntoTheFuture = () => {
  let year = new Date().getFullYear();
  return range(year, year + 8);
};
