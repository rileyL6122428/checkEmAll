import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../redux/module.js';

import TodosController from './todosController.js';
import TodosRequests from './todosRequests.js';
import TodosList from './directives/todosList.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter])
  .controller('todosController', TodosController)
  .factory('todosRequests', TodosRequests)
  .directive('todosList', TodosList);

export default todoModule.name;
