import template from '../templates/todosListItem.html';

export default function TodosListItem(todoEditor, EDITOR_MODES) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      let removeListener = todoEditor.placeSelectionListener(() => {
        if(scope.todo === todoEditor.getSelectedTodo())
          scope.selectionStatus = "selected";
        else
          scope.selectionStatus = "";
      });

      scope.$on('$destroy', removeListener);

      scope.toggleSelection = () => {
        if(scope.todo === todoEditor.getSelectedTodo()) {
          todoEditor.switchModes({
            selectedTodo: null,
            mode: EDITOR_MODES.EMPTY
          });
        } else {
          todoEditor.switchModes({
            selectedTodo: scope.todo,
            mode: EDITOR_MODES.VIEW
          });
        }
      };
    }
  });
}
