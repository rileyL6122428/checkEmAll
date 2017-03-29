import template from '../templates/typeLabel.html';

export default function TypeLabels(GRAPH_COLORS) {
  return({
    restrict: 'E',
    template: template,
    link: function(scope) {

      scope.todoLabels = Object.keys(GRAPH_COLORS.BY_TYPE).map((type) => {
        return ({
          type: type === "" ? "unassigned" : type.toLowerCase(),
          color: GRAPH_COLORS.BY_TYPE[type]
        });
      });

    }
  });
}
