import { SummaryGraphFilter } from '../classes/SummaryGraphFilter.js';
import { WeekSelector } from '../classes/WeekSelector.js';

export default function SummaryController(todosRequests) {
  "ngInject";
  let vm = this;

  vm.weekSelector = new WeekSelector();
  vm.summaryFilter = new SummaryGraphFilter();

  todosRequests.getUserTodos({ queuedOnly: false });
}
