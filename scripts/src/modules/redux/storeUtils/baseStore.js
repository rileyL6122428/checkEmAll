export default class BaseStore {

  constructor($ngRedux, $rootScope) {
    this.$ngRedux = $ngRedux;
    debugger
    this.unsubscribeTokens = [];
    $rootScope.$on('$stateChangeStart', this._removeSubscriptions.bind(this));
  }

  _removeSubscriptions() {
    debugger
    while(this.unsubscribeTokens.length > 0) {
      let token = this.unsubscribeTokens.pop();
      token();
    }
  }

  placeListener(listener) {
    debugger
    let unsubscribeFromStore = this.$ngRedux.subscribe(listener);
    this.unsubscribeTokens.push(unsubscribeFromStore);
  }
}
