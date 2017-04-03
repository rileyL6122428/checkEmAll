export default function NewTodoController (todosRequests, todoSelection) {
  'ngInject';
  let vm = this;

  vm.todo = todoSelection.getSelectedTodo();

  vm.submit = () => {
    todosRequests.createTodo(vm.todo)
    .then((createdTodo) => {
      todoSelection.switchToViewMode(createdTodo);
    });
  };
}
