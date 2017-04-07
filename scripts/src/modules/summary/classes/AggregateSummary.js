import { DateUtil } from './DateUtil.js';
import { TodoSummary } from './TodoSummary.js';

export class AggregateSummary {

  constructor(userTodos) {
    this._dateCollected = DateUtil.getCurrentDate();
    this._initalizeWeekSummaries(userTodos);
  }

  _initalizeWeekSummaries(todos) {
    this._weekSummaries = [];

    for(var weekIdx = 0; weekIdx < 8; weekIdx++) {
      let weekBounds = this._weekBounds(weekIdx);

      let weekTodos = todos.filter((todo) => {
        return todo.dateCreated <= weekBounds.upper && todo.dateCreated > weekBounds.lower
      });

      this._weekSummaries.push(new TodoSummary(weekTodos));
    }
  }

  _weekBounds(weekIdx) {
    return {
      upper: DateUtil.nWeeksBefore(weekIdx, this._dateCollected),
      lower: DateUtil.nWeeksBefore(weekIdx + 1, this._dateCollected)
    };
  }

  getWeekSummary(weekIdx) {
    return this._weekSummaries[weekIdx];
  }
}
