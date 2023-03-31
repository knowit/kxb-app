import { CalendarDay, CalendarMonth } from "@/types";

const PAY_DAY: number = 20;
const PAY_DAY_DECEMBER: number = 10;

export const isWorkDay = (day: CalendarDay): boolean =>
  (!day?.isHoliday ?? false) &&
  (!day?.isKnowitClosed ?? false) &&
  day?.name?.toUpperCase() !== "SATURDAY" &&
  day?.name?.toUpperCase() !== "SUNDAY";

export const getWorkDays = (month: CalendarMonth): CalendarDay[] =>
  month?.days?.filter(day => isWorkDay(day)) ?? [];

export const getPayDay = (month: CalendarMonth): CalendarDay | undefined => {
  if ((month?.days?.length ?? 0) === 0) {
    return undefined;
  }

  const workDays = getWorkDays(month);
  const payDay = month.monthNumber === 11 ? PAY_DAY_DECEMBER : PAY_DAY;
  const regularPayDay = workDays.find(workDay => workDay.day === payDay);

  return regularPayDay
    ? regularPayDay
    : workDays
        ?.filter(workDay => workDay.day <= payDay)
        .reduce((result, current) =>
          Math.abs(current.day - payDay) < Math.abs(result.day - payDay) ? current : result
        );
};
