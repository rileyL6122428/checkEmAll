export default class BaseStore {

  constructor($ngRedux, $rootScope) {
    this.$ngRedux = $ngRedux;

    this.unsubscribeTokens = [];
    $rootScope.$on('$stateChangeStart', this._removeSubscriptions);
  }

  _removeSubscriptions() {
    while(this.unsubscribeTokens.length > 0) {
      let token = this.unsubscribeTokens.pop();
      token();
    }
  }

  placeListener(listener) {
    let unsubscribeFromStore = this.$ngRedux.subscribe(listener);
    this.unsubscribeTokens.push(unsubscribeFromStore);
  }
}
