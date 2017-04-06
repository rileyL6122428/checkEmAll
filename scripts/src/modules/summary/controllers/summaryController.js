import { SummaryGraphFilter } from '../classes/SummaryGraphFilter.js';
import { WeekSelector } from '../classes/WeekSelector.js';

export default function SummaryController() {
  "ngInject";
  let vm = this;

  vm.weekSelector = new WeekSelector();
  vm.summaryFilter = new SummaryGraphFilter();
}
