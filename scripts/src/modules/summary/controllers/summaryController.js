import { SummaryGraphFilter } from '../classes/SummaryGraphFilter.js';
import { WeekSelector } from '../classes/WeekSelector.js';

export default function SummaryController(todosStore, todosRequests, summaryFactory) {
  "ngInject";
  let vm = this;

  vm.weekSelector = new WeekSelector();
  vm.summaryFilter = new SummaryGraphFilter();

  let removeListener = todosStore.placeListener(() => {
    let todos = todosStore.withdrawTodos();
    vm.summary = summaryFactory.newAggregateSummary(todos);
  });
  todosRequests.getUserTodos({ queuedOnly: false });
}
