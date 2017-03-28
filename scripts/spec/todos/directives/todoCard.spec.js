import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("TodoCard", () => {
  let $rootScope, $compile, todoCard, scope;
  let todosRequests;

  beforeEach(module(todoModule));
  beforeEach(_iniatilzeDirectiveBuilders);
  beforeEach(_initializeDirectiveDependencies);

  describe("#link", () => {
    it("sets a $watch listener on 'todo' that updates the 'toggle finished button text'", () => {
      let todo = { id: 1, finished: true, type: "work" };
      _setupTodoCard({ todo });
      $rootScope.$digest();
      expect(scope.toggleButtonText).toEqual("Mark Unfinished");
    });

    describe("#toggleTodoFinished", () => {
      let todo;
      beforeEach(() => {
        todo = { id: 1, finished: true, type: "work" };
        _setupTodoCard({ todo });
        $rootScope.$digest();
      });

      it("modifies the finshed status of the todo", () => {
        scope.toggleTodoFinished();
        expect(scope.todo.finished).toBe(false);
      });

      it("toggles the 'toggle finished button text'", () => {
        scope.toggleTodoFinished();
        expect(scope.toggleButtonText).toEqual("Mark Finished");
      });

      it("makes a call to todosRequest to update the updated todo", () => {
        spyOn(todosRequests, 'updateTodo');
        scope.toggleTodoFinished();
        expect(todosRequests.updateTodo).toHaveBeenCalledWith(todo);
      });
    });
  });

  function _iniatilzeDirectiveBuilders() {
    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  }

  function _initializeDirectiveDependencies() {
    inject((_todosRequests_) => {
      todosRequests = _todosRequests_;
    });
  }

  function _setupTodoCard(params) {
    $rootScope.todo = params.todo;

    todoCard = $compile("<todo-card todo='todo'></todo-card>")($rootScope);

    scope = todoCard.isolateScope();
  }
});
