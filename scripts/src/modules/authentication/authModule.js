import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../redux/module.js';

import LoginController from './controllers/loginController.js';

import AuthRequests from './services/authRequests.js';

import authRoutingConfig from './authRoutes.js';

const authenticationModule = angular.module('authenticationModule', [reduxModule, uiRouter])
  
  .controller("loginController", LoginController)

  .factory("authRequests", AuthRequests)

  .config(authRoutingConfig);

export default authenticationModule.name;
