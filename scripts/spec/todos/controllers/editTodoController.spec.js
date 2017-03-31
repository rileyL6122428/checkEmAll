import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("EditTodoController", () => {
  let editTodoController, $controller, $stateParams, todosStore;

  beforeEach(module(todoModule));

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

      editTodoController = $controller('editTodoController');

      expect(todosStore.withdrawTodo).toHaveBeenCalledWith(todo.id);
      expect(editTodoController.todo).toBe(todo);
    });
  });
});
