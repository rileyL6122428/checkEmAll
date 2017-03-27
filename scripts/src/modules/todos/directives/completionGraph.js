import template from '../templates/completionGraph.html';
import { Arc, UnderlyingArc } from '../classes/PercentageArc.js';

export default function CompletionGraph(percentageGraphDrawer) {
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
            underlyingColor: "#F5F5F5",
            underlyingWidthPercentage: 7.5,
            underlyingArc: new UnderlyingArc({ color: "#F5F5F5", widthPercentage: 7.5 }),

            arcs: [
              // { color: '#00FF64', percentage: stats.getCompletionPercentages().finished }
              new Arc({
                color: '#00FF64',
                widthPercentage: 6.5,
                lengthPercentage: stats.getCompletionPercentages().finished
              })
            ],
            inset: 0
          });
        }
      }
    }
  });
}
