import template from '../templates/todoTypeTag.html';

export default function TodoTypeTag(GRAPH_COLORS) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('todo', (newTodo) => {
        scope.todoType = newTodo.type ? newTodo.type : 'unassigned';
        scope.backgroundColor = GRAPH_COLORS.BY_TYPE[newTodo.type.toUpperCase()];
      });
    }
  });
}
