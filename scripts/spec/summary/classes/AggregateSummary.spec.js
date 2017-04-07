import { AggregateSummary } from '../../../src/modules/summary/classes/AggregateSummary.js';
import { DateUtil } from '../../../src/modules/summary/classes/DateUtil.js';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
const TODO_TYPES = ["work", "chore"];
const WEEK_IDXS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe("AggregateSummary", () => {

  let todos, aggregateSummary;
  beforeEach( () => {
    todos = [];
    _loadTodos();
  });

  describe("#getWeekSummary", () => {
    it("returns a period summary for the provided weekIdx when weekIdx is in [0, 7]", () => {
      spyOn(DateUtil, 'getCurrentDate').and.returnValue(new Date(ONE_WEEK * 10 + 500));
      aggregateSummary = new AggregateSummary(todos);

      for(var weekIdx = 0; weekIdx < 8; weekIdx++) {
        let currentWeekSummary = aggregateSummary.getWeekSummary(weekIdx);

        expect(currentWeekSummary.getTotalCompletedByType("work")).toEqual(1);
        expect(currentWeekSummary.getTotalCompletedByType("chore")).toEqual(1);
        expect(currentWeekSummary.getTotalCompleted()).toEqual(2);
      }
    });

    it("returns undefined when the weekIdx is not in [0, 7]", () => {
      spyOn(DateUtil, 'getCurrentDate').and.returnValue(new Date(ONE_WEEK * 10 + 500));
      aggregateSummary = new AggregateSummary(todos);

      let untrackedWeekIdxs = [-10, -1, 8, 20];
      untrackedWeekIdxs.forEach((weekIdx) => {
        expect(aggregateSummary.getWeekSummary(weekIdx)).not.toBeDefined();
      });
    });
  });

  function _loadTodos() {
    TODO_TYPES.forEach((todoType) => {
      WEEK_IDXS.forEach((weekIdx) => {
        todos.push({
          type: todoType,
          dateCreated: new Date(ONE_WEEK * weekIdx),
          finished: true
        });

        todos.push({
          type: todoType,
          dateCreated: new Date(ONE_WEEK * weekIdx),
          finished: false
        });
      });
    });
  }
});
