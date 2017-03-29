import TypeStats from '../classes/TypeStats.js';
import CompletionStats from '../classes/CompletionStats.js';

export default function WorkbenchController(todosStore, todosRequests, $state) {
  'ngInject';
  let vm = this;

  setTodos();

  vm.setSelectedTodo = setSelectedTodo;
  vm.gotoNewTodoPage = gotoNewTodoPage;

  function setTodos() {
    todosStore.placeListener(todoStoreListener);
    todosRequests.getUserTodos();
  }

  function todoStoreListener() {
    vm.todos = todosStore.withdrawTodos();
    vm.typeStats = new TypeStats(vm.todos);
    vm.completionStats = new CompletionStats(vm.todos);
  }

  function setSelectedTodo(clickedTodo) {
    (vm.selectedTodo === clickedTodo) ? vm.selectedTodo = null : vm.selectedTodo = clickedTodo;
  }

  function gotoNewTodoPage() {
    $state.go('newTodo');
  }
}
