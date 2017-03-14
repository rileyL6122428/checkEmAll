import angular from 'angular'

import routesConfig from './routes.js';

import LoginController from './loginController.js';
import AuthRequests from './authRequests.js';

const authenticationModule = angular.module('authenticationModule', [])
  .controller("loginController", LoginController)
  .factory("authRequests", AuthRequests)
  .config(routesConfig);

export default authenticationModule.name;
