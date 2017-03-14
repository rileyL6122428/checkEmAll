import angular from 'angular'

import routesConfig from './routes.js';

const authenticationModule = angular.module('authenticationModule', [])
  .config(routesConfig);

export default authenticationModule.name;
