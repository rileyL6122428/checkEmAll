import template from '../templates/todosListItem.html';

export default function TodosListItem(todoSelection) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      scope.selectionStatus = (scope.todo === todoSelection.getSelectedTodo()) ? "selected" : "";

      scope.toggleSelection = () => {
        if(scope.todo === todoSelection.getSelectedTodo()) {
          scope.selectionStatus = "";
          todoSelection.clearSelection();
        } else {
          scope.selectionStatus = "selected";
          todoSelection.setSelectedTodo(scope.todo);
        }
      };
    }
  });
}
