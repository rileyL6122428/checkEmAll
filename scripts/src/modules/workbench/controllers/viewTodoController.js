export default function ViewTodoController(todoEditor) {
  'ngInject';
  let vm = this;

  vm.todo = todoEditor.getSelectedTodo();

  vm.gotoEditMode = () => {
    todoEditor.switchToEditMode();
  };
}
