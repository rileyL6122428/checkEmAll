import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './modules/authentication/authenticationModule.js';
import todoModule from './modules/todos/todoModule.js';
import reduxModule from './redux/module.js';

import authHooks from './authHooks.js';
import appConfig from './routesConfig.js';

const todoApp = angular.module('todoApp', [
  uiRouter,
  authenticationModule,
  todoModule
])
  .config(appConfig)
  .run(authHooks);

export default todoApp.name;
