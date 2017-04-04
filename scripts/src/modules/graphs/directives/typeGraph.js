import template from '../templates/typeGraph.html';

export default function TypeGraph(percentageGraphDrawer, arcFactory, statsFactory) {
  "ngInject";

  return({
    restrict: 'E',
    scope: { entities: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('entities', (entities) => {
        percentageGraphDrawer.drawTypeGraph(entities);
      });
    }
  });
}
