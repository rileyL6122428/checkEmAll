import PercentageGraph from './PercentageGraph.js';

export default function GraphFactory() {
  return ({
    newPercentageGraph(params) {
      return new PercentageGraph(params);
    }
  });
}
