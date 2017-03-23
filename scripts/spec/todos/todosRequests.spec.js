import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../src/modules/todos/todoModule.js';

import { addTodos } from '../../src/modules/redux/actions/todo.action.js';

const {inject, module} = angular.mock;

describe("TodoRequests", () => {
  let $httpBackend, $ngRedux, todosRequests;

  beforeEach(module(todoModule));

  beforeEach(inject((_todosRequests_, _$httpBackend_, _$ngRedux_) => {
    todosRequests = _todosRequests_;
    $httpBackend = _$httpBackend_;
    $ngRedux = _$ngRedux_;
  }));

  describe("#getUserTodos", () => {
    beforeEach(() => spyOn($ngRedux, 'dispatch'));

    afterEach(() => {
       $httpBackend.verifyNoOutstandingRequest();
       $httpBackend.verifyNoOutstandingExpectation();
    });

    it("dispatches an action to set the update the todos partition of the redux state upon success", () => {
      let todos = [
        { id: 1, description: "MOCK DESCRIPTION 1"},
        { id: 2, description: "MOCK DESCRIPTION 2"},
      ];
      $httpBackend.expectGET('/api/todos?userId=1').respond(200, todos);
      spyOn($ngRedux, 'getState').and.returnValue({ currentUser: { id: 1 } });

      todosRequests.getUserTodos({ userId: 1 });
      $httpBackend.flush();

      expect($ngRedux.dispatch).toHaveBeenCalledWith(addTodos(todos));
    });
  });
});
