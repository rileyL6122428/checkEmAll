import { DateUtil } from '../../../src/modules/summary/classes/DateUtil.js';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

describe("DateUtil", () => {
  describe("getCurrentDate", () => {
    it("returns a date Object with the most current time", () => {
      let then = new Date();
      let now = DateUtil.getCurrentDate();
      expect(now).toEqual(jasmine.any(Date));
      expect(now).not.toBeLessThan(then);
    });
  });

  describe("nWeeksBefore", () => {
    it("returns a date object with a time n weeks earlier than the time provided", () => {
      let date = new Date(ONE_WEEK * 5);

      let oneWeekBefore = DateUtil.nWeeksBefore(1, date);
      expect(oneWeekBefore.getTime()).toEqual(ONE_WEEK * 4);

      let twoWeekBefore = DateUtil.nWeeksBefore(2, date);
      expect(twoWeekBefore.getTime()).toEqual(ONE_WEEK * 3);
    });
  });
});
