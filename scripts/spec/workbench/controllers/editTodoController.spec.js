import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

import modalTemplate from '../../../src/modules/workbench/templates/dequeueModal.html';

describe("EditTodoController", () => {
  let $controller, todosStore, $uibModal, todosRequests, dequeueModalLauncher, todoSelection;
  let vm, scope;
  let $q;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _$rootScope_, _$uibModal_, _todosRequests_, _dequeueModalLauncher_, _todoSelection_, _$q_) => {
    $controller = _$controller_;
    $uibModal = _$uibModal_;
    todosRequests = _todosRequests_;
    dequeueModalLauncher = _dequeueModalLauncher_;
    todoSelection = _todoSelection_
    scope = _$rootScope_.$new();
    $q = _$q_;
  }));


  describe("controller state", () => {
    it("exposes the selected todo from the todoSelection service", () => {
      let selectedTodo = { id: 1 };
      todoSelection.setSelectedTodo(selectedTodo);
      vm = $controller('editTodoController', { $scope: scope });
      expect(vm.todo).toBe(selectedTodo);
    });

    it("exposes a boolean 'dequeueableForm' as true", () => {
      vm = $controller('editTodoController', { $scope: scope });
      expect(vm.dequeueableForm).toBe(true);
    });

    it("exposes a function called 'launchDequeueModal'", () => {
      vm = $controller('editTodoController', { $scope: scope });
      expect(vm.launchDequeueModal).toEqual(jasmine.any(Function));
    });

    describe('launchDequeueModal', () => {
      it("launches a modal by deferring to 'dequeueModalLauncher.launchModal'", () => {
        spyOn(dequeueModalLauncher, 'launchModal');
        vm = $controller('editTodoController', { $scope: scope });
        vm.todo = { id: 1, description: "MOCK_DESCRIPTION" };

        vm.launchDequeueModal();

        expect(dequeueModalLauncher.launchModal).toHaveBeenCalledWith(vm.todo);
      });
    });

    it("exposes a function called 'submit'", () => {
      vm = $controller('editTodoController', { $scope: scope });
      expect(vm.submit).toEqual(jasmine.any(Function));
    });

    describe("submit", () => {
      let deferred;
      beforeEach(() => {
        deferred = $q.defer();
        spyOn(todosRequests, 'updateTodo').and.returnValue(deferred.promise);
        vm = $controller('editTodoController', { $scope: scope });
      });

      it("delegates to 'todosRequests.updateTodo' to update the todo", () => {
        vm.todo = { id: 1, description: "MOCK_DESCRIPTION" };
        vm.submit();
        expect(todosRequests.updateTodo).toHaveBeenCalledWith(vm.todo);
      });

      it("upon a successful update, it then delegates to 'todoSelection.switchToViewMode' to switch to view mode", () => {
        vm.todo = { id: 1, description: "MOCK_DESCRIPTION" };
        spyOn(todoSelection, 'switchToViewMode');

        vm.submit();
        deferred.resolve(vm.todo);
        scope.$apply();

        expect(todoSelection.switchToViewMode).toHaveBeenCalledWith(vm.todo);
      });
    });
  });
});
