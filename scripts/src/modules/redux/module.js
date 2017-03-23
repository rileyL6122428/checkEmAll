import angular from 'angular';
import ngRedux from 'ng-redux';
import reduxConfig from './config.js';

import uiRouter from 'angular-ui-router';

import TodosStore from './storeUtils/todosStore.js';

const reduxModule = angular.module('reduxModule', [ngRedux, uiRouter])
  .config(reduxConfig)
  .service('todosStore', TodosStore);

export default reduxModule.name;
