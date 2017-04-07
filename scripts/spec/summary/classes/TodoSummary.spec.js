import { TodoSummary } from '../../../src/modules/summary/classes/TodoSummary.js';

describe("TodoSummary", () => {
  let todos;
  beforeEach(() => {
    todos = [
      { finished: true, type: "work" },
      { finished: true, type: "work" },
      { finished: false, type: "work" },
      { finished: true, type: "chore" },
      { finished: false, type: "chore" },
      { finished: false, type: "chore" },
    ];
  });

  describe("#getTotalCompletedByType", () => {
    it("returns the number of completed todos of a given type", () => {
      let summary = new TodoSummary(todos);

      expect(summary.getTotalCompletedByType("work")).toEqual(2);
      expect(summary.getTotalCompletedByType("chore")).toEqual(1);
    });
  });

  describe("#getTotalCompleted", () => {
    it("returns the total number of completed todos from the provided list", () => {
      let summary = new TodoSummary(todos);
      expect(summary.getTotalCompleted()).toEqual(3);
    })
  });
});
