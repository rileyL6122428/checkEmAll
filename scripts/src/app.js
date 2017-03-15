import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './modules/authentication/authenticationModule.js';
import todoModule from './modules/todos/todoModule.js';

import appConfig from './routesConfig.js';

const todoApp = angular.module('todoApp', [
  uiRouter,
  authenticationModule,
  todoModule
])
  .config(appConfig);

export default todoApp.name;
