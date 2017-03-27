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

import { GRAPH_COLORS } from './constants/graphColors.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter])

  .controller('todosController', TodosController)
  .controller('newTodoController', NewTodoController)

  .factory('todosRequests', TodosRequests)
  .factory('percentageGraphDrawer', PercentageGraphDrawer)

  .directive('todosList', TodosList)
  .directive('todoCard', TodoCard)
  .directive('todoTypeTag', TodoTypeTag)
  .directive('completionGraph', CompletionGraph)

  .constant('GRAPH_COLORS', GRAPH_COLORS);

export default todoModule.name;
