import template from '../templates/listItemcolorSplash.html';

export default function ListItemColorSplash(GRAPH_COLORS) {
  return ({
    restrict: 'E',
    scope: { todoType: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('todoType', setBackgroundColor);

      function setBackgroundColor() {
        if(scope.todoType)
          scope.backgroundColor = GRAPH_COLORS.BY_TYPE[scope.todoType.toUpperCase()];
      }
    }
  });
}
