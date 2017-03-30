export default function ViewTodoController($stateParams, todosStore) {
  'ngInject';
  let vm = this;

  vm.todo = todosStore.withdrawTodo($stateParams.todoId);
}
