import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

import modalTemplate from '../../../src/modules/todos/templates/dequeueModal.html';

describe("DequeueModalLauncher", () => {
  let dequeueModalLauncher, $uibModal, todosRequests, $state;

  beforeEach(module(todoModule));

  beforeEach(inject((_dequeueModalLauncher_, _$state_, _$uibModal_, _todosRequests_) => {
    dequeueModalLauncher = _dequeueModalLauncher_;
    $state = _$state_;
    $uibModal = _$uibModal_;
    todosRequests = _todosRequests_;
  }));

  describe("#launchModal", () => {
    let todo;
    beforeEach(() => { todo = { queued: true, id: 1 }});

    let modalInstance;
    beforeEach(() => {
      modalInstance = { result: { then: jasmine.createSpy('then') } };
      spyOn($uibModal, 'open').and.returnValue(modalInstance);
    });

    it("opens a modal by delegating to $uibModal.open", () => {
      dequeueModalLauncher.launchModal();

      expect($uibModal.open).toHaveBeenCalledWith({
        template: modalTemplate,
        controller: 'dequeueController',
        controllerAs: 'vm'
      });
    });

    it("places result listeners on the modal instance", () => {
      dequeueModalLauncher.launchModal();

      expect(modalInstance.result.then).toHaveBeenCalled();
      expect(modalInstance.result.then.calls.count()).toEqual(1);
    });

    describe("modalInstance.result.then success callback", () => {
      let successCallback;
      beforeEach(() => {
        dequeueModalLauncher.launchModal(todo);
        successCallback = modalInstance.result.then.calls.first().args[0]
      });

      it("calls todosRequests.updateTodo", () => {
        spyOn(todosRequests, 'updateTodo').and.returnValue({ then: function mock() {} });
        successCallback();
        expect(todosRequests.updateTodo).toHaveBeenCalledWith(todo);
      });

      it("sets todo.queued to false before calling todosRequests.updateTodo", () => {
        spyOn(todosRequests, 'updateTodo').and.returnValue({ then: function mock() {} });
        successCallback();
        expect(todo.queued).toBe(false);
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
});
