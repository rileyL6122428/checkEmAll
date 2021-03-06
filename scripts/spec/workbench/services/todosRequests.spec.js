import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';

const {inject, module} = angular.mock;

describe("TodoRequests", () => {
  let $httpBackend, $ngRedux, todosRequests, todosStore;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_todosRequests_, _$httpBackend_, _$ngRedux_, _todosStore_) => {
    todosRequests = _todosRequests_;
    $httpBackend = _$httpBackend_;
    $ngRedux = _$ngRedux_;
    todosStore = _todosStore_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  describe("#getUserTodos", () => {
    it("dispatches an action to update the the redux state upon success", () => {
      let todos = [
        { id: 1, description: "MOCK DESCRIPTION 1"},
        { id: 2, description: "MOCK DESCRIPTION 2"},
      ];
      $httpBackend.expectGET('/api/todos?userId=1').respond(200, todos);
      spyOn($ngRedux, 'getState').and.returnValue({ currentUser: { id: 1 } });
      spyOn(todosStore, 'depositTodos');

      todosRequests.getUserTodos({ userId: 1 });
      $httpBackend.flush();

      expect(todosStore.depositTodos).toHaveBeenCalledWith(todos);
    });
  });

  describe("#createTodo", () => {
    it("deposits a persisted todo upon a successful request", () => {
      let persistedTodo = { id: 1, description: "MOCK DESCRIPTION"};
      $httpBackend.expectPOST('/api/todo').respond(201, persistedTodo);
      spyOn($ngRedux, 'getState').and.returnValue({ currentUser: { id: 1 } });
      spyOn(todosStore, 'depositTodo');

      todosRequests.createTodo({ name: "MOCK_TODO_NAME" });
      $httpBackend.flush();

      expect(todosStore.depositTodo).toHaveBeenCalledWith(persistedTodo);
    });
  });

  describe("#updateTodo", () => {
    it("deposits an updated todo upon a successful request", () => {
      let updatedTodo = { id: 1, finished: true };
      $httpBackend.expectPUT('/api/todo').respond(200, updatedTodo);
      spyOn(todosStore, 'depositTodo');

      todosRequests.updateTodo(updatedTodo);
      $httpBackend.flush();

      expect(todosStore.depositTodo).toHaveBeenCalledWith(updatedTodo);
    });
  });
});
