const EDITOR_MODES = {
  VIEW: "VIEW",
  EDIT: "EDIT",
}
export default class EditorState {
  constructor($state, $apply) {
    this.currentMode = EDITOR_MODES.VIEW;
    this.$state = $state;
    this.$apply = $apply;
  }

  gotoEmptyEditor() {
    this.$state.go('workbench.todoNotSelected');
  }

  gotoSelectedTodo(todo) {
    switch(this.currentMode) {
      case EDITOR_MODES.VIEW:
        this.$state.go('workbench.viewTodo', { todoId: todo.id });
        break;
      case EDITOR_MODES.EDIT:
        this.$state.go('workbench.editTodo', { todoId: todo.id });
        break;
    }
  }

  gotoNewTodo() {
    this.$state.go('workbench.todoNotSelected');
  }

  setKeyboardShortcuts() {
    let self = this;
    key('⌘+e, ctrl+e', () => {
      self.$apply(() => self._switchToEditMode());
    });

    key('⌘+v, ctrl+v', () => {
      self.$apply(() => self._switchToViewMode());
    });
  }

  _switchToEditMode() {
    this.currentMode = EDITOR_MODES.EDIT;
    if(this.$state.is('workbench.viewTodo'))
      this.$state.go('workbench.editTodo', this.$state.params);
  }

  _switchToViewMode() {
    this.currentMode = EDITOR_MODES.VIEW;
    if(this.$state.is('workbench.editTodo'))
      this.$state.go('workbench.viewTodo', this.$state.params);
  }

  removeKeyboardShortcuts() {
    key.unbind('⌘+e, ctrl+e');
    key.unbind('⌘+v, ctrl+v');
  }
}
