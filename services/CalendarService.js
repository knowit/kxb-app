export default {
  getCalendarMonthsForYear: async year =>
    await fetch(
      `${process.env.NEXT_PUBLIC_CALENDAR_API_BASE_URL}api/calendar/${year}/months`
    ).then(r => r.json())
};
