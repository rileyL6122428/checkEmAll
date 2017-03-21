export default function TodosController($ngRedux, todosRequests) {
  'ngInject';

  todosRequests.getTodos({ userId: 1 });

}
