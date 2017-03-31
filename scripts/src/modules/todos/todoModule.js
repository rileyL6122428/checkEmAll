import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../redux/module.js';
import graphModule from '../graphs/graphModule.js';

import WorkbenchController from './controllers/workbenchController.js';
import NewTodoController from './controllers/newTodoController.js';
import ViewTodoController from './controllers/viewTodoController.js';
import EditTodoController from './controllers/editTodoController.js';

import TodosRequests from './services/todosRequests.js';
import NameFilter from './services/NameFilter.js';

import EditorStateFactory from './classes/EditorStateFactory.js';

import TodosList from './directives/todosList.js';
import TodosListItem from './directives/todosListItem.js';
import TodoTypeTag from './directives/todoTypeTag.js';
import ListItemColorSplash from './directives/listItemcolorSplash.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter, graphModule])

  .controller('workbenchController', WorkbenchController)
  .controller('newTodoController', NewTodoController)
  .controller('viewTodoController', ViewTodoController)
  .controller('editTodoController', EditTodoController)

  .factory('todosRequests', TodosRequests)
  .factory('nameFilter', NameFilter)

  .factory('editorStateFactory', EditorStateFactory)

  .directive('todosList', TodosList)
  .directive('todosListItem', TodosListItem)
  .directive('todoTypeTag', TodoTypeTag)
  .directive('listItemColorSplash', ListItemColorSplash)

export default todoModule.name;
