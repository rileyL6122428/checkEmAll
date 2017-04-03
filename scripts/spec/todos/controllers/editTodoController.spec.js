import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

import modalTemplate from '../../../src/modules/todos/templates/dequeueModal.html';

describe("EditTodoController", () => {
  let editTodoController, $controller, $state, todosStore, $uibModal, todosRequests;
  let scope;

  beforeEach(module(todoModule));

  beforeEach(inject((_$controller_, _$state_, _todosStore_, _$rootScope_, _$uibModal_, _todosRequests_) => {
    $controller = _$controller_;
    $state = _$state_;
    todosStore = _todosStore_;
    $uibModal = _$uibModal_;
    todosRequests = _todosRequests_;
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
    let modalInstance;
    beforeEach(() => {
      modalInstance = { result: { then: jasmine.createSpy('then') } };
      spyOn($uibModal, 'open').and.returnValue(modalInstance);
    });

    it("opens a modal by delegating to $uibModal.open", () => {
      editTodoController = $controller('editTodoController', { $scope: scope });
      editTodoController.launchDequeueModal();

      expect($uibModal.open).toHaveBeenCalledWith({
        template: modalTemplate,
        controller: 'dequeueController',
        controllerAs: 'vm'
      });
    });

    it("places result listeners on the modal instance", () => {
      editTodoController = $controller('editTodoController', { $scope: scope });
      editTodoController.launchDequeueModal();

      expect(modalInstance.result.then).toHaveBeenCalled();
      expect(modalInstance.result.then.calls.count()).toEqual(1);
    });

    describe("result.then success callback", () => {
      let successCallback;
      beforeEach(() => {
        editTodoController = $controller('editTodoController', { $scope: scope });
        editTodoController.launchDequeueModal();
        successCallback = modalInstance.result.then.calls.first().args[0]
      });

      it("sets vm.todo.queued to false", () => {
        successCallback();
        expect(editTodoController.todo.queued).toBe(false);
      });

      it("calls todosRequests.updateTodo with vm.todo", () => {
        spyOn(todosRequests, 'updateTodo').and.returnValue({ then: function mock() {} });
        successCallback();
        expect(todosRequests.updateTodo).toHaveBeenCalledWith(editTodoController.todo);
      });

      it("transitions to 'workbench.todoNotSelected' after updating the todo", () => {
        let updateTodoPromise = { then: jasmine.createSpy('then') };
        spyOn(todosRequests, 'updateTodo').and.returnValue(updateTodoPromise);
        spyOn($state, 'go');

        successCallback();
        let promiseSuccessCallback = updateTodoPromise.then.calls.first().args[0];
        promiseSuccessCallback();

        expect($state.go).toHaveBeenCalledWith('workbench.todoNotSelected');
      });
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
