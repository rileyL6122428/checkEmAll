import template from '../templates/todosListItem.html';

export default function TodosListItem(todoEditor) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      let removeListener = todoEditor.placeListener(() => {
        if(scope.todo === todoEditor.getSelectedTodo())
          scope.selectionStatus = "selected";
        else
          scope.selectionStatus = "";
      });

      scope.$on('$destroy', removeListener);

      scope.toggleSelection = () => {
        if(scope.todo === todoEditor.getSelectedTodo()) {
          todoEditor.clearSelection();
        } else {
          todoEditor.setSelectedTodo(scope.todo);
        }
      };
    }
  });
}
