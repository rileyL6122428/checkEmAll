import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("TodoTypeTag", () => {
  let $rootScope, $compile, todoTypeTag, todoTypeTagScope;

  beforeEach(module(todoModule));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe("#link", () => {
    it("it puts todoType into scope", () => {
      _setupTodoTagType({ todo: { type: "work" } });
      expect(todoTypeTagScope.todoType).toEqual("work");
    });

    it("it sets todoType to 'unassigned' when todo.type is empty", () => {
      _setupTodoTagType({ todo: { type: "" } });
      expect(todoTypeTagScope.todoType).toEqual("unassigned");
    });
  });

  function _setupTodoTagType(params) {
    $rootScope.todo = params.todo;
    todoTypeTag = $compile("<todo-type-tag todo='todo'></todo-type-tag>")($rootScope);
    todoTypeTagScope = todoTypeTag.isolateScope();
  }
});
