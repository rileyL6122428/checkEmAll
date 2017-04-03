import template from '../templates/todosListItem.html';

export default function TodosListItem(todoSelection) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {

      let removeListener = todoSelection.placeListener(() => {
        scope.selectionStatus = (scope.todo === todoSelection.getSelectedTodo()) ? "selected" : "";
      });

      scope.toggleSelection = () => {
        if(scope.todo === todoSelection.getSelectedTodo()) {
          todoSelection.clearSelection();
        } else {
          todoSelection.setSelectedTodo(scope.todo);
        }
      };

      scope.$on('$destroy', removeListener);
    }
  });
}
