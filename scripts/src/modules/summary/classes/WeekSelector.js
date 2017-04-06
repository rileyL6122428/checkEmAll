const WEEK_STRINGS = {
  "0": "This Week",
  "-1": "Last Week",
  "-2": "Two Weeks Ago",
  "-3": "Three Weeks Ago",
  "-4": "Four Weeks Ago",
  "-5": "Five Weeks Ago",
  "-6": "Six Weeks Ago",
  "-7": "Seven Weeks Ago"
}

export class WeekSelector {
  constructor() {
    this._weekIdx = 0;
  }

  getWeekIdx() {
    return this._weekIdx;
  }

  getWeekAsStr() {
    return WEEK_STRINGS[this._weekIdx];
  }

  gotoNextWeek() {
    (this.nextWeekIsAvailable()) ? this._weekIdx++ : this._weekIdx = 0;
  }

  gotoPrevWeek() {
    (this.prevWeekIsAvailable()) ? this._weekIdx-- : this._weekIdx = -7;
  }

  nextWeekIsAvailable() {
    return this._weekIdx < 0;
  }

  prevWeekIsAvailable() {
    return this._weekIdx > -7;
  }
}

export function WeekSelectorFactory() {
  return ({
    newWeekSelector() {
      return new WeekSelector();
    }
  });
}
