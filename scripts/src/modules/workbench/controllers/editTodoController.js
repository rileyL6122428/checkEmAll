import modalTemplate from '../templates/dequeueModal.html';

export default function EditController($scope, todosRequests, dequeueModalLauncher, todoEditor) {
  'ngInject';
  let vm = this;

  vm.todo = todoEditor.getSelectedTodo();

  vm.dequeueableForm = true;
  vm.launchDequeueModal = () => {
    dequeueModalLauncher.launchModal(vm.todo);
  };

  vm.submit = () => {
    todosRequests.updateTodo(vm.todo)
    .then((updatedTodo) => {
      todoEditor.switchToViewMode(updatedTodo);
    });
  };
}
