import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../redux/module.js';

import LoginController from './loginController.js';
import AuthRequests from './authRequests.js';

const authenticationModule = angular.module('authenticationModule', [reduxModule, uiRouter])
  .controller("loginController", LoginController)
  .factory("authRequests", AuthRequests);

export default authenticationModule.name;
