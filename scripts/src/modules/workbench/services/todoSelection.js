export default function TodoSelection($state) {
  const EDITOR_MODES = {
    VIEW: "VIEW",
    EDIT: "EDIT",
    NEW: "NEW",
    EMPTY: "EMPTY"
  };

  let currentMode = EDITOR_MODES.VIEW;
  let selectedTodo = null;

  return({
    setSelectedTodo(todo) {
      selectedTodo = todo;

      switch(currentMode) {
        case EDITOR_MODES.VIEW:
        case EDITOR_MODES.NEW:
        case EDITOR_MODES.EMPTY:
          currentMode = EDITOR_MODES.VIEW;
          $state.go('workbench.viewTodo');
          break;
        case EDITOR_MODES.EDIT:
          $state.go('workbench.editTodo');
          break;
      }
    },

    selectNewTodo() {
      currentMode = EDITOR_MODES.NEW;
      selectedTodo = _newTodo();
      $state.go('workbench.newTodo');
    },

    clearSelection() {
      currentMode = EDITOR_MODES.EMPTY;
      selectedTodo = null;
      $state.go('workbench.todoNotSelected');
    },

    switchToEditMode(todo) {
      if(currentMode === EDITOR_MODES.VIEW) {
        if(todo) selectedTodo = todo;
        currentMode = EDITOR_MODES.EDIT;
        $state.go('workbench.editTodo');
      }
    },

    switchToViewMode(todo) {
      if(currentMode === EDITOR_MODES.EDIT || currentMode === EDITOR_MODES.NEW) {
        if(todo) selectedTodo = todo;
        currentMode = EDITOR_MODES.VIEW;
        $state.go('workbench.viewTodo');
      }
    },

    getSelectedTodo() {
      return selectedTodo;
    }
  });

  function _newTodo() {
    return ({
      name: "",
      description: "",
      queued: true,
      finished: false,
      type: ""
    });
  }
}
