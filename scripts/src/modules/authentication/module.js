import angular from 'angular'

import routesConfig from './routes.js';

import LoginController from './loginController.js';

const authenticationModule = angular.module('authenticationModule', [])
  .controller("loginController", LoginController)
  .config(routesConfig);

export default authenticationModule.name;
