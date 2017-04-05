export default function TodoEditor($state, todoFactory, eventEmitterFactory, EDITOR_MODES) {

  let currentMode = EDITOR_MODES.EMPTY;
  let selectedTodo = null;
  let eventEmitter = eventEmitterFactory.newEventEmitter();

  return({
    placeSelectionListener(listener) {
      return eventEmitter.addListener(listener);
    },

    setSelectedTodo(todo) {
      _setTodoAndEmitSelection(todo);

      if(currentMode === EDITOR_MODES.EDIT) _transitionTo(EDITOR_MODES.EDIT);

      else _transitionTo(EDITOR_MODES.VIEW);
    },

    selectNewTodo() {
      _setTodoAndEmitSelection(todoFactory.newTodo());
      _transitionTo(EDITOR_MODES.NEW);
    },

    clearSelection() {
      _setTodoAndEmitSelection(null);
      _transitionTo(EDITOR_MODES.EMPTY);
    },

    switchToEditMode(todo) { //TODO needs safety check
      if(todo) _setTodoAndEmitSelection(todo);
      _transitionTo(EDITOR_MODES.EDIT)
    },

    switchToViewMode(todo) { //TODO needs safety check
        if(todo) _setTodoAndEmitSelection(todo);
        _transitionTo(EDITOR_MODES.VIEW);
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
