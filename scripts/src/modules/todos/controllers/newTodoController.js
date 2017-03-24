export default function NewTodoController (todosRequests, $state) {
  'ngInject';
  let vm = this;

  vm.todoName = "";
  vm.todoFinished = false;
  vm.todoType = "";
  vm.todoDescription = "";

  vm.submit = () => {
    todosRequests.createTodo({
      name: vm.todoName,
      description: vm.todoDescription,
      finished: vm.todoFinished,
      type: vm.todoType
    })

    .then (() => $state.go('todosIndex'));
  };
}
