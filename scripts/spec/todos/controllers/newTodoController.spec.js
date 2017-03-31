import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("NewTodoController", () => {
  let newTodoController, todosRequests, $controller, $state, scope;

  beforeEach(module(todoModule));

  beforeEach(inject((_todosRequests_, _$controller_, _$state_, _$rootScope_) => {
    todosRequests = _todosRequests_;
    $controller = _$controller_;
    $state = _$state_;
    scope = _$rootScope_.$new();
  }));

  describe("instantiation", () => {
    it("instantiates and exposes the appropriate fields", () => {
      newTodoController = $controller('newTodoController', { $scope: scope });

      expect(newTodoController.todo).toBeDefined();
      expect(newTodoController.todo.name).toEqual("");
      expect(newTodoController.todo.type).toEqual("");
      expect(newTodoController.todo.finished).toEqual(false);
      expect(newTodoController.todo.description).toEqual("");
    });
  });

  describe("#submit", () => {
    let todo, setSelectedTodoPromise, createTodoPromise;
    beforeEach(() => {
      todo = { name: "NAME", finished: true, type: "TYPE", description: "DESCRIPTION" };
      newTodoController = $controller('newTodoController', { $scope: scope });
      newTodoController.todo = todo;
    });

    beforeEach(() => {
      setSelectedTodoPromise = { then: jasmine.createSpy('createTodoPromise#then') };
      createTodoPromise = {
        then: jasmine.createSpy('createTodoPromise#then').and.returnValue(setSelectedTodoPromise)
      };
      spyOn(todosRequests, 'createTodo').and.returnValue(createTodoPromise);
    })

    it("makes a request to create a todo", () => {
      newTodoController.submit();
      expect(todosRequests.createTodo).toHaveBeenCalledWith(todo);
    });

    it("sets the selected todo of the work bench to be the created todo upon a successful request", () => {
      let workbenchCtrl = { setSelectedTodo: jasmine.createSpy('workbenchCtrl#setSelectedTodo') };
      scope.$parent = { vm: workbenchCtrl };

      newTodoController.submit();

      expect(createTodoPromise.then).toHaveBeenCalled();

      let suppliedCallback = createTodoPromise.then.calls.first().args[0];
      let returnedTodo = suppliedCallback(todo);

      expect(workbenchCtrl.setSelectedTodo).toHaveBeenCalledWith(todo);
      expect(returnedTodo).toBe(todo);
    });

    it("transitions to the 'workbench.viewTodo' upon a successful request", () => {
      spyOn($state, 'go');

      newTodoController.submit();
      expect(setSelectedTodoPromise.then).toHaveBeenCalled();

      let suppliedCallback = setSelectedTodoPromise.then.calls.first().args[0];
      suppliedCallback(todo);

      expect($state.go).toHaveBeenCalledWith('workbench.viewTodo', { todoId: todo.id });
    });
  });
});
