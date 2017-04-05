export default function NewTodoController (todosRequests, todoEditor, EDITOR_MODES) {
  'ngInject';
  let vm = this;

  vm.todo = todoEditor.getSelectedTodo();

  vm.submit = () => {
    todosRequests.createTodo(vm.todo)
    .then((createdTodo) => {
      todoEditor.switchModes({
        selectedTodo: createdTodo,
        mode: EDITOR_MODES.VIEW
      });
    });
  };
}
