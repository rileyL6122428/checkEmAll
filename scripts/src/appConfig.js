import { RootReducer } from "./redux/reducers/rootReducer.js"

function appConfig($urlRouterProvider, $ngReduxProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/login');
  $ngReduxProvider.createStoreWith(RootReducer);
}

export default appConfig;
