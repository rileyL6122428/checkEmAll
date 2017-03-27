import PercentageGraph from './PercentageGraph.js';
import { Arc, UnderlyingArc } from './PercentageArg.js';
import TypeStats from './TypeStats.js';
import CompletionStats from './CompletionStats.js';


export default function TodoClassFactory {
  return({
    newPercentageGraph(params) {
      return new PercentageGraph(params);
    },

    newArc(params) {
      return new Arc(params);
    },

    newUnderlyingArc(Params) {
      return new UnderlyingArc(params);
    },

    newTypeStats(params) {
      return new TypeStats(params);
    },

    newCompletionStats(params) {
      return new CompletionStats(params);
    }
  });
}
