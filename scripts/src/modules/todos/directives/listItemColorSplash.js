import template from '../templates/listItemcolorSplash.html';

export default function ListItemColorSplash(GRAPH_COLORS) {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('todo', setBackgroundColor);

      function setBackgroundColor() {
        if(scope.todo)
          scope.backgroundColor = GRAPH_COLORS.BY_TYPE[scope.todo.type.toUpperCase()];
      }
    }
  });
}
