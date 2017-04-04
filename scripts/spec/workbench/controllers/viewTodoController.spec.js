import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("ViewTodoController", () => {
  let $controller, todoEditor;
  let vm;

  beforeEach(module(workbenchModule));

  beforeEach(inject((_$controller_, _todoEditor_) => {
    $controller = _$controller_;
    todoEditor = _todoEditor_;
  }));

  describe("controller state", () => {
    it("exposes the selected todo from the todoEditor service", () => {
      let selectedTodo = { id: 1, description: "MOCK_DESCRIPTION" };
      todoEditor.setSelectedTodo(selectedTodo);

      vm = $controller('viewTodoController');

      expect(vm.todo).toBe(selectedTodo);
    });

    it("exposes a function called 'gotoEditMode'", () => {
      vm = $controller('viewTodoController');
      expect(vm.gotoEditMode).toEqual(jasmine.any(Function));
    });

    describe("gotoEditMode", () => {
      it("transitions to edit mode by delegating to 'todoEditor.switchToEditMode'", () => {
        spyOn(todoEditor, 'switchToEditMode');
        vm = $controller('viewTodoController');

        vm.gotoEditMode();

        expect(todoEditor.switchToEditMode).toHaveBeenCalled();
      });
    });
  });
});
