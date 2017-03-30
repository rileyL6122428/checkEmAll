export default function EditController($stateParams, todosStore) {
  'ngInject';
  let vm = this;

  vm.todo = todosStore.withdrawTodo($stateParams.todoId);
}
