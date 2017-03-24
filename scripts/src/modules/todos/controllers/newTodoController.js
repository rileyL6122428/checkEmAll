export default function NewTodoController (todosRequests, $state) {
  'ngInject';
  let vm = this;

  vm.todoName = "";
  vm.todoFinished = false;
  vm.todoTypeId = 0;
  vm.todoDescription = "";

  vm.submit = () => {
    todosRequests.createTodo({
      name: vm.todoName,
      description: vm.todoDescription,
      finished: vm.todoFinished
    })

    .then (() => {
      debugger
      $state.go('todosIndex')
    });
  };
}
