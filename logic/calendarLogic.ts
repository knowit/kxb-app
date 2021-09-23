import { CalendarDay, CalendarMonth } from "@/types";

const PAY_DAY: number = 20;

export const isWorkDay = (day: CalendarDay): boolean =>
  (!day?.isHoliday ?? false) &&
  day?.name?.toUpperCase() !== "SATURDAY" &&
  day?.name?.toUpperCase() !== "SUNDAY";

export const getWorkDays = (month: CalendarMonth): CalendarDay[] =>
  month?.days?.filter(day => isWorkDay(day)) ?? [];

export const getPayDay = (month: CalendarMonth): CalendarDay => {
  if ((month?.days?.length ?? 0) === 0) {
    return null;
  }

  const workDays = getWorkDays(month);
  const regularPayDay = workDays.find(workDay => workDay.day === PAY_DAY);

  return regularPayDay
    ? regularPayDay
    : workDays
        ?.filter(workDay => workDay.day <= PAY_DAY)
        .reduce((result, current) =>
          Math.abs(current.day - PAY_DAY) < Math.abs(result.day - PAY_DAY) ? current : result
        );
};
