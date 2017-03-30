import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("WorkbenchController", () => {
  let workbenchController, $controller, todosRequests, $state, todosStore;

  beforeEach(module(todoModule));

  beforeEach(inject((_$controller_, _todosRequests_, _$state_, _todosStore_) => {
    $controller = _$controller_;
    todosRequests = _todosRequests_;
    $state = _$state_;
    todosStore = _todosStore_;
  }));

  beforeEach(() => spyOn(todosRequests, 'getUserTodos'));

  describe("instantiation", () => {
    xit("places a listener in the todosStore that withdraws todos");

    xit("makes a request for the users todos");
  });

  describe("#setSelectedTodo", () => {
  });
});
