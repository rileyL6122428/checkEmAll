import TypeStats from '../classes/TypeStats.js';
import CompletionStats from '../classes/CompletionStats.js';

export default function WorkbenchController(todosStore, todosRequests, $state) {
  'ngInject';
  let vm = this;

  todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawTodos();
    vm.typeStats = new TypeStats(vm.todos);
    vm.completionStats = new CompletionStats(vm.todos);
  });
  todosRequests.getUserTodos();

  vm.setSelectedTodo = (clickedTodo) => {
    (vm.selectedTodo === clickedTodo) ? vm.selectedTodo = null : vm.selectedTodo = clickedTodo;
  }
  vm.gotoNewTodoPage = () => { $state.go('newTodo'); }
}
