import template from '../templates/todosListItem.html';

export default function TodosListItem(todoSelection) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      let removeListener = todoSelection.placeListener(() => {
        if(scope.todo === todoSelection.getSelectedTodo())
          scope.selectionStatus = "selected";
        else
          scope.selectionStatus = "";
      });

      scope.$on('$destroy', removeListener);

      scope.toggleSelection = () => {
        if(scope.todo === todoSelection.getSelectedTodo()) {
          todoSelection.clearSelection();
        } else {
          todoSelection.setSelectedTodo(scope.todo);
        }
      };
    }
  });
}
