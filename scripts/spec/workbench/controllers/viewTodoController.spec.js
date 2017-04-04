import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("ViewTodoController", () => {
  let $controller, todoSelection;
  let vm;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _todoSelection_) => {
    $controller = _$controller_;
    todoSelection = _todoSelection_;
  }));

  describe("controller state", () => {
    it("exposes the selected todo from the todoSelection service", () => {
      let selectedTodo = { id: 1, description: "MOCK_DESCRIPTION" };
      todoSelection.setSelectedTodo(selectedTodo);

      vm = $controller('viewTodoController');

      expect(vm.todo).toBe(selectedTodo);
    });

    it("exposes a function called 'gotoEditMode'", () => {
      vm = $controller('viewTodoController');
      expect(vm.gotoEditMode).toEqual(jasmine.any(Function));
    });

    describe("gotoEditMode", () => {
      it("transitions to edit mode by delegating to 'todoSelection.switchToEditMode'", () => {
        spyOn(todoSelection, 'switchToEditMode');
        vm = $controller('viewTodoController');

        vm.gotoEditMode();

        expect(todoSelection.switchToEditMode).toHaveBeenCalled();
      });
    });
  });
});
