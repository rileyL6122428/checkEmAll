export default function SummaryController(weekSelectorFactory) {
  "ngInject";
  let vm = this;

  vm.weekSelector = weekSelectorFactory.newWeekSelector();
}
