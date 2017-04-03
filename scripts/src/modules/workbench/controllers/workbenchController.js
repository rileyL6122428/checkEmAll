export default function WorkbenchController(todosStore, todosRequests, statsFactory, editorStateFactory, $scope, todoSelection) {
  'ngInject';
  let vm = this;

  exposeTodos();
  initEditorStateWithKeyboardShortcuts();
  exposeTodoSelection();
  initDestroyListeners();

  function exposeTodos() {
    vm.removeStoreSubcription = todosStore.placeListener(() => {
      _syncTodosAndTodosStats();
      _syncSelectedTodo();
    });
    todosRequests.getUserTodos();
  }

  function _syncTodosAndTodosStats() {
    vm.todos = todosStore.withdrawQueuedTodos();
    vm.typeStats = statsFactory.newTypeStats(vm.todos);
    vm.completionStats = statsFactory.newCompletionStats(vm.todos);
  }

  function _syncSelectedTodo() {
    if(vm.selectedTodo)
      vm.selectedTodo = todosStore.withdrawTodo(vm.selectedTodo.id);
  }

  function initEditorStateWithKeyboardShortcuts() {
    vm.editorState = editorStateFactory.newEditorState($scope.$apply.bind($scope));
    vm.editorState.setKeyboardShortcuts();
  }

  function exposeTodoSelection() {
    vm.setSelectedTodo = (todo) => {
      if(vm.selectedTodo === todo) {
        vm.selectedTodo = null;
        todoSelection.clearSelection();
        vm.editorState.gotoEmptyEditor();
      } else {
        vm.selectedTodo = todo;
        todoSelection.setSelectedTodo(todo);
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
