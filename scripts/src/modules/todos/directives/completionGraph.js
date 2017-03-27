import template from '../templates/completionGraph.html';

export default function CompletionGraph() {
  return({
    restrict: 'E',
    scope: { completionStats: '=', graphId: '@' },
    template: template,
    link: (scope) => {
      scope.$watch('completionStats', drawGraph);

      function drawGraph(stats) {
        debugger
        if(stats) {
          var canvas = document.getElementById(scope.graphId);
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          let completionPercentages = stats.getCompletionPercentages();
          var angle = (2 * Math.PI * completionPercentages.finished / 100) - 0.5 * Math.PI;
          var centerX = 100;
          var centerY = 100;

          ctx.scale(3, 3);

          ctx.strokeStyle = "#F5F5F5";
          ctx.lineWidth = 15;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 57, -0.5 * Math.PI, 1.5 * Math.PI, false);
          ctx.stroke();

          ctx.strokeStyle = '#00FF64';
          ctx.lineWidth = 13;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 57, -0.5 * Math.PI, angle, false);
          ctx.stroke();

          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    }
  });
}
