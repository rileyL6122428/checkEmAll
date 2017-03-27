import TypeStats from '../../src/modules/todos/classes/TypeStats.js';

describe("TypeStats", () => {
  let todo1, todo2, todo3, todo4, todo5, todo6, todos;

  beforeEach(() => {
    todo1 = { type: "work" };
    todo2 = { type: "work" };
    todo3 = { type: "study" };
    todo4 = { type: "exercise" };
    todo5 = { type: "exercise" };
    todo6 = { type: "exercise" };
    todos = [todo1, todo2, todo3, todo4, todo5, todo6];

  });

  describe("#getTypeCounts", () => {
    it("returns a map of types to todo counts", () => {
      let typeStats = new TypeStats(todos);
      let typeCounts = typeStats.getTypeCounts();

      expect(Object.keys(typeCounts).length).toEqual(3);
      expect(typeCounts.work).toEqual(2);
      expect(typeCounts.study).toEqual(1);
      expect(typeCounts.exercise).toEqual(3);
    });
  });

  describe("#getTypePercentages", () => {
    it("returns a map types to percentages", () => {
      let typeStats = new TypeStats(todos);
      let typeCounts = typeStats.getTypePercentages();

      expect(Object.keys(typeCounts).length).toEqual(3);
      expect(typeCounts.work).toEqual((2/6) * 100);
      expect(typeCounts.study).toEqual((1/6) * 100);
      expect(typeCounts.exercise).toEqual((3/6) * 100);
    });
  });
});
