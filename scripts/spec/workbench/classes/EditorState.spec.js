import EditorState from '../../../src/modules/workbench/classes/EditorState.js';

describe("EditorState", () => {
  let editorState, $state, $apply;

  beforeEach(() => {
    $state = {
      go: jasmine.createSpy('$state.go'),
      is: jasmine.createSpy('$state.is')
    };
  });

  beforeEach(() => $apply = jasmine.createSpy('$apply'));

  beforeEach(() => editorState = new EditorState($state, $apply));

  describe("#constructor", () => {
    it("instantiates with current mode set to view", () => {
      expect(editorState.currentMode).toEqual('VIEW');
    });
  });

  describe("#gotoEmptyEditor", () => {
    it("transitions to 'workbench.todoNotSelected'", () => {
      editorState.gotoEmptyEditor();
      expect($state.go).toHaveBeenCalledWith('workbench.todoNotSelected');
    });
  });

  describe("#gotoSelectedTodoEditor", () => {
    let todo = { id: 1 };

    it("transitions to 'workbench.viewTodo' with the supplied todos' id when in view mode", () => {
      editorState.currentMode = "VIEW";
      editorState.gotoSelectedTodo(todo);
      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', { todoId: todo.id });
    });

    it("transitions to 'workbench.editTodo' with the supplied todos' id when in edit mode", () => {
      editorState.currentMode = "EDIT";
      editorState.gotoSelectedTodo(todo);
      expect($state.go).toHaveBeenCalledWith('workbench.editTodo', { todoId: todo.id });
    });
  });

  describe("#gotoNewTodo", () => {
    it("transitions to 'workbench.todoNotSelected'", () => {
      editorState.gotoNewTodo();
      expect($state.go).toHaveBeenCalledWith('workbench.todoNotSelected');
    });
  });


  describe("#_switchToEditMode", () => {
    beforeEach(() => editorState.currentMode = "VIEW");

    it("changes the current mode to edit", () => {
      editorState._switchToEditMode();
      expect(editorState.currentMode).toEqual("EDIT");
    });

    it("transitions to 'workbench.editTodo' if the current state is 'workbench.viewTodo'", () => {
      $state.params = { mock: "MOCK" };
      $state.is.and.returnValue(true);

      editorState._switchToEditMode();
      expect($state.is).toHaveBeenCalledWith("workbench.viewTodo");
      expect($state.go).toHaveBeenCalledWith('workbench.editTodo', $state.params);
    });
  })

  describe("#_switchToViewMode", () => {
    beforeEach(() => editorState.currentMode = "EDIT");

    it("_switchToViewMode changes the current mode to view", () => {
      editorState._switchToViewMode();
      expect(editorState.currentMode).toEqual("VIEW");
    });

    it("_switchToViewMode transitions to 'workbench.viewTodo' if the current state is 'workbench.editTodo'", () => {
      $state.params = { mock: "MOCK" };
      $state.is.and.returnValue(true);

      editorState._switchToViewMode();
      expect($state.is).toHaveBeenCalledWith("workbench.editTodo");
      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', $state.params);
    });
  });
});
