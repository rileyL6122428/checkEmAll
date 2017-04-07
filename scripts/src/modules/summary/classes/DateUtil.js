const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

let DateUtil = {
  getCurrentDate() {
    return new Date();
  },

  nWeeksBefore(weekIdx, date) {
    return new Date(date.getTime() - weekIdx * ONE_WEEK);
  }
};

export { DateUtil };
