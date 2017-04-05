import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

xdescribe("TodoEditor", () => {
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


  function _verifyActionFiresListener(action) {
    let listener = jasmine.createSpy('listener');
    todoEditor.placeSelectionListener(listener);
    action();
    expect(listener.calls.count()).toEqual(2);
  }
});
