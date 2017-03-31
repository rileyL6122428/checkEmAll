import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("WorkbenchController", () => {
  let workbenchController, $controller, todosRequests, $state, todosStore, editorStateFactory;
  let editorState, scope;

  beforeEach(module(todoModule));

  beforeEach(inject((_$controller_, _todosRequests_, _$state_, _todosStore_, _editorStateFactory_, _$rootScope_) => {
    $controller = _$controller_;
    todosRequests = _todosRequests_;
    $state = _$state_;
    todosStore = _todosStore_;
    editorStateFactory = _editorStateFactory_;
    scope = _$rootScope_.$new();
  }));

  beforeEach(() => spyOn(todosRequests, 'getUserTodos'));

  beforeEach(() => {
    editorState = {
      gotoEmptyEditor: jasmine.createSpy('gotoEmptyEditor'),
      gotoSelectedTodo: jasmine.createSpy('gotoSelectedTodo'),
      setKeyboardShortcuts: jasmine.createSpy('setKeyboardShortcuts'),
      removeKeyboardShortcuts: jasmine.createSpy('removeKeyboardShortcuts')
    };
    spyOn(editorStateFactory, 'newEditorState').and.returnValue(editorState);
  });

  xit("it should have its remaining sections tested");

  describe("#exposeTodos", () => {
    xit("places a listener in the todosStore that withdraws and exposes todos");
    xit("makes a request for the users todos");
    xit("saves a 'remove store' subscription");
  });

  describe("#setSelectedTodo", () => {
    let todo = { id: 1, name: "NAME" };

    it("sets selectedTodo to the supplied todo and calls gotoSelectedTodo on editorState", () => {
      workbenchController = $controller('workbenchController', { $scope: scope });
      workbenchController.setSelectedTodo(todo);
      expect(workbenchController.selectedTodo).toBe(todo);
      expect(editorState.gotoSelectedTodo).toHaveBeenCalledWith(todo);
    });

    it("sets selectedTodo to null and calls gotoEmptyEditor when the supplied todo is the currently selected todo", () => {
      workbenchController = $controller('workbenchController', { $scope: scope });

      workbenchController.setSelectedTodo(todo);
      workbenchController.setSelectedTodo(todo);

      expect(workbenchController.selectedTodo).toBe(null);
      expect(editorState.gotoEmptyEditor).toHaveBeenCalled();
    });
  });
});
