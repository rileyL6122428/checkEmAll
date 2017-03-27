import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("TodosController", () => {
  let todosController, $controller, todosRequests, $state, todosStore;

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

      todosController = $controller('todosController');
      expect(todosStore.placeListener).toHaveBeenCalled();
      let placedListener = todosStore.placeListener.calls.first().args[0];
      placedListener();

      expect(todosController.todos).toBe(storeTodos);
    });

    it("makes a request for the users todos", () => {
      todosController = $controller('todosController');
      expect(todosRequests.getUserTodos).toHaveBeenCalled();
    });
  });
});
