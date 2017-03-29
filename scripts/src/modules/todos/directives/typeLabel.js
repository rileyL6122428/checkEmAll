import template from '../templates/typeLabel.html';

export default function TypeLabel(GRAPH_COLORS) {
  return({
    restrict: 'E',
    scope: { labelId: '@', type: '@' },
    template: template,
    link: function(scope) {

    }
  });
}
