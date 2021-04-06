export default {
  getCalendarMonthsForYear: async year =>
    await fetch(`https://tommy-api.vercel.app/api/calendar/${year}/locale/nb-no/months`).then(r =>
      r.json()
    )
};
