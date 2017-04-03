import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

import modalTemplate from '../../../src/modules/todos/templates/dequeueModal.html';

describe("EditTodoController", () => {
  let editTodoController, $controller, $state, todosStore, $uibModal, todosRequests, dequeueModalLauncher;
  let scope;

  beforeEach(module(todoModule));

  beforeEach(inject((_$controller_, _$state_, _todosStore_, _$rootScope_, _$uibModal_, _todosRequests_, _dequeueModalLauncher_) => {
    $controller = _$controller_;
    $state = _$state_;
    todosStore = _todosStore_;
    $uibModal = _$uibModal_;
    todosRequests = _todosRequests_;
    dequeueModalLauncher = _dequeueModalLauncher_;
    scope = _$rootScope_.$new();
  }));

  let todo1 = { id: 1 };
  let todo2 = { id: 2 };

  beforeEach(() => $state.params = { todoId: "MOCK_TODO_ID" });

  beforeEach(() => {
    let removeStoreListener = jasmine.createSpy('removeStoreListener');
    spyOn(todosStore, 'placeListener').and.returnValue(removeStoreListener);
    spyOn(todosStore, 'withdrawTodo').and.returnValue(todo1);
    spyOn(todosStore, 'depositTodo');
  });

  it("exposes a boolean vm.dequeueableForm as true", () => {
    editTodoController = $controller('editTodoController', { $scope: scope });
    expect(editTodoController.dequeueableForm).toBe(true);
  });

  it("exposes a function vm.launchDequeueModal", () => {
    editTodoController = $controller('editTodoController', { $scope: scope });
    expect(editTodoController.launchDequeueModal).toEqual(jasmine.any(Function));
  });
  describe("vm.launchDequeueModal", () => {
    it("delegates to dequeueModalLauncher.launchModal", () => {
      spyOn(dequeueModalLauncher, 'launchModal');
      editTodoController = $controller('editTodoController', { $scope: scope });
      editTodoController.launchDequeueModal();
      expect(dequeueModalLauncher.launchModal).toHaveBeenCalledWith(editTodoController.todo);
    });
  });

  it("exposes a todo vm.todo after fetching it from the todosStore", () => {
    editTodoController = $controller('editTodoController', { $scope: scope });
    expect(todosStore.withdrawTodo).toHaveBeenCalledWith($state.params.todoId);
    expect(editTodoController.todo).toBe(todo1);
  });

  it("places a listener in the todos store that syncs vm.todo", () => {
    editTodoController = $controller('editTodoController', { $scope: scope });
    expect(todosStore.placeListener).toHaveBeenCalled();

    let storeListener = todosStore.placeListener.calls.first().args[0];
    todosStore.withdrawTodo.and.returnValue(todo2);

    storeListener();
    expect(editTodoController.todo).toBe(todo2);
    expect(todosStore.withdrawTodo).toHaveBeenCalledWith($state.params.todoId);
  });

  it('places a $watch listener on vm.todo', () => {
    spyOn(scope, '$watch');
    editTodoController = $controller('editTodoController', { $scope: scope });
    expect(scope.$watch).toHaveBeenCalledWith('vm.todo', jasmine.any(Function), true);
  });
  describe("vm.todo $watch listener callback", () => {
    it("'s callback deposits the todo being editted into the todosStore'", () => {
      spyOn(scope, '$watch');
      editTodoController = $controller('editTodoController', { $scope: scope });
      let watchListenerArgs = scope.$watch.calls.first().args;
      let listenerCallback = watchListenerArgs[1];

      listenerCallback();

      expect(todosStore.depositTodo).toHaveBeenCalledWith(editTodoController.todo);
    });
  });

  describe("$scope.$destroy listener", () => {
    xit("SHOULD BE TESTED");
  });

  describe("#submit", () => {
    xit("SHOULD BE TESTED");
  });
});
