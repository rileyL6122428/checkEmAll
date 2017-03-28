export default class Arc {
  constructor(params) {
    this.color = params.color;
    this.widthPercentage = params.widthPercentage;
    this.lengthPercentage = params.lengthPercentage;
    this.insets = params.insets ? params.insets : 0;
  }
}
