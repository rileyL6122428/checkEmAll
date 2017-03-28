import Arc from './Arc.js';

export default function ArcFactory(GRAPH_COLORS, GRAPH_MEASUREMENTS) {
  return({
    newCompletionArc(stats) {
      return new Arc({
        color: GRAPH_COLORS.COMPLETED_ARC,
        widthPercentage: GRAPH_MEASUREMENTS.COMPLETION_ARC_WIDTH,
        lengthPercentage: stats.getCompletionPercentages().finished,
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

    newTypeArc(params) {
      return new Arc({
        color: getRandomColor(),
        widthPercentage: GRAPH_MEASUREMENTS.TYPE_ARC_WIDTH,
        lengthPercentage: params.length,
        insets: GRAPH_MEASUREMENTS.TYPE_ARC_INSETS,
        radiusPercentage: GRAPH_MEASUREMENTS.RADIUS
      });
    }
  });

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
