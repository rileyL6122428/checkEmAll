export default function ViewTodoController($scope, todoSelection) {
  'ngInject';
  let vm = this;

  let removeListener = todoSelection.placeListener(() => {
    vm.todo = todoSelection.getSelectedTodo();
  });
  $scope.$on('$destroy', removeListener);

  vm.gotoEditMode = () => {
    todoSelection.switchToEditMode();
  };
}
