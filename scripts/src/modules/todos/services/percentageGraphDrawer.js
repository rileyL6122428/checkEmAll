import PercentageGraph from '../classes/PercentageGraph.js';

export default function PercentageGraphDrawer(todoClassFactory) {

  return ({
    draw(params) {
      let percentageGraph = todoClassFactory.newPercentageGraph(params);

      percentageGraph.clear();
      percentageGraph.drawArc(params.underlyingArc);
      params.arcs.forEach((arc) => percentageGraph.drawArc(arc));
    }
  });
}
