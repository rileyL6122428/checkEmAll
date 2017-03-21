import { RootReducer } from "./reducers/rootReducer.js"

function reduxConfig($ngReduxProvider) {
  'ngInject';
  $ngReduxProvider.createStoreWith(RootReducer);
}

export default reduxConfig;
