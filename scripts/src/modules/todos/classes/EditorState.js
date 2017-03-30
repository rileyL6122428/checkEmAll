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

  gotoSelectedTodo() {
    switch(this.currentMode) {
      case EDITOR_MODES.VIEW:
        this.$state.go('workbench.viewTodo');
        break;
      case EDITOR_MODES.EDIT:
        this.$state.go('workbench.editTodo');
        break;
    }
  }

  gotoNewTodo() {
    this.$state.go('workbench.todoNotSelected');
  }

  setKeyboardShortcuts() {
    let self = this;

    key('⌘+e, ctrl+e', function(event, handler){
      self.$apply(() => {
        self.currentMode = EDITOR_MODES.EDIT;
        if(self.$state.is('workbench.viewTodo'))
          self.$state.go('workbench.editTodo');
      });
    });

    key('⌘+v, ctrl+v', function(event, handler){
      self.$apply(() => {
        self.currentMode = EDITOR_MODES.VIEW;
        if(self.$state.is('workbench.editTodo'))
          self.$state.go('workbench.viewTodo');
      });
    });
  }

  removeKeyboardShortcuts() {
    key.unbind()
  }
}
