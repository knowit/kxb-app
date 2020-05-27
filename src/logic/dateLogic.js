import { format } from "date-fns";
import { nb } from "date-fns/locale";

export const getFormattedDate = (
  date,
  dateFormat,
  options = {
    locale: nb
  }
) => format(date, dateFormat, options);

export const getFormattedLongDate = date => getFormattedDate(date, "EEEE d. MMMM yyyy");

export const getFormattedMonth = date => getFormattedDate(date, "MMMM");
