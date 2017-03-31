import CompletionStats from '../../../src/modules/graphs/classes/CompletionStats.js';

describe("CompletionStats", () => {
  let stats;
  let todo1, todo2, todo3, todo4, todo5, todo6, todos;

  beforeEach(() => {
    todo1 = { finished: true };
    todo2 = { finished: true };
    todo3 = { finished: false };
    todo4 = { finished: false };
    todo5 = { finished: false };
    todo6 = { finished: false };
    todos = [todo1, todo2, todo3, todo4, todo5, todo6];
  });

  describe("#getCompletionCounts", () => {
    it("returns a hash containing the number of completed and uncompleted todos", () => {
      stats = new CompletionStats(todos);
      let completionCounts = stats.getCompletionCounts();

      expect(Object.keys(completionCounts).length).toEqual(2);
      expect(completionCounts.finished).toEqual(2);
      expect(completionCounts.notFinished).toEqual(4);
    });
  });

  describe("#getCompletionPercentages", () => {
    it("returns a hash containing the percentage of completed and uncompleted todos", () => {
      stats = new CompletionStats(todos);
      let completionPercentage = stats.getCompletionPercentages();

      expect(Object.keys(completionPercentage).length).toEqual(2);
      expect(completionPercentage.finished).toEqual((2 / todos.length) * 100);
      expect(completionPercentage.notFinished).toEqual((4 / todos.length) * 100);
    });
  });
});
