import angular from 'angular';
import ngRedux from 'ng-redux';
import reduxConfig from './config.js';

import TodosStore from './storeUtils/todos.util.js';

const reduxModule = angular.module('reduxModule', [ngRedux])
  .config(reduxConfig)
  .factory('todosStore', TodosStore);

export default reduxModule.name;
