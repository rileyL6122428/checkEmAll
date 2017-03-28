const ANGLE_MIN = -0.5 * Math.PI;
const ANGLE_MAX = 1.5 * Math.PI;

export default class PercentageGraph {

  constructor(params) {
    this.canvas = document.getElementById(params.graphId);
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.angleStart = ANGLE_MIN;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawArc(arc) {
    this.ctx.strokeStyle = arc.color;
    this.ctx.lineWidth = this._arcWidth(arc);
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this._radius(arc), this._arcStart(arc), this._arcEnd(arc));
    this.ctx.stroke();

    this.angleStart = this._angleEnd(arc);
  }

  _arcWidth(arc) {
    return (arc.widthPercentage / 100) * this.canvas.height;
  }

  _radius(arc) {
    return (arc.radiusPercentage / 100) * this.canvas.height;
  }

  _arcStart(arc) {
    return this.angleStart + arc.insets;
  }

  _arcEnd(arc) {
    return this._angleEnd(arc) - arc.insets;
  }

  _angleEnd(arc) {
    return (2 * Math.PI * arc.lengthPercentage / 100) + this.angleStart;
  }
}
