import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("TodoTypeTag", () => {
  let $rootScope, $compile;

  beforeEach(module(todoModule));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe("#link", () => {
    it("it puts todoType into scope", () => {
      $rootScope.todo = { type: "work" };
      let todoTypeTag = $compile("<todo-type-tag todo='todo'></todo-type-tag>")($rootScope);
      let scope = todoTypeTag.isolateScope();

      expect(scope.todoType).toEqual("work");
    });

    it("it sets todoType to 'unassigned' when todo.type is empty", () => {
      $rootScope.todo = { type: "" };
      let todoTypeTag = $compile("<todo-type-tag todo='todo'></todo-type-tag>")($rootScope);
      let scope = todoTypeTag.isolateScope();

      expect(scope.todoType).toEqual("unassigned");
    });
  });
});
