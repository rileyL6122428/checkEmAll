import TypeStats from './TypeStats.js';
import CompletionStats from './CompletionStats.js';

export default function StatsFactory() {
  return({
    newTypeStats(todos) {
      return new TypeStats(todos);
    },

    newCompletionStats(todos) {
      return new CompletionStats(todos);
    }
  });
}
