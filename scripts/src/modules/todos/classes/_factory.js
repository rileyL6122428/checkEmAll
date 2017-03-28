import PercentageGraph from './PercentageGraph.js';
import TypeStats from './TypeStats.js';
import CompletionStats from './CompletionStats.js';


export default function TodoClassFactory() {
  return({
    newPercentageGraph(params) {
      return new PercentageGraph(params);
    },

    newTypeStats(params) {
      return new TypeStats(params);
    },

    newCompletionStats(params) {
      return new CompletionStats(params);
    }
  });
}
