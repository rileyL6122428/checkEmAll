export default function TodoSelection($state, EditorState) {
  const EDITOR_MODES = {
    VIEW: "VIEW",
    EDIT: "EDIT",
    NEW: "NEW",
    EMPTY: "EMPTY"
  }

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
          $state.go('workbench.viewTodo', { todoId: 999 }); //TODO REMOVE STATE PARAMS
          break;
        case EDITOR_MODES.EDIT:
          $state.go('workbench.editTodo', { todoId: 999 }); //TODO REMOVE STATE PARAMS
          break;
      }
    },

    selectNewTodo() {
      currentMode = EDITOR_MODES.NEW;
      selectedTodo = null; //TODO replace with Todo object to pass in through config object
      $state.go('workbench.newTodo');
    },

    clearSelection() {
      currentMode = EDITOR_MODES.EMPTY;
      selectedTodo = null;
      $state.go('workbench.todoNotSelected');
    },

    switchToEditMode() {
      if(currentMode === EDITOR_MODES.VIEW) {
        currentMode = EDITOR_MODES.EDIT;
        $state.go('workbench.editTodo', { todoId: 999 }); //TODO REMOVE STATE PARAMS
      }
    }

    switchToViewMode() {
      if(currentMode === EDITOR_MODES.EDIT) {
        currentMode = EDITOR_MODES.VIEW;
        $state.go('workbench.viewTodo', { todoId: 999 }); //TODO REMOVE STATE PARAMS
      }
    }

    getSelectedTodo() {
      return selectedTodo;
    }
  })
}
