import { WeekSelector } from '../../../src/modules/summary/classes/WeekSelector.js';

describe("WeekSelector", () => {
  let weekSelector;
  beforeEach( () => weekSelector = new WeekSelector() );

  describe("Initialization", () => {
    it("instantiates with weekIdx set to zero", () => {
      expect(weekSelector.getWeekIdx()).toEqual(0);
    });
  });

  describe("#getWeekAsStr", () => {
    it("returns the appropriate string for each possbily weekIdx value", () => {
      [
        "This Week",
        "Last Week",
        "Two Weeks Ago",
        "Three Weeks Ago",
        "Four Weeks Ago",
        "Five Weeks Ago",
        "Six Weeks Ago",
        "Seven Weeks Ago"
      ].forEach((string, idx) => {
        weekSelector._weekIdx = -idx;
        expect(weekSelector.getWeekAsStr()).toEqual(string);
      });
    });
  });

  describe("#gotoNextWeek", () => {
    it("raises the value of weekIdx by one when weekIdx is less than 0", () => {
      weekSelector._weekIdx = -7;

      for(let idx = -6; idx <= 0; idx++) {
        weekSelector.gotoNextWeek();
        expect(weekSelector.getWeekIdx()).toEqual(idx);
      }
    });

    it("sets weekIdx to 0 when weekIdx equals 0", () => {
      weekSelector.gotoNextWeek();
      expect(weekSelector.getWeekIdx()).toEqual(0);
    });
  });

  describe("#gotoPrevWeek", () => {
     it("lowers the value of weekIdx by one when weekIdx is greater than -7", () => {
      for(let idx = -1; idx > -7; idx--) {
        weekSelector.gotoPrevWeek();
        expect(weekSelector.getWeekIdx()).toEqual(idx);
      }
    });

    it("sets weekIdx to -7 when weekIdx <= -7", () => {
      weekSelector._weekIdx = -7;
      weekSelector.gotoPrevWeek();
      expect(weekSelector.getWeekIdx()).toEqual(-7);
    });
  });

  describe("#nextWeekIsAvailable", () => {
    it("returns false when weekIdx is 0", () => {
      weekSelector._weekIdx = 0;
      expect(weekSelector.nextWeekIsAvailable()).toBe(false);
    });

    it("returns true when weekIdx is between -8 and 0", () => {
      for(var idx = -7; idx < 0; idx++) {
        weekSelector._weekIdx = idx;
        expect(weekSelector.nextWeekIsAvailable()).toBe(true);
      }
    });
  });

  describe("#prevWeekIsAvailable", () => {
    it("returns false when weekIdx is -7", () => {
      weekSelector._weekIdx = -7;
      expect(weekSelector.prevWeekIsAvailable()).toBe(false);
    });

    it("returns true when weekIdx is between -7 and 1", () => {
      for(var idx = -6; idx < 1; idx++) {
        weekSelector._weekIdx = idx;
        expect(weekSelector.prevWeekIsAvailable()).toBe(true);
      }
    });
  });
});
