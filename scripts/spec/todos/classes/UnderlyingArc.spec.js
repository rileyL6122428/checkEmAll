import { UnderlyingArc } from '../../../src/modules/todos/classes/PercentageArc.js';

describe("UnderlyingArc", () => {
  describe("#constructor", () => {
    it("it instantiates with an inset of 0 and length percentage of 100", () => {
      let underlyingArc = new UnderlyingArc({ color: "color", widthPercentage: 6.5 });
      expect(underlyingArc.insets).toEqual(0);
      expect(underlyingArc.lengthPercentage).toEqual(100);
    });
  });
});
