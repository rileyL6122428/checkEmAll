import template from '../templates/completionGraph.html';
import { Arc, UnderlyingArc } from '../classes/PercentageArc.js';

export default function CompletionGraph(percentageGraphDrawer, GRAPH_COLORS) {
  return({
    restrict: 'E',
    scope: { completionStats: '=', graphId: '@' },
    template: template,
    link: (scope) => {
      scope.$watch('completionStats', drawGraph);

      function drawGraph(stats) {
        if(stats) {
          let percentageFinished = stats.getCompletionPercentages().finished;

          percentageGraphDrawer.draw({
            graphId: scope.graphId,
            underlyingArc: new UnderlyingArc({
              color: GRAPH_COLORS.UNDERLYING_ARC,
              widthPercentage: 7.5
            }),
            arcs: [
              new Arc({
                color: GRAPH_COLORS.COMPLETED_ARC,
                widthPercentage: 6.5,
                lengthPercentage: percentageFinished
              })
            ]
          });
        }
      }
    }
  });
}
