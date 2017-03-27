import TypeStats from '../classes/TypeStats.js';

export default function TodosController(todosStore, todosRequests, $state) {
  'ngInject';
  let vm = this;

  todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawTodos();
    vm.typeStats = new TypeStats(vm.todos);
    debugger
  });
  todosRequests.getUserTodos();

  vm.setSelectedTodo = (todo) => { vm.selectedTodo = todo; }
  vm.gotoNewTodoPage = () => { $state.go('newTodo'); }
}
