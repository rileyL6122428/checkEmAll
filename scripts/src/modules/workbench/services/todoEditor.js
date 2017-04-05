export default function TodoEditor($state, todoFactory, eventEmitterFactory, EDITOR_MODES) {

  let currentMode = EDITOR_MODES.EMPTY;
  let selectedTodo = null;
  let eventEmitter = eventEmitterFactory.newEventEmitter();

  return({
    placeSelectionListener(listener) {
      return eventEmitter.addListener(listener);
    },

    switchModes(params) {
      let selectedTodo = (params.mode === EDITOR_MODES.NEW) ? todoFactory.newTodo() : params.selectedTodo;
      _setTodoAndEmitSelection(selectedTodo);
      _transitionTo(params.mode);
    },

    getSelectedTodo() {
      return selectedTodo;
    },

    getCurrentMode() {
      return currentMode;
    }
  });

  function _setTodoAndEmitSelection(todo) {
    selectedTodo = todo;
    eventEmitter.callListeners();
  }

  function _transitionTo(mode) {
    currentMode = mode;

    switch(mode) {
      case EDITOR_MODES.EDIT:
        $state.go('workbench.editTodo', {}, { reload: 'workbench.editTodo' });
        break;
      case EDITOR_MODES.VIEW:
        $state.go('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
        break;
      case EDITOR_MODES.NEW:
        $state.go('workbench.newTodo');
        break;
      case EDITOR_MODES.EMPTY:
        $state.go('workbench.todoNotSelected');
        break;
    }
  }
}
