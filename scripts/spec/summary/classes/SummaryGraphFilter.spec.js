import { SummaryGraphFilter } from '../../../src/modules/summary/classes/SummaryGraphFilter.js';

describe("SummaryGraphFilter", () => {
  let summaryGraphFilter;
  beforeEach(() => {
    summaryGraphFilter = new SummaryGraphFilter();
  });

  describe("todoTypeFilters", () => {
    let todoTypes = ["WORK", "PROJECT", "JAPANESE", "FAMILY", "CHORE", "STUDY", "EXERCISE", "UNASSIGNED"];

    it("initializes with a flag filter for each todo type that initializes to true", () => {
      todoTypes.forEach((todoType) => {
        expect(summaryGraphFilter.showingType(todoType)).toBe(true);
      });
    });

    describe("toggleTypeFilter", () => {
      it("toggles the provided todoType filter between true and false", () => {
        todoTypes.forEach((todoType) => {
          summaryGraphFilter.toggleTypeFilter(todoType);
          expect(summaryGraphFilter.showingType(todoType)).toBe(false);
          summaryGraphFilter.toggleTypeFilter(todoType);
          expect(summaryGraphFilter.showingType(todoType)).toBe(true);
        });
      });
    });
  });


  describe("aggregateFilters", () => {
    let aggregateTypes = ["SELECTED_WEEK", "EIGHT_WEEK_AVG", "LIFE_TIME_AVG"];

    it("initializes with a flag filter for each aggregate type initialized to true", () => {
      aggregateTypes.forEach((aggregateType) => {
        expect(summaryGraphFilter.showingAggregate(aggregateType)).toBe(true);
      });
    });

    describe("toggleAggregateFilter", () => {
      it("toggles the provided week filter between true and false", () => {
        aggregateTypes.forEach((aggregateType) => {
          summaryGraphFilter.toggleAggregateFilter(aggregateType);
          expect(summaryGraphFilter.showingAggregate(aggregateType)).toBe(false);
          summaryGraphFilter.toggleAggregateFilter(aggregateType);
          expect(summaryGraphFilter.showingAggregate(aggregateType)).toBe(true);
        });
      });
    });
  });
});
