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
    xit("sets the selected todo");
    xit("calls any callbacks placed in the serice");
  });
});
