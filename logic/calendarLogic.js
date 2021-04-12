export const isWorkDay = day =>
  (!day?.isHoliday ?? false) &&
  day?.name?.toUpperCase() !== "SATURDAY" &&
  day?.name?.toUpperCase() !== "SUNDAY";

export const getWorkDays = month => month?.days?.filter(day => isWorkDay(day)) ?? [];
