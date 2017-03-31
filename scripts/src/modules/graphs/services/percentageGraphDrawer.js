export default function PercentageGraphDrawer(graphFactory) {

  return ({
    draw(params) {
      let percentageGraph = graphFactory.newPercentageGraph(params);

      percentageGraph.clear();
      percentageGraph.drawArc(params.underlyingArc);
      params.arcs.forEach((arc) => percentageGraph.drawArc(arc));
    }
  });
}
