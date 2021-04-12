export default {
  getCalendarMonthsForYear: async year =>
    await fetch(`https://tommy-api.vercel.app/api/calendar/${year}/months`).then(r => r.json())
};
