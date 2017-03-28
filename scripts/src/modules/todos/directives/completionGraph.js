import template from '../templates/completionGraph.html';

export default function CompletionGraph(percentageGraphDrawer, todoClassFactory, GRAPH_COLORS) {
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
            underlyingArc: todoClassFactory.newUnderlyingArc({
              color: GRAPH_COLORS.UNDERLYING_ARC,
              widthPercentage: 7.5
            }),
            arcs: [
              todoClassFactory.newArc({
                color: GRAPH_COLORS.COMPLETED_ARC,
                widthPercentage: 6.5,
                lengthPercentage: stats.getCompletionPercentages().finished
              })
            ]
          });
        }
      }
    }
  });
}
