export default function ViewTodoController($scope, todoSelection) {
  'ngInject';
  let vm = this;

  vm.todo = todoSelection.getSelectedTodo();

  vm.gotoEditMode = () => {
    todoSelection.switchToEditMode();
  };
}
