import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("TodosListItem", () => {
  let $rootScope, $compile, todoSelection;
  let todoListItem, scope;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$compile_, _$rootScope_, _todoSelection_) => {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    todoSelection = _todoSelection_;
  }));

  describe("#link", () => {
    it("sets 'scope.selectionStatus' to 'selected' when the directive is iniatialized with the selected todo", () => {
      let todo = { id: 1 };
      todoSelection.setSelectedTodo(todo);
      _setupTodosListItem({ todo });
      expect(scope.selectionStatus).toEqual("selected");
    });

    it("sets 'scope.selectionStatus' to an empty string when the directive is iniatialized with the selected todo", () => {
      let todo1 = { id: 1 };
      let todo2 = { id: 2 };
      todoSelection.setSelectedTodo(todo1);
      _setupTodosListItem({ todo: todo2 });
      expect(scope.selectionStatus).toEqual("");
    });

    it("places a listener on the todoSelection service that updates the directive's selection status", () => {
      let todo1 = { id: 1 };
      let todo2 = { id: 2 };
      todoSelection.setSelectedTodo(todo1);
      _setupTodosListItem({ todo: todo1 });
      expect(scope.selectionStatus).toEqual("selected");

      todoSelection.setSelectedTodo(todo2);
      expect(scope.selectionStatus).toEqual("");
    });

    it("it removes the todoSelection listener upon scope.$destroy()", () => {
      let removeListener = jasmine.createSpy('removeListener');
      spyOn(todoSelection, 'placeListener').and.returnValue(removeListener);

      let todo = { id: 1 };
      _setupTodosListItem({ todo });

      scope.$destroy();
      expect(removeListener).toHaveBeenCalled();
    });

    it("defines a function 'toggleSelection'", () => {
      let todo = { id: 1 };
      _setupTodosListItem({ todo });
      expect(scope.toggleSelection).toEqual(jasmine.any(Function));
    });

    describe("toggleSelection", () => {
      it("delegates to 'todoSelection.clearSelection' when scope.todo is equal to the selectedTodo", () => {
        let todo = { id: 1 };
        todoSelection.setSelectedTodo(todo);
        _setupTodosListItem({ todo });

        spyOn(todoSelection, 'clearSelection');
        scope.toggleSelection();

        expect(todoSelection.clearSelection).toHaveBeenCalled();
      });

      it("delegates to 'todoSelection.setSelectedTodo' when scope.todo is not equal to the selectedTodo", () => {
        todoSelection.setSelectedTodo(null);
        let todo = { id: 1 };
        _setupTodosListItem({ todo });

        spyOn(todoSelection, 'setSelectedTodo');
        scope.toggleSelection();

        expect(todoSelection.setSelectedTodo).toHaveBeenCalledWith(todo);
      });
    });
  });

  function _setupTodosListItem(params) {
    $rootScope.todo = params.todo;
    todoListItem = $compile("<todos-list-item todo='todo'></todos-list-item>")($rootScope);
    scope = todoListItem.isolateScope();
  }
});
