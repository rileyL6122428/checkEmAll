import angular from 'angular';
import uiRouter from 'angular-ui-router';
import summaryRoutesConfig from './summaryRoutes.js';

const summaryModule = angular.module('summaryModule', [uiRouter])
  .config(summaryRoutesConfig);

export default summaryModule.name;
