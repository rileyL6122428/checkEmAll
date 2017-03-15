import loginTemplate from './modules/authentication/templates/login.html';
import todoIndexTemplate from './modules/todos/templates/todoIndex.html';

function appConfig($urlRouterProvider, $stateProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/login');

  $stateProvider
      .state('login', {
          url: '/login',
          template: loginTemplate,
          controller: 'loginController as vm'
      })

      .state('todosIndex', {
          url: '/todos',
          template: todoIndexTemplate
      });
}

export default appConfig;
