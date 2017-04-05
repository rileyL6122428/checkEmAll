import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("TodoEditor", () => {
  let EDITOR_MODES;
  let $state, todoFactory;
  let todoEditor;

  inject((_EDITOR_MODES_) => EDITOR_MODES = _EDITOR_MODES_);

  beforeEach(module(workbenchModule));

  beforeEach(inject((_todoEditor_, _$state_, _todoFactory_, _EDITOR_MODES_) => {
    todoEditor = _todoEditor_;
    $state = _$state_;
    todoFactory = _todoFactory_;
    EDITOR_MODES = _EDITOR_MODES_;
  }));

  describe("initialization", () => {
    it("begins in empty mode", () => {
      expect(todoEditor.getCurrentMode()).toEqual(EDITOR_MODES.EMPTY);
    });

    it("begins with selectedTodo set to null", () => {
      expect(todoEditor.getSelectedTodo()).toEqual(null);
    });
  });

  describe("#placeSelectionListener", () => {
    it("immediately calls the listener", () => {
      let listener = jasmine.createSpy('listener');
      todoEditor.placeSelectionListener(listener);
      expect(listener.calls.count()).toEqual(1);
    });

    it("caches a callback that is called whenever a todoIsSelected", () => {
      let listener = jasmine.createSpy('listener');
      let todo = { id: 1, description: "MOCK_TODO_DESCRIPTION" };

      todoEditor.placeSelectionListener(listener);
      todoEditor.setSelectedTodo(todo);

      expect(listener.calls.count()).toEqual(2);
    });

    it("returns a callback to remove the listener", () => {
      let listener = jasmine.createSpy('listener');
      let todo = { id: 1, description: "MOCK_TODO_DESCRIPTION" };
      let removeSubscription = todoEditor.placeSelectionListener(listener);

      removeSubscription();
      todoEditor.setSelectedTodo(todo);

      expect(listener.calls.count()).toEqual(1);
    });
  });

  describe("setSelectedTodo", () => {
    let todo, anotherTodo;
    beforeEach(() => {
      todo = { id: 1 };
      anotherTodo = { id: 2 };
    });

    it("sets the selected todo", () => {
      todoEditor.setSelectedTodo(todo);
      expect(todoEditor.getSelectedTodo()).toBe(todo);
    });

    it("calls any selection listeners", () => {
      _verifyActionFiresListener(() => todoEditor.setSelectedTodo(todo) );
    });

    it("transitions to 'workbench.editTodo' when in edit mode", () => {
      todoEditor.setSelectedTodo(todo);
      todoEditor.switchToEditMode();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect(todoEditor.getCurrentMode()).toEqual(EDITOR_MODES.EDIT);
      expect($state.go).toHaveBeenCalledWith('workbench.editTodo', {}, { reload: 'workbench.editTodo' });
    });

    it("transitions to 'workbench.viewTodo' when in view mode", () => {
      todoEditor.setSelectedTodo(todo);
      todoEditor.switchToViewMode();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect(todoEditor.getCurrentMode()).toEqual(EDITOR_MODES.VIEW);
      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
    });

    it("transitions to 'workbench.viewTodo' when in newTodo mode", () => {
      todoEditor.selectNewTodo();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect(todoEditor.getCurrentMode()).toEqual(EDITOR_MODES.VIEW);
      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
    });

    it("transitions to 'workbench.viewTodo' when in emptyEditor mode", () => {
      todoEditor.clearSelection();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect(todoEditor.getCurrentMode()).toEqual(EDITOR_MODES.VIEW);
      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
    });
  });

  describe("#selectNewTodo", () => {
    it("sets the selected todo to be a new todo", () => {
      todoEditor.selectNewTodo();

      let newTodo = todoEditor.getSelectedTodo();
      expect(newTodo.name).toEqual("");
      expect(newTodo.description).toEqual("");
      expect(newTodo.type).toEqual("");
      expect(newTodo.finished).toBe(false);
      expect(newTodo.queued).toBe(true);
    });

    it("calls any placed selection listeners", () => {
      _verifyActionFiresListener( () => todoEditor.selectNewTodo() );
    });

    it("goes to 'workbench.newTodo'", () => {
      spyOn($state, 'go');
      todoEditor.selectNewTodo();

      expect(todoEditor.getCurrentMode()).toEqual(EDITOR_MODES.NEW);
      expect($state.go).toHaveBeenCalledWith('workbench.newTodo');
    });
  });

  describe("#clearSelection", () => {
    it("calls any placed selection listeners", () => {
      _verifyActionFiresListener( () => todoEditor.clearSelection() );
    });

    it("sets the current todo to null", () => {
      todoEditor.clearSelection();
      expect(todoEditor.getSelectedTodo()).toBe(null);
    });

    it("transitions to 'workbench.todoNotSelected'", () => {
      spyOn($state, 'go');
      todoEditor.clearSelection();
      expect($state.go).toHaveBeenCalledWith('workbench.todoNotSelected');
    });
  });

  describe("#switchToEditMode", () => {
    describe("when in view mode", () => {
      let todo, anotherTodo;
      beforeEach(() => {
        todo = { id: 1 };
        anotherTodo = { id: 2 };
      });

      it("selects the provided todo if provided a todo", () => {
        todoEditor.setSelectedTodo(todo);
        todoEditor.switchToEditMode(todo);
        expect(todoEditor.getSelectedTodo()).toBe(todo);
      });

      xit("emits a selection event if provided a todo", () => {
          // _verifyActionFiresListener( () => todoEditor.switchToEditMode())
      });

      xit("transitions to 'workbench.editTodo'");
    });
  });


  function _verifyActionFiresListener(action) {
    let listener = jasmine.createSpy('listener');
    todoEditor.placeSelectionListener(listener);
    action();
    expect(listener.calls.count()).toEqual(2);
  }
});
