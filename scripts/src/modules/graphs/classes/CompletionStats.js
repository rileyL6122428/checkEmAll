export default class CompletionStats {
  constructor(todos) {
    this._setCompletionCounts(todos);
    this._setCompletionPercentages(todos);
  }

  getCompletionCounts() {
    return Object.assign({}, this._completionCounts);
  }

  _setCompletionCounts(todos) {
    this._completionCounts = { finished: 0, notFinished: 0 };

    todos.forEach((todo) => {
      todo.finished ? this._completionCounts.finished += 1 : this._completionCounts.notFinished += 1;
    });
  }

  getCompletionPercentages() {
    return Object.assign({}, this._completionPercentages);
  }

  _setCompletionPercentages(todos) {
    this._completionPercentages = {};

    this._completionPercentages.finished = (this._completionCounts.finished / todos.length) * 100;
    this._completionPercentages.notFinished = (this._completionCounts.notFinished / todos.length) * 100;
  }
}
