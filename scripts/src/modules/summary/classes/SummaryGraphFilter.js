const TODO_TYPES = ["WORK", "PROJECT", "JAPANESE", "FAMILY", "CHORE", "STUDY", "EXERCISE", "UNASSIGNED"];
const AGGREGATE_TYPES = ["SELECTED_WEEK", "EIGHT_WEEK_AVG", "LIFE_TIME_AVG"];

export class SummaryGraphFilter {
  constructor() {
    this._typeFilters = {};
    TODO_TYPES.forEach((type) => this._typeFilters[type] = true);

    this._weekFilters = {};
    AGGREGATE_TYPES.forEach((weekType) => this._weekFilters[weekType] = true)
  }

  showingType(type) {
    return this._typeFilters[type];
  }

  toggleTypeFilter(type) {
    this._typeFilters[type] = !this._typeFilters[type];
  }

  showingAggregate(type) {
    return this._weekFilters[type];
  }

  toggleAggregateFilter(type) {
    this._weekFilters[type] = !this._weekFilters[type];
  }
}

export function SummaryFilterFactory() {
  return ({
    newSummaryGraphFilter(){
      return new SummaryGraphFilter();
    }
  });
}
