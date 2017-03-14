import loginTemplate from './templates/login.html';

export default function routesConfig($stateProvider){

  $stateProvider
      .state('login', {
          url: '/login',
          template: loginTemplate,
          controller: 'loginController as vm'
      });
}
