import angular from 'angular';
import uiRouter from 'angular-ui-router';
import summaryRoutesConfig from './summaryRoutes.js';

import SummaryController from './controllers/summaryController.js';

import { WeekSelectorFactory } from './classes/WeekSelector.js';

const summaryModule = angular.module('summaryModule', [uiRouter])

  .controller('summaryController', SummaryController)

  .factory('weekSelectorFactory', WeekSelectorFactory)

  .config(summaryRoutesConfig);

export default summaryModule.name;
