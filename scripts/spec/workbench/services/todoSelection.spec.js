import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("TodoSelection", () => {
  let $state, todoFactory;
  let todoSelection;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_todoSelection_, _$state_, _todoFactory_) => {
    todoSelection = _todoSelection_;
    $state = _$state_;
    todoFactory = _todoFactory_;
  }));

  describe("#placeListener", () => {
    it("immediately calls the listener", () => {
      let listener = jasmine.createSpy('listener');
      todoSelection.placeListener(listener);
      expect(listener.calls.count()).toEqual(1);
    });

    it("caches a callback that is called whenever a todoIsSelected", () => {
      let listener = jasmine.createSpy('listener');
      let todo = { id: 1, description: "MOCK_TODO_DESCRIPTION" };

      todoSelection.placeListener(listener);
      todoSelection.setSelectedTodo(todo);

      expect(listener.calls.count()).toEqual(2);
    });

    it("returns a callback to remove the listener", () => {
      let listener = jasmine.createSpy('listener');
      let todo = { id: 1, description: "MOCK_TODO_DESCRIPTION" };
      let removeSubscription = todoSelection.placeListener(listener);

      removeSubscription();
      todoSelection.setSelectedTodo(todo);

      expect(listener.calls.count()).toEqual(1);
    });
  });

  describe("setSelectedTodo", () => {
    xit("sets the selected todo");
    xit("calls any callbacks placed in the serice");
  });
});
