import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("NewTodoController", () => {
  let newTodoController, todosRequests, $controller;

  beforeEach(module(todoModule));

  beforeEach(inject((_todosRequests_, _$controller_) => {
    todosRequests = _todosRequests_;
    $controller = _$controller_;
  }));

  describe("instantiation", () => {
    it("instantiates and exposes the appropriate fields", () => {
      newTodoController = $controller('newTodoController');

      expect(newTodoController.todoName).toBeDefined();
      expect(newTodoController.todoFinished).toBeDefined();
      expect(newTodoController.todoTypeId).toBeDefined();
      expect(newTodoController.todoDescription).toBeDefined();
    });
  });
});
