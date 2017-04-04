import Arc from './Arc.js';

export default function ArcFactory(GRAPH_COLORS, GRAPH_MEASUREMENTS, statsFactory) {
  return({
    newCompletionArc(entities) {
      let completionStats = statsFactory.newCompletionStats(entities);

      return new Arc({
        color: GRAPH_COLORS.COMPLETED_ARC,
        widthPercentage: GRAPH_MEASUREMENTS.COMPLETION_ARC_WIDTH,
        lengthPercentage: completionStats.getCompletionPercentages().finished,
        radiusPercentage: GRAPH_MEASUREMENTS.RADIUS
      });
    },

    newUnderlyingArc() {
      return new Arc({
        color: GRAPH_COLORS.UNDERLYING_ARC,
        widthPercentage: GRAPH_MEASUREMENTS.UNDERLYING_ARC_WIDTH,
        lengthPercentage: 100,
        radiusPercentage: GRAPH_MEASUREMENTS.RADIUS
      });
    },

    newTypeArcs(entities) {
      let arcs = []
      let typePercentages = statsFactory.newTypeStats(entities).getTypePercentages();

      for(var type in typePercentages) {
        let arc = _newTypeArc({ type: type, length: typePercentages[type] });
        arcs.push(arc);
      }

      return arcs;
    },
  });

  function _newTypeArc(params) {
    return new Arc({
      color: GRAPH_COLORS.BY_TYPE[params.type.toUpperCase()],
      widthPercentage: GRAPH_MEASUREMENTS.TYPE_ARC_WIDTH,
      lengthPercentage: params.length,
      insets: GRAPH_MEASUREMENTS.TYPE_ARC_INSETS,
      radiusPercentage: GRAPH_MEASUREMENTS.RADIUS
    });
  }
}
