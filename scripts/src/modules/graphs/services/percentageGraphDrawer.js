export default function PercentageGraphDrawer(arcFactory, graphFactory) {
  "ngInject";

  return ({
    drawCompletionGraph(entities) {
      if(entities)
        draw({
          graphId: "completion-graph",
          arcs: [arcFactory.newCompletionArc(entities)]
        });
    },

    drawTypeGraph(entities) {
      if(entities)
        draw({
          graphId: "type-graph",
          arcs: arcFactory.newTypeArcs(entities)
        });
    }
  });

  function draw(params) {
    let percentageGraph = graphFactory.newPercentageGraph(params);

    percentageGraph.clear();
    percentageGraph.drawArc(arcFactory.newUnderlyingArc());
    params.arcs.forEach((arc) => percentageGraph.drawArc(arc));
  }
}
