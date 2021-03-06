import angular from 'angular';
import 'angular-mocks';
import reduxModule from '../../../src/modules/redux/module.js';

const {inject, module} = angular.mock;

describe("TodosStore", () => {
  let $ngRedux, todosStore, $state;

  beforeEach(module(reduxModule));

  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('mock-state', { url: '/' });
  }));

  beforeEach(inject((_todosStore_, _$ngRedux_, _$state_) => {
    todosStore = _todosStore_;
    $ngRedux = _$ngRedux_;
    $state = _$state_;
  }));

  describe("#depositTodo", () => {
    it("dispatches a provided todo as an 'addTodo' action", () => {
      let todo = { id: 1, description: "description" };
      spyOn($ngRedux, 'dispatch');

      todosStore.depositTodo(todo);

      expect($ngRedux.dispatch).toHaveBeenCalledWith({
        type: "ADD_TODO",
        payload: { "1": todo }
      });
    });
  });

  describe("#depositTodos", () => {
    it("dispatches a list of provided todos as an 'addTodos' action", () => {
      let todo1 = { id: 1, description: "description1" };
      let todo2 = { id: 2, description: "description2" };
      spyOn($ngRedux, 'dispatch');

      todosStore.depositTodos([todo1, todo2]);

      expect($ngRedux.dispatch).toHaveBeenCalledWith({
        type: "ADD_TODOS",
        payload: { "1": todo1, "2": todo2 }
      });
    });
  });

  describe("#withdrawTodos", () => {
    it("grabs all todos in the store", () => {
      let todo1 = { id: 1 };
      let todo2 = { id: 2 };
      let todo3 = { id: 3 };

      todosStore.depositTodos([todo1, todo2, todo3]);
      let userTodos = todosStore.withdrawTodos();

      expect(userTodos.length).toEqual(3);
      expect(userTodos).toContain(todo1);
      expect(userTodos).toContain(todo2);
      expect(userTodos).toContain(todo3);
    });
  });

  describe("#withdrawQueuedTodos", () => {
    it("grabs all todos in the store", () => {
      let todo1 = { id: 1, queued: true };
      let todo2 = { id: 2, queued: false };
      let todo3 = { id: 3, queued: true };

      todosStore.depositTodos([todo1, todo2, todo3]);
      let userTodos = todosStore.withdrawQueuedTodos();

      expect(userTodos.length).toEqual(2);
      expect(userTodos).toContain(todo1);
      expect(userTodos).toContain(todo3);
    });
  });

  describe("#withdrawTodo", () => {
    xit("returns a todo with the supplied id");
  });
});
