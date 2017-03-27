const ANGLE_MIN = -0.5 * Math.PI;
const ANGLE_MAX = 1.5 * Math.PI;

export default class PercentageGraph {
  constructor(params) {
    this.canvas = document.getElementById(params.graphId);
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = 0.283 * this.canvas.height;
    this.angleStart = ANGLE_MIN;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawArc(arc) {
    let angleEnd = (2 * Math.PI * arc.lengthPercentage / 100) + this.angleStart;

    this.ctx.strokeStyle = arc.color;
    this.ctx.lineWidth = (arc.widthPercentage / 100) * this.canvas.height;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, this.angleStart + arc.insets, angleEnd - arc.insets);
    this.ctx.stroke();

    this.angleStart = angleEnd;
  }
}
