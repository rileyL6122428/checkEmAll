import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

xdescribe("WorkbenchController", () => {
  let $controller, todosStore, todosRequests, todoEditor;
  let vm, scope;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _$rootScope_, _todosStore_, _todosRequests_, _todoEditor_) => {
    $controller = _$controller_;
    scope = _$rootScope_.$new();
    todosStore = _todosStore_;
    todosRequests = _todosRequests_;
    todoEditor = _todoEditor_;
  }));

  beforeEach(() => spyOn(todosRequests, 'getUserTodos'));

  describe("controller state", () => {
    let todo1, todo2, todo3, todos;
    beforeEach(() => {
      todo1 = { id: 1, type: "work",  finished: true,  queued: true };
      todo2 = { id: 2, type: "work",  finished: false, queued: true };
      todo3 = { id: 3, type: "chore", finished: true,  queued: true };
      todos = [todo1, todo2, todo3];
    });

    it("exposes queued todos from the todosStore", () => {
      todosStore.depositTodos(todos);

      vm = $controller('workbenchController', { $scope: scope });

      expect(vm.todos.length).toEqual(todos.length);
      todos.forEach((todo) => expect(vm.todos).toContain(todo));
    });

    it("updates the exposed todos when the todosStore is updated", () => {
      todosStore.depositTodos(todos);
      vm = $controller('workbenchController', { $scope: scope });

      let todo4 = { id: $, type: "chore", finished: false,  queued: true };
      todosStore.depositTodo(todo4);

      expect(vm.todos.length).toEqual(4);
      [todo1, todo2, todo3, todo4].forEach((todo) => expect(vm.todos).toContain(todo));
    });

    it("places a listener for scope destroyed that removes the todosStore subscription", () => {
      let removeStoreSubcription = jasmine.createSpy('removeStoreSubcription');
      spyOn(todosStore, 'placeListener').and.returnValue(removeStoreSubcription);
      spyOn(scope, '$on');

      vm = $controller('workbenchController', { $scope: scope });

      expect(scope.$on).toHaveBeenCalledWith('$destroy', removeStoreSubcription);
    });

    it("makes a call to 'todosRequests.getUserTodos'", () => {
      vm = $controller('workbenchController', { $scope: scope });
      expect(todosRequests.getUserTodos).toHaveBeenCalled();
    });

    it("exposes a method called 'selecteNewTodo'", () => {
      vm = $controller('workbenchController', { $scope: scope });
      expect(vm.selectNewTodo).toEqual(jasmine.any(Function));
    });

    describe("selectNewTodo", () => {
      it("delegates to 'todoEditor.selectNewTodo'", () => {
        spyOn(todoEditor, 'selectNewTodo');
        vm = $controller('workbenchController', { $scope: scope });
        vm.selectNewTodo();
        expect(todoEditor.selectNewTodo).toHaveBeenCalled();
      });
    });
  });
});
