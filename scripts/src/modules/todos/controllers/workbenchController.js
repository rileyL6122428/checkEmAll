export default function WorkbenchController(todosStore, todosRequests, statsFactory, editorStateFactory, $scope) {
  'ngInject';

  let vm = this;

  setTodos();
  vm.editorState = editorStateFactory.newEditorState($scope.$apply.bind($scope));
  vm.editorState.setKeyboardShortcuts();
  vm.setSelectedTodo = setSelectedTodo;

  $scope.$on("$destroy", () => {
    vm.editorState.removeKeyboardShortcuts()
    vm.removeStoreSubcription();
  });

  function setTodos() {
    vm.removeStoreSubcription = todosStore.placeListener(todoStoreListener);
    todosRequests.getUserTodos();
  }

  function todoStoreListener() {
    vm.todos = todosStore.withdrawTodos();
    vm.typeStats = statsFactory.newTypeStats(vm.todos);
    vm.completionStats = statsFactory.newCompletionStats(vm.todos);
  }

  function setSelectedTodo(todo) {
    if(vm.selectedTodo === todo) {
      vm.selectedTodo = null
      vm.editorState.gotoEmptyEditor();
    } else {
      vm.selectedTodo = todo;
      vm.editorState.gotoSelectedTodo(todo);
    }
  }

}
