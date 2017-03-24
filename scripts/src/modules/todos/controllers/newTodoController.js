export default function NewTodoController (todosRequests, $state) {
  'ngInject';
  let vm = this;

  vm.todoName = "";
  vm.todoFinished = false;
  vm.todoTypeId = 0;
  vm.description = "";

  vm.submit = () => {
    todosRequests.createTodo({
      name: vm.todoName,
      description: vm.description,
      finished: vm.todoFinished
    })
    
    .then (() => $state.go('todosIndex'));
  };
}
