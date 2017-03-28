import Arc from './Arc.js';

export default function ArcFactory(GRAPH_COLORS) {
  return({
    newCompletionArc(stats) {
      return new Arc({
        color: GRAPH_COLORS.COMPLETED_ARC,
        widthPercentage: 6.5,
        lengthPercentage: stats.getCompletionPercentages().finished
      });
    },

    newUnderlyingArc() {
      return new Arc({
        color: GRAPH_COLORS.UNDERLYING_ARC,
        widthPercentage: 7.5,
        lengthPercentage: 100
      });
    },

    newTypeArc(params) {
      return new Arc({
        color: getRandomColor(),
        widthPercentage: 6.5,
        lengthPercentage: params.length,
        insets: 0.009
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
