export default function ViewTodoController($stateParams, todosStore, selectedTodo) {
  'ngInject';
  let vm = this;

  vm.todo = todosStore.withdrawTodo($stateParams.todoId);
}
