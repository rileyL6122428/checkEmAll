import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("WorkbenchController", () => {
  let workbenchController, $controller, todosRequests, $state, todosStore;

  beforeEach(module(todoModule));

  beforeEach(inject((_$controller_, _todosRequests_, _$state_, _todosStore_) => {
    $controller = _$controller_;
    todosRequests = _todosRequests_;
    $state = _$state_;
    todosStore = _todosStore_;
  }));

  beforeEach(() => spyOn(todosRequests, 'getUserTodos'));

  describe("instantiation", () => {
    it("places a listener in the todosStore that withdraws todos", () => {
      let storeTodos = [{ id: 1 }, { id: 2 }];
      spyOn(todosStore, 'withdrawTodos').and.returnValue(storeTodos);
      spyOn(todosStore, 'placeListener');

      workbenchController = $controller('workbenchController');
      expect(todosStore.placeListener).toHaveBeenCalled();
      let placedListener = todosStore.placeListener.calls.first().args[0];
      placedListener();

      expect(workbenchController.todos).toBe(storeTodos);
    });

    it("makes a request for the users todos", () => {
      workbenchController = $controller('workbenchController');
      expect(todosRequests.getUserTodos).toHaveBeenCalled();
    });
  });

  describe("#setSelectedTodo", () => {
    it("sets .selectedTodo to the provided todo", () => {
      let todo = { id: 1, description: "MOCK_DESCRIPTION" };
      workbenchController = $controller('workbenchController');
      workbenchController.setSelectedTodo(todo);
      expect(workbenchController.selectedTodo).toBe(todo);
    });

    it("sets .selectedTodo to null if the provided todo is equal to the selected todo", () => {
      let todo = { id: 1, description: "MOCK_DESCRIPTION" };
      workbenchController = $controller('workbenchController');
      workbenchController.setSelectedTodo(todo);
      workbenchController.setSelectedTodo(todo);
      expect(workbenchController.selectedTodo).toBe(null);
    });
  });
});
