import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routesConfig from './routes.js';

const todoApp = angular.module('todoApp', [
  uiRouter
])
  .config(routesConfig);

export default todoApp.name;
