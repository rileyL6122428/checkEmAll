import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../../redux/module.js';

import routesConfig from './routesConfig.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter])
  .config(routesConfig);

export default todoModule.name;
