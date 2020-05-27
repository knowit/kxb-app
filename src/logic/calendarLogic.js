export const isWorkDay = day =>
  (day?.holydays ?? []).length === 0 && day?.name !== "lørdag" && day?.name !== "søndag";

export const getWorkDays = month => month?.days?.filter(day => isWorkDay(day)) ?? [];
