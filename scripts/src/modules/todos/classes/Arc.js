class Arc {
  constructor(params) {
    this.color = params.color;
    this.widthPercentage = params.widthPercentage;
    this.lengthPercentage = params.lengthPercentage;
    this.insets = params.insets ? params.insets : 0;
  }
}

class UnderlyingArc extends Arc {
  constructor(params) {
    super(params);
    this.lengthPercentage = 100;
    this.insets = 0;
  }
}

export { Arc, UnderlyingArc };
