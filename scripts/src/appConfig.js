function appConfig($urlRouterProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/login');
}

export default appConfig;
