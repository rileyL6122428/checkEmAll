export default function NewTodoController (todosRequests, todoEditor) {
  'ngInject';
  let vm = this;

  vm.todo = todoEditor.getSelectedTodo();

  vm.submit = () => {
    todosRequests.createTodo(vm.todo)
    .then((createdTodo) => {
      debugger
      todoEditor.switchToViewMode(createdTodo);
    });
  };
}
