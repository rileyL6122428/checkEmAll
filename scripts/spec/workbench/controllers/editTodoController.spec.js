import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

import modalTemplate from '../../../src/modules/workbench/templates/dequeueModal.html';

describe("EditTodoController", () => {
  let $controller, todosStore, $uibModal, todosRequests, dequeueModalLauncher, todoSelection;
  let vm, scope;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _$rootScope_, _$uibModal_, _todosRequests_, _dequeueModalLauncher_, _todoSelection_) => {
    $controller = _$controller_;
    $uibModal = _$uibModal_;
    todosRequests = _todosRequests_;
    dequeueModalLauncher = _dequeueModalLauncher_;
    todoSelection = _todoSelection_
    scope = _$rootScope_.$new();
  }));


  describe("syncing with the selected todo", () => {
    it("gets the selected todo from todo selection upon instantiation", () => {
      let selectedTodo = { id: 1 };
      todoSelection.setSelectedTodo(selectedTodo);
      vm = $controller('editTodoController', { $scope: scope });
      expect(vm.todo).toBe(selectedTodo);
    });
  });
});
