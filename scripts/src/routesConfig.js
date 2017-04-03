import loginTemplate from './modules/authentication/templates/login.html';
import workbenchTemplate from './modules/workbench/templates/workbench.html';
import viewTodoTemplate from './modules/workbench/templates/viewTodo.html';
import todoFormTemplate from './modules/workbench/templates/todoForm.html';

function appConfig($urlRouterProvider, $stateProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/login');

  $stateProvider
      .state('login', {
          url: '/login',
          template: loginTemplate,
          controller: 'loginController as vm',
          requireLogin: false
      })

      .state('workbench', {
          url: '/workbench',
          template: workbenchTemplate,
          controller: 'workbenchController as vm',
          requireLogin: true
      })

      .state('workbench.todoNotSelected', {
          url: '/todo-not-selected',
          requireLogin: true
      })

      .state('workbench.viewTodo', {
          url: '/view-todo/:todoId',
          controller: 'viewTodoController as vm',
          template: viewTodoTemplate,
          requireLogin: true
      })

      .state('workbench.editTodo', {
          url: '/edit-todo/:todoId',
          template: todoFormTemplate,
          controller: 'editTodoController as vm',
          requireLogin: true
      })

      .state('workbench.newTodo', {
          url: '/new-todo',
          template: todoFormTemplate,
          controller: 'newTodoController as vm',
          requireLogin: true
      });
}

export default appConfig;
