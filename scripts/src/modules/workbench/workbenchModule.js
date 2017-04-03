import angular from 'angular'
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import reduxModule from '../redux/module.js';
import graphModule from '../graphs/graphModule.js';

import WorkbenchController from './controllers/workbenchController.js';
import NewTodoController from './controllers/newTodoController.js';
import ViewTodoController from './controllers/viewTodoController.js';
import EditTodoController from './controllers/editTodoController.js';
import DequeueController from './controllers/dequeueController.js';

import DateCreatedAsString from './filters/dateCreatedAsString.js';

import TodosRequests from './services/todosRequests.js';
import NameFilter from './services/nameFilter.js';
import DequeueModalLauncher from './services/dequeueModalLauncher.js';

import EditorStateFactory from './classes/EditorStateFactory.js';

import TodosList from './directives/todosList.js';
import TodosListItem from './directives/todosListItem.js';
import TodoTypeTag from './directives/todoTypeTag.js';
import ListItemColorSplash from './directives/listItemcolorSplash.js';

const workbenchModule = angular.module('todoModule', [reduxModule, uiRouter, graphModule, uiBootstrap])

  .controller('workbenchController', WorkbenchController)
  .controller('newTodoController', NewTodoController)
  .controller('viewTodoController', ViewTodoController)
  .controller('editTodoController', EditTodoController)
  .controller('dequeueController', DequeueController)

  .filter('dateCreatedAsString', DateCreatedAsString)

  .factory('todosRequests', TodosRequests)
  .factory('nameFilter', NameFilter)
  .factory('dequeueModalLauncher', DequeueModalLauncher)

  .factory('editorStateFactory', EditorStateFactory)

  .directive('todosList', TodosList)
  .directive('todosListItem', TodosListItem)
  .directive('todoTypeTag', TodoTypeTag)
  .directive('listItemColorSplash', ListItemColorSplash)

export default workbenchModule.name;
