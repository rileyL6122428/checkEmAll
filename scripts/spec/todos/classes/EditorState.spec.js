import { EditorState } from '../../../src/modules/todos/classes/EditorState.js';

describe("EditorState", () => {
  describe("#constructor", () => {
    xit("instantiates with current mode set to view");
  });

  describe("#gotoEmptyEditor", () => {
    xit("transitions to 'workbench.todoNotSelected'");
  });

  describe("#gotoViewTodoEditor", () => {
    xit("transitions to 'workbench.viewTodo' with the supplied todos' id when in view mode");
    xit("transitions to 'workbench.editTodo' with the supplied todos' id when in edit mode");
  });

  describe("#gotoNewTodo", () => {
    xit("transitions to 'workbench.todoNotSelected'");
  });

  describe("#setKeyboardShortcuts", () => {
    xit("_moveToEditMode changes the current mode to edit")
    xit("_moveToEditMode transitions to 'workbench.editTodo' if the current state is 'workbench.viewTodo'");

    xit("_moveToViewMode changes the current mode to view")
    xit("_moveToViewMode transitions to 'workbench.viewTodo' if the current state is 'workbench.editTodo'");
  });
});
