export default function ViewTodoController(todoSelection) {
  'ngInject';
  let vm = this;

  vm.todo = todoSelection.getSelectedTodo();
  vm.gotoEditMode = () => {
    todoSelection.switchToEditMode();
  }
}
