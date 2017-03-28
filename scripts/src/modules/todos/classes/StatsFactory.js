import TypeStats from './TypeStats.js';
import CompletionStats from './CompletionStats.js';

export default function StatsFactory() {
  return({
    newTypeStats(params) {
      return new TypeStats(params);
    },

    newCompletionStats(params) {
      return new CompletionStats(params);
    }
  });
}
