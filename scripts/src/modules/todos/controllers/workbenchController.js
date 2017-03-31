export default function WorkbenchController(todosStore, todosRequests, statsFactory, editorStateFactory, $scope) {
  'ngInject';
  let vm = this;

  exposeTodos();
  initEditorStateWithKeyboardShortcuts();
  exposeTodoSelection();
  initDestroyListeners();

  function exposeTodos() {
    vm.removeStoreSubcription = todosStore.placeListener(() => {
      vm.todos = todosStore.withdrawTodos();
      vm.typeStats = statsFactory.newTypeStats(vm.todos);
      vm.completionStats = statsFactory.newCompletionStats(vm.todos);
    });
    todosRequests.getUserTodos();
  }

  function initEditorStateWithKeyboardShortcuts() {
    vm.editorState = editorStateFactory.newEditorState($scope.$apply.bind($scope));
    vm.editorState.setKeyboardShortcuts();
  }

  function exposeTodoSelection() {
    vm.setSelectedTodo = (todo) => {
      if(vm.selectedTodo === todo) {
        vm.selectedTodo = null;
        vm.editorState.gotoEmptyEditor();
      } else {
        vm.selectedTodo = todo;
        vm.editorState.gotoSelectedTodo(todo);
      }
    };
  }

  function initDestroyListeners() {
    $scope.$on("$destroy", () => {
      vm.editorState.removeKeyboardShortcuts()
      vm.removeStoreSubcription();
    });
  }
}
