const PAY_DAY = 20;

export const isWorkDay = day =>
  (!day?.isHoliday ?? false) &&
  day?.name?.toUpperCase() !== "SATURDAY" &&
  day?.name?.toUpperCase() !== "SUNDAY";

export const getWorkDays = month => month?.days?.filter(day => isWorkDay(day)) ?? [];

export const getPayDay = month => {
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
