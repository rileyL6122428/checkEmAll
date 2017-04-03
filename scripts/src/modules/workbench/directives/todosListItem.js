import template from '../templates/todosListItem.html';

export default function TodosListItem(todoSelection) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('selectedTodo', setSelectionStatus);

      function setSelectionStatus() {
        scope.selectionStatus = (scope.todo === todoSelection.getSelectedTodo()) ? "selected" : "" ;
      }
    }
  });
}
