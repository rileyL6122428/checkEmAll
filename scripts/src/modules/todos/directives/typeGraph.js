import template from '../templates/typeGraph.html';

export default function TypeGraph(percentageGraphDrawer, arcFactory) {
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
            // radius: 28.3,
            underlyingArc: arcFactory.newUnderlyingArc(),
            arcs: mapTypesToArcs(stats)
          });
        }
      }

      function mapTypesToArcs(stats) {
        let arcs = []
        let typePercentages = stats.getTypePercentages();

        for(var type in typePercentages) {
          let arc = arcFactory.newTypeArc({ type: type, length: typePercentages[type] });
          arcs.push(arc);
        }

        return arcs;
      }


    }
  });
}
