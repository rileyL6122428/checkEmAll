import template from '../templates/completionGraph.html';

export default function CompletionGraph($rootScope, percentageGraphDrawer, todoClassFactory, GRAPH_COLORS, arcFactory) {
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
            radius: 28.3,
            underlyingArc: arcFactory.newUnderlyingArc(),
            arcs: [arcFactory.newCompletionArc(stats)]
          });
        }
      }
    }
  });
}
