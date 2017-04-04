import template from '../templates/completionGraph.html';

export default function CompletionGraph(percentageGraphDrawer) {
  return({
    restrict: 'E',
    scope: { entities: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('entities', (entities) => {
        percentageGraphDrawer.drawCompletionGraph(entities);
      });
    }
  });
}
