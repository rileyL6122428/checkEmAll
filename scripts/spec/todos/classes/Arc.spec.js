import { Arc } from '../../../src/modules/todos/classes/Arc.js';

describe("Arc", () => {
  describe("#constructor", () => {
    it("it instantiates with an inset of 0 when unspecified", () => {
      let arc = new Arc({ color: "color", widthPercentage: 6.5, lengthPercentage: 25 });
      expect(arc.insets).toEqual(0);
    });
  });
});
