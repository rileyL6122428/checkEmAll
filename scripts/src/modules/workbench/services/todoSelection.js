import EventEmitter from '../classes/EventEmitter.js';

export default function TodoSelection($state, todoFactory) {
  const EDITOR_MODES = {
    VIEW: "VIEW",
    EDIT: "EDIT",
    NEW: "NEW",
    EMPTY: "EMPTY"
  };

  let currentMode = EDITOR_MODES.VIEW;
  let selectedTodo = null;
  let eventEmitter = new EventEmitter();

  return({
    placeListener(listener) {
      return eventEmitter.addListener(listener);
    },

    setSelectedTodo(todo) {
      _setTodoAndEmitSelection(todo);

      switch(currentMode) {
        case EDITOR_MODES.VIEW:
        case EDITOR_MODES.NEW:
        case EDITOR_MODES.EMPTY:
          currentMode = EDITOR_MODES.VIEW;
          $state.go('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
          break;
        case EDITOR_MODES.EDIT:
          $state.go('workbench.editTodo', {}, { reload: 'workbench.editTodo' });
          break;
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
      if(currentMode === EDITOR_MODES.EDIT || currentMode === EDITOR_MODES.NEW) {
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
