import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../redux/module.js';

import TodosController from './controllers/todosController.js';
import NewTodoController from './controllers/newTodoController.js';

import TodosRequests from './services/todosRequests.js';
import PercentageGraphDrawer from './services/percentageGraphDrawer.js';

import TodosList from './directives/todosList.js';
import TodoCard from './directives/todoCard.js';
import TodoTypeTag from './directives/todoTypeTag.js';
import CompletionGraph from './directives/completionGraph.js';
import TypeGraph from './directives/typeGraph.js';

import StatsFactory from './classes/StatsFactory.js';
import GraphFactory from './classes/GraphFactory.js';
import ArcFactory from './classes/ArcFactory.js';

import { GRAPH_COLORS } from './constants/graphColors.js';
import { GRAPH_MEASUREMENTS } from './constants/graphMeasurements.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter])

  .controller('todosController', TodosController)
  .controller('newTodoController', NewTodoController)

  .factory('todosRequests', TodosRequests)
  .factory('percentageGraphDrawer', PercentageGraphDrawer)

  .factory('todoClassFactory', StatsFactory)
  .factory('graphFactory', GraphFactory)
  .factory('arcFactory', ArcFactory)

  .directive('todosList', TodosList)
  .directive('todoCard', TodoCard)
  .directive('todoTypeTag', TodoTypeTag)
  .directive('completionGraph', CompletionGraph)
  .directive('typeGraph', TypeGraph)

  .constant('GRAPH_COLORS', GRAPH_COLORS)
  .constant('GRAPH_MEASUREMENTS', GRAPH_MEASUREMENTS);

export default todoModule.name;
