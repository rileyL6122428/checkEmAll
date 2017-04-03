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
    .then (_setSelectedTodoInWorkbenchCtrl)
    .then(_gotoViewMode);
  };

  function _setSelectedTodoInWorkbenchCtrl(createdTodo) {
    let workbenchController = $scope.$parent.vm;
    workbenchController.setSelectedTodo(createdTodo);
    return createdTodo;
  }

  function _gotoViewMode(createdTodo) {
    $state.go('workbench.viewTodo', { todoId: createdTodo.id });
  }
}
