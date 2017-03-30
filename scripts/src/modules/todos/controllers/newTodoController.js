export default function NewTodoController (todosRequests, $state) {
  'ngInject';
  let vm = this;
  vm.todo = {
    name: "",
    finished: false,
    type: "",
    description: ""
  }

  vm.submit = () => {
    todosRequests.createTodo(vm.todo)
    .then ((createdTodo) => {
      $state.go('workbench.viewTodo', { todoId: createdTodo.id });
    });
  };
}
