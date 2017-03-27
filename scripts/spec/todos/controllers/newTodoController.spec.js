import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("NewTodoController", () => {
  let newTodoController, todosRequests, $controller, $state;

  beforeEach(module(todoModule));

  beforeEach(inject((_todosRequests_, _$controller_, _$state_) => {
    todosRequests = _todosRequests_;
    $controller = _$controller_;
    $state = _$state_;
  }));

  describe("instantiation", () => {
    it("instantiates and exposes the appropriate fields", () => {
      newTodoController = $controller('newTodoController');

      expect(newTodoController.todoName).toBeDefined();
      expect(newTodoController.todoFinished).toBeDefined();
      expect(newTodoController.todoType).toBeDefined();
      expect(newTodoController.todoDescription).toBeDefined();
    });
  });

  describe("#submit", () => {
    let promiseMock;

    beforeEach(() => {
      promiseMock = { then: (success) => { success(); } };
      spyOn(todosRequests, 'createTodo').and.returnValue(promiseMock);
      spyOn($state, 'go');
    });

    it("makes a request to create a todo with the controllers fields", () => {
      newTodoController = $controller('newTodoController');
      newTodoController.submit();

      expect(todosRequests.createTodo).toHaveBeenCalledWith({
        name: newTodoController.todoName,
        description: newTodoController.todoDescription,
        finished: newTodoController.todoFinished,
        type: newTodoController.todoType
      });
    });

    it("goes to the todos index upon a successful request", () => {
      newTodoController = $controller('newTodoController');
      newTodoController.submit();

      expect($state.go).toHaveBeenCalledWith('todosIndex');
    });
  })
});
