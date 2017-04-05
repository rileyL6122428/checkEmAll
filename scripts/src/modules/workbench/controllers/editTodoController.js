import modalTemplate from '../templates/dequeueModal.html';

export default function EditController($scope, todosRequests, dequeueModalLauncher, todoEditor, EDITOR_MODES) {
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
      todoEditor.switchModes({
        selectedTodo: updatedTodo,
        mode: EDITOR_MODES.VIEW
      });
    });
  };
}
