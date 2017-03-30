import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("NewTodoController", () => {
  let newTodoController, todosRequests, $controller, $state, $rootScope, scope;

  beforeEach(module(todoModule));

  beforeEach(inject((_todosRequests_, _$controller_, _$state_, _$rootScope_) => {
    todosRequests = _todosRequests_;
    $controller = _$controller_;
    $state = _$state_;
    scope = _$rootScope_.$new();
  }));

  describe("instantiation", () => {
    it("instantiates and exposes the appropriate fields", () => {
      newTodoController = $controller('newTodoController', { $scope: scope });

      expect(newTodoController.todo).toBeDefined();
      expect(newTodoController.todo.name).toEqual("");
      expect(newTodoController.todo.type).toEqual("");
      expect(newTodoController.todo.finished).toEqual(false);
      expect(newTodoController.todo.description).toEqual("");
    });
  });

  describe("#submit", () => {
    xit("makes a request to create a todo");
    xit("sets the selected todo of the work bench to be the created todo upon a successful request")
    xit("transitions to the 'workbench.viewTodo' upon a successful request");
  })
});
