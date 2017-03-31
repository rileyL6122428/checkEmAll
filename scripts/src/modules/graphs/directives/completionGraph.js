import template from '../templates/completionGraph.html';

export default function CompletionGraph($rootScope, percentageGraphDrawer, arcFactory) {
  return({
    restrict: 'E',
    scope: { completionStats: '=', graphId: '@' },
    template: template,
    link: (scope) => {
      scope.$watch('completionStats', drawGraph);

      function drawGraph(stats) {
        if(stats) {
          percentageGraphDrawer.draw({
            graphId: scope.graphId,
            underlyingArc: arcFactory.newUnderlyingArc(),
            arcs: [arcFactory.newCompletionArc(stats)]
          });
        }
      }
    }
  });
}
