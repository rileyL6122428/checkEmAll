function routesConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  debugger
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: "<div>THIS IS THE HOME TEMPLATE</div>",
    });

  // $stateProvider
  //   .state('login', {
  //     url: '/login',
  //     template: "<div>THIS IS THE login TEMPLATE</div>",
  //   });

}

export default routesConfig;
