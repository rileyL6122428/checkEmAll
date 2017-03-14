import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './modules/authentication/module.js';

import routesConfig from './routes.js';

const todoApp = angular.module('todoApp', [
  uiRouter,
  authenticationModule
])
  .config(routesConfig);

export default todoApp.name;
