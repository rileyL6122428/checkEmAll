export default function TodosController(todosStore, todosRequests, $state) {
  'ngInject';
  let vm = this;

  todosStore.placeListener(() => { vm.todos = todosStore.withdrawTodos(); });
  todosRequests.getUserTodos();

  vm.setSelectedTodo = (todo) => { vm.selectedTodo = todo; }
  vm.gotoNewTodoPage = () => { $state.go('newTodo'); }
}
