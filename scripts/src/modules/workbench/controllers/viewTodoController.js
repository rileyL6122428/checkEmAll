export default function ViewTodoController(todoEditor, EDITOR_MODES) {
  'ngInject';
  let vm = this;

  vm.todo = todoEditor.getSelectedTodo();

  vm.gotoEditMode = () => {
    todoEditor.switchMode({
      selectedTodo: vm.todo,
      mode: EDITOR_MODES.EDIT
    });
  };
}
