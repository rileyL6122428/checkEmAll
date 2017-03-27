import PercentageGraph from '../classes/PercentageGraph.js';

export default function PercentageGraphDrawer() {

  return ({
    draw(params) {
      let percentageGraph = new PercentageGraph(params);

      percentageGraph.clear();
      percentageGraph.drawArc(params.underlyingArc);
      params.arcs.forEach((arc) => percentageGraph.drawArc(arc));
    }
  });
}
