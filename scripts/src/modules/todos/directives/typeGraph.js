import template from '../templates/typeGraph.html';
import { Arc, UnderlyingArc } from '../classes/PercentageArc.js';

export default function TypeGraph(percentageGraphDrawer, GRAPH_COLORS) {
  return({
    restrict: 'E',
    scope: { stats: '=', graphId: '@' },
    template: template,
    link: function(scope) {
      scope.$watch('stats', drawTypePercentages);

      function drawTypePercentages(stats) {
        if(stats) {
          percentageGraphDrawer.draw({
            graphId: scope.graphId,
            underlyingArc: new UnderlyingArc({ color: GRAPH_COLORS.UNDERLYING_ARC, widthPercentage: 7.5 }),
            arcs: mapTypesToArcs(stats)
          });
        }
      }

      function mapTypesToArcs(stats) {
        let arcs = []
        let typePercentages = stats.getTypePercentages();

        for(var type in typePercentages) {
          arcs.push(new Arc({
            color: getRandomColor(),
            widthPercentage: 6.5,
            lengthPercentage: typePercentages[type],
            insets: 0.009
          }));
        }

        return arcs;
      }

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    }
  });
}
