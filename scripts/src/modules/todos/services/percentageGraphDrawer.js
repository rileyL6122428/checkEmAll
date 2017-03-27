import PercentageGraph from '../classes/PercentageGraph.js';

export default function PercentageGraphDrawer() {

  return ({
    draw(params) {
      let percentageGraph = new PercentageGraph(params);

      percentageGraph.clear();
      percentageGraph.drawArc({
        color: params.underlyingColor,
        widthPercentage: 7.5,
        percentage: 100,
        insets: 0
      });

      params.arcs.forEach((arc) => {
        percentageGraph.drawArc({
          color: arc.color,
          widthPercentage: 6.5,
          percentage: arc.percentage,
          insets: 0
        });
      });
    }
  });


}
