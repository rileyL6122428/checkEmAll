export default function TodosController(todosStore, todosRequests) {
  'ngInject';
  let vm = this;

  todosStore.placeListener(() => {
    vm.todos = todosStore.getUserTodos({ userId: 1 });
  });

  todosRequests.getTodos({ userId: 1 });
}
