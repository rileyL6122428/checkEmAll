export default function TodosController(todosStore, todosRequests, $state) {
  'ngInject';
  let vm = this;

  todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawTodos();
    debugger
  });
  todosRequests.getUserTodos();

  vm.setSelectedTodo = (todo) => { vm.selectedTodo = todo; }
  vm.gotoNewTodoPage = () => { $state.go('newTodo'); }
}
