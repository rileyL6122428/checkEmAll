import modalTemplate from '../templates/dequeueModal.html';

export default function DequeueModalLauncher($uibModal, todosRequests, $state) {
  'ngInject';

  return ({
    launchModal(todo) {
      let modalInstance = $uibModal.open({
        template: modalTemplate,
        controller: 'dequeueController',
        controllerAs: 'vm'
      });

      modalInstance.result.then(_dequeueTodo, _logModalDismissed);

      function _dequeueTodo() {
        todo.queued = false;
        todosRequests.updateTodo(todo)
        .then(() => $state.go('workbench.todoNotSelected'));
      }

      function _logModalDismissed() {
        console.log("MODAL DISMISSED");
      }
    }
  });

}
