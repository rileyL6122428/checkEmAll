export default function WorkbenchController(todosStore, todosRequests, statsFactory, todoSelection) {
  'ngInject';
  let vm = this;

  vm.removeStoreSubcription = todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawQueuedTodos();
    vm.typeStats = statsFactory.newTypeStats(vm.todos);
    vm.completionStats = statsFactory.newCompletionStats(vm.todos);

    if(vm.selectedTodo)
      vm.selectedTodo = todosStore.withdrawTodo(vm.selectedTodo.id);
  });
  todosRequests.getUserTodos();


  vm.selectNewTodo = () => {
    todoSelection.selectNewTodo();
  }
}
