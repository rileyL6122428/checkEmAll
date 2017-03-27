export default class TypeStats {
  constructor(todos) {
    this._setTypeCounts(todos);
    this._setTypePercentages(todos);
  }

  getTypeCounts() {
    return Object.assign({}, this._typeCounts);
  }

  _setTypeCounts(todos) {
    this._typeCounts = {};
    todos.forEach((todo) => {
      (this._typeCounts[todo.type]) ? this._typeCounts[todo.type] += 1 : this._typeCounts[todo.type] = 1;
    });
  }

  getTypePercentages() {
    return Object.assign({}, this._typePercentages);
  }

  _setTypePercentages(todos) {
    this._typePercentages = {};
    for(let type in this._typeCounts) {
      this._typePercentages[type] = (this._typeCounts[type] / todos.length) * 100;
    }
  }
}
