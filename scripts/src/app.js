import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './modules/authentication/authenticationModule.js';
import workbenchModule from './modules/workbench/workbenchModule.js';
import reduxModule from './modules/redux/module.js';

import authHooks from './authHooks.js';
import appConfig from './routesConfig.js';

const todoApp = angular.module('todoApp', [
  uiRouter,
  authenticationModule,
  workbenchModule
])
  .config(appConfig)
  .run(authHooks);

export default todoApp.name;
