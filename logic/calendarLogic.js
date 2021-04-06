export const isWorkDay = day =>
  (!day?.isHoliday ?? false) && day?.name !== "lørdag" && day?.name !== "søndag";

export const getWorkDays = month => month?.days?.filter(day => isWorkDay(day)) ?? [];
