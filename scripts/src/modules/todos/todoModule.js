import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../redux/module.js';

import TodosController from './todosController.js';
import TodosRequests from './todosRequests.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter])
  .controller('todosController', TodosController)
  .factory('todosRequests', TodosRequests);

export default todoModule.name;
