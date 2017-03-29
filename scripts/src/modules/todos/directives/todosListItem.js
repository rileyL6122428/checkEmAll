import template from '../templates/todosListItem.html';

export default function TodosListItem() {
  return ({
    restrict: 'E',
    scope: { todo: '=', selectedTodo: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('selectedTodo', () => {
        scope.selectionStatus = (scope.todo === scope.selectedTodo) ? "selected" : "" ;
      });
    }
  });
}
