import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("ViewTodoController", () => {
  let viewTodoController, $controller, $stateParams, todosStore;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _$stateParams_, _todosStore_) => {
    $controller = _$controller_;
    $stateParams = _$stateParams_;
    todosStore = _todosStore_;
  }));

  describe("instantiation", () => {
    it("#exposes a todo after fetching it from the todosStore", () => {
      let todo = { id: 1 };
      $stateParams.todoId = todo.id;
      spyOn(todosStore, 'withdrawTodo').and.returnValue(todo);

      viewTodoController = $controller('viewTodoController');

      expect(todosStore.withdrawTodo).toHaveBeenCalledWith(todo.id);
      expect(viewTodoController.todo).toBe(todo);
    });
  });
});
