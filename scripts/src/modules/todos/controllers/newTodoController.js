export default function NewTodoController (todosRequests, $state, $scope) {
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
      let workbenchController = $scope.$parent.vm;
      workbenchController.setSelectedTodo(createdTodo);
      return createdTodo;
    })
    .then((createdTodo) => {
      $state.go('workbench.viewTodo', { todoId: createdTodo.id });
    });
  };
}
