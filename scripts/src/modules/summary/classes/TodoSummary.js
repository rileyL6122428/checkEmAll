export class TodoSummary {
    constructor(todos) {
      this._initializeCompletedTodos(todos);
    }

    getTotalCompletedByType(type) {
      return this._completedTypeTotals[type];
    }

    getTotalCompleted() {
      if(this._totalCompleted) return this._totalCompleted;

      this._totalCompleted = 0;
      Object.values(this._completedTypeTotals).forEach((typeTotal) => {
        this._totalCompleted += typeTotal;
      });

      return this._totalCompleted;
    }

    _initializeCompletedTodos(todos) {
      this._completedTypeTotals = {};

      todos
        .filter((todo) => todo.finished)
        .forEach((todo) =>  this._incrementTypeTotal(todo));
    }

    _incrementTypeTotal(todo) {
      if(this._completedTypeTotals[todo.type])
        this._completedTypeTotals[todo.type] += 1
      else
        this._completedTypeTotals[todo.type] = 1;
    }
}
