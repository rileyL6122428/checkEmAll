import TypeStats from '../classes/TypeStats.js';
import CompletionStats from '../classes/CompletionStats.js';
import EditorState from '../classes/EditorState.js';

export default function WorkbenchController(todosStore, todosRequests, $state, $scope) {
  'ngInject';

  let vm = this;

  setTodos();
  vm.editorState = new EditorState($state, $scope.$apply.bind($scope));
  vm.editorState.setKeyboardShortcuts();
  vm.setSelectedTodo = setSelectedTodo;

  $scope.$on("$destroy", () => vm.editorState.removeKeyboardShortcuts());

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
    if(vm.selectedTodo === clickedTodo) {
      vm.selectedTodo = null
      vm.editorState.gotoEmptyEditor();
    } else {
      vm.selectedTodo = clickedTodo;
      vm.editorState.gotoSelectedTodo(clickedTodo);
    }
  }

}
