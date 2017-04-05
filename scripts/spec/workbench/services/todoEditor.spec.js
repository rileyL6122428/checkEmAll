import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("TodoEditor", () => {
  let $state, todoFactory;
  let todoEditor;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_todoEditor_, _$state_, _todoFactory_) => {
    todoEditor = _todoEditor_;
    $state = _$state_;
    todoFactory = _todoFactory_;
  }));

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
      let listener = jasmine.createSpy('listener');
      todoEditor.placeSelectionListener(listener);
      todoEditor.setSelectedTodo(todo);
      expect(listener).toHaveBeenCalled();
    });

    it("transitions to 'workbench.editTodo' when in edit mode", () => {
      todoEditor.setSelectedTodo(todo);
      todoEditor.switchToEditMode();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect($state.go).toHaveBeenCalledWith('workbench.editTodo', {}, { reload: 'workbench.editTodo' });
    });

    it("transitions to 'workbench.viewTodo' when in view mode", () => {
      todoEditor.setSelectedTodo(todo);
      todoEditor.switchToViewMode();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
    });

    it("transitions to 'workbench.viewTodo' when in newTodo mode", () => {
      todoEditor.selectNewTodo();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
    });

    it("transitions to 'workbench.viewTodo' when in emptyEditor mode", () => {
      todoEditor.clearSelection();

      spyOn($state, 'go');
      todoEditor.setSelectedTodo(anotherTodo);

      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', {}, { reload: 'workbench.viewTodo' });
    });
  });
});
