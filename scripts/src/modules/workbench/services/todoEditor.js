export default function TodoEditor($state, todoFactory, eventEmitterFactory) {
  const EDITOR_MODES = {
    VIEW: "VIEW",
    EDIT: "EDIT",
    NEW: "NEW",
    EMPTY: "EMPTY"
  };

  let currentMode = EDITOR_MODES.VIEW;
  let selectedTodo = null;
  let eventEmitter = eventEmitterFactory.newEventEmitter();

  return({
    placeSelectionListener(listener) {
      return eventEmitter.addListener(listener);
    },

    setSelectedTodo(todo) {
      _setTodoAndEmitSelection(todo);

      if(currentMode === EDITOR_MODES.EDIT) {
        $state.go('workbench.editTodo', {}, { reload: 'workbench.editTodo' });
      } else {
        currentMode = EDITOR_MODES.VIEW;
        $state.go('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
      }
    },

    selectNewTodo() {
      currentMode = EDITOR_MODES.NEW;
      _setTodoAndEmitSelection(todoFactory.newTodo());
      $state.go('workbench.newTodo');
    },

    clearSelection() {
      currentMode = EDITOR_MODES.EMPTY;
      _setTodoAndEmitSelection(null);
      $state.go('workbench.todoNotSelected');
    },

    switchToEditMode(todo) {
      if(currentMode === EDITOR_MODES.VIEW) {
        if(todo) _setTodoAndEmitSelection(todo);
        currentMode = EDITOR_MODES.EDIT;
        $state.go('workbench.editTodo');
      }
    },

    switchToViewMode(todo) {
      if(currentMode === EDITOR_MODES.EDIT) {
        if(todo) _setTodoAndEmitSelection(todo);
        currentMode = EDITOR_MODES.VIEW;
        $state.go('workbench.viewTodo');
      }
    },

    getSelectedTodo() {
      return selectedTodo;
    }
  });

  function _setTodoAndEmitSelection(todo) {
    selectedTodo = todo;
    eventEmitter.callListeners();
  }
}
