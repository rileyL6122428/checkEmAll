import template from '../templates/completionGraph.html';

export default function CompletionGraph() {
  return({
    restrict: 'E',
    scope: { completionStats: '=', graphId: '@' },
    template: template,
    link: (scope) => {
      scope.$watch('completionStats', drawGraph);

      function drawGraph(stats) {

        if(stats) {
          var canvas = document.getElementById(scope.graphId);
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const ANGLE_MIN = -0.5 * Math.PI;
          const ANGLE_MAX = 1.5 * Math.PI;
          let radius = 0.283 * canvas.height;

          let completionPercentages = stats.getCompletionPercentages();
          var angle = (2 * Math.PI * completionPercentages.finished / 100) + ANGLE_MIN;
          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;

          ctx.strokeStyle = "#F5F5F5";
          ctx.lineWidth = 0.075 * canvas.height;

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, ANGLE_MIN, ANGLE_MAX);
          ctx.stroke();

          ctx.strokeStyle = '#00FF64';
          ctx.lineWidth = 0.065 * canvas.height;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, ANGLE_MIN, angle);
          ctx.stroke();

        }
      }
    }
  });
}
