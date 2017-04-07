import angular from 'angular';
import uiRouter from 'angular-ui-router';
import workbenchModule from '../workbench/workbenchModule.js'; //TODO Refactor this, you only need todos requests service
import summaryRoutesConfig from './summaryRoutes.js';

import SummaryController from './controllers/summaryController.js';

const summaryModule = angular.module('summaryModule', [uiRouter, workbenchModule])

  .controller('summaryController', SummaryController)

  .config(summaryRoutesConfig);

export default summaryModule.name;
