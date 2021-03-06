import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

xdescribe("NewTodoController", () => {
  let $controller, todosRequests, todoEditor;
  let vm, scope;
  let $q;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _$rootScope_, _todosRequests_, _todoEditor_, _$q_) => {
    $controller = _$controller_;
    todosRequests = _todosRequests_;
    todoEditor = _todoEditor_;
    $q = _$q_;
    scope = _$rootScope_.$new();
  }));

  describe("controller state", () => {
    it("exposes the selected todo from the todoEditor service", () => {
      let selectedTodo = { id: 1, description: "MOCK_NEW_TODO_DESCRIPTION" };
      todoEditor.setSelectedTodo(selectedTodo);

      vm = $controller('newTodoController');

      expect(vm.todo).toBe(selectedTodo);
    });

    it("exposes a function called 'submit'", () => {
      vm = $controller('newTodoController');
      expect(vm.submit).toEqual(jasmine.any(Function));
    });

    describe("submit", () => {
      let deferred;
      beforeEach(() => {
        deferred = $q.defer();
        spyOn(todosRequests, 'createTodo').and.returnValue(deferred.promise);
        vm = $controller('newTodoController', { $scope: scope });
      });

      it("requests the creation of a todo by delegating to 'todosRequests.createTodo'", () => {
        vm.todo = { id: 1, description: "MOCK_NEW_TODO_DESCRIPTION" };
        vm.submit();
        expect(todosRequests.createTodo).toHaveBeenCalledWith(vm.todo);
      });

      it("then delegates to 'todoEditor.switchToViewMode' upon successful creation", () => {
        vm.todo = { id: 1, description: "MOCK_NEW_TODO_DESCRIPTION" };
        spyOn(todoEditor, 'switchToViewMode');

        vm.submit();
        deferred.resolve(vm.todo);
        scope.$apply();

        expect(todoEditor.switchToViewMode).toHaveBeenCalledWith(vm.todo);
      });
    });
  });
});
