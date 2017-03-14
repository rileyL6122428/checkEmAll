export default function routesConfig($stateProvider){

    $stateProvider
        .state('login', {
            url: '/login',
            template: "<div>THIS IS THE AUTH TEMPLATE</div>",
        });
}
