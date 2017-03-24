import loginTemplate from './modules/authentication/templates/login.html';
import todoIndexTemplate from './modules/todos/templates/todoIndex.html';
import newTodoTemplate from './modules/todos/templates/newTodo.html';

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

      .state('todosIndex', {
          url: '/todos',
          template: todoIndexTemplate,
          controller: 'todosController as vm',
          requireLogin: true
      })

      .state('newTodo', {
          url: '/new-todo',
          template: newTodoTemplate,
          controller: 'newTodoController as vm',
          requireLogin: true
      });
}

export default appConfig;
