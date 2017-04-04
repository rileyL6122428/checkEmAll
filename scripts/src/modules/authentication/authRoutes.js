import loginTemplate from './templates/login.html';

export default function authenticationRoutingConfig($stateProvider) {
  $stateProvider
    .state('login', {
        url: '/login',
        template: loginTemplate,
        controller: 'loginController as vm',
        requireLogin: false
    });
}
