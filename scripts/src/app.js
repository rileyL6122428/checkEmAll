import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './modules/authentication/authModule.js';
import workbenchModule from './modules/workbench/workbenchModule.js';
import summaryModule from './modules/summary/summaryModule.js';

import authHooks from './authHooks.js';
import appConfig from './routesConfig.js';

const todoApp = angular.module('todoApp', [
  uiRouter,
  authenticationModule,
  workbenchModule,
  summaryModule
])
  .config(appConfig)
  .run(authHooks);

export default todoApp.name;
