export default class BaseStore {
  constructor($ngRedux) {
    this.$ngRedux = $ngRedux;
  }

  placeListener(listener) {
    listener();
    let unsubscribeFromStore = this.$ngRedux.subscribe(listener);
    return unsubscribeFromStore;
  }
}
