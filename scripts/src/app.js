import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './modules/authentication/module.js';
import todoModule from './modules/todos/module.js';

import appConfig from './appConfig.js';

const todoApp = angular.module('todoApp', [
  uiRouter,
  authenticationModule,
  todoModule
])
  .config(appConfig);

export default todoApp.name;
