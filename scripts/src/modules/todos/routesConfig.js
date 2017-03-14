import todoIndexTemplate from './templates/todoIndex.html';

export default function routesConfig($stateProvider){

  $stateProvider
      .state('todosIndex', {
          url: '/todos',
          template: todoIndexTemplate
      });
}
