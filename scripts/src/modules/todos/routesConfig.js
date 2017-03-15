import todoIndexTemplate from './templates/todoIndex.html';

export default function routesConfig($stateProvider){
'ngInject';

  $stateProvider
      .state('todosIndex', {
          url: '/todos',
          template: todoIndexTemplate
      });
}
