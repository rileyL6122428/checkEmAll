export default function WorkbenchController($scope, todosStore, todosRequests, todoEditor, EDITOR_MODES) {
  'ngInject';
  let vm = this;

  let removeStoreSubcription = todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawQueuedTodos();
  });

  $scope.$on('$destroy', removeStoreSubcription);

  todosRequests.getUserTodos();

  vm.selectNewTodo = () => {
    todoEditor.switchModes({ mode: EDITOR_MODES.NEW });
  };
}
