import PercentageGraph from '../../../src/modules/graphs/classes/PercentageGraph.js';

describe("PercentageGraph", () => {
  let percentageGraph, canvas, context;

  beforeEach(() => context = {});

  beforeEach(() => {
    canvas = {
      height: 100,
      width: 100,
      getContext: jasmine.createSpy('canvas#getContext').and.returnValue(context)
    };
  })

  beforeEach(() => spyOn(document, 'getElementById').and.returnValue(canvas));

  beforeEach(() => {
    percentageGraph = new PercentageGraph({ graphId: "MOCK_CANVAS_ID" });
    expect(document.getElementById).toHaveBeenCalledWith("MOCK_CANVAS_ID");
    expect(canvas.getContext).toHaveBeenCalledWith("2d");
  });

  describe("#clear", () => {
    it("clears the entire canvas", () => {
      context.clearRect = jasmine.createSpy('context#clearRect');
      percentageGraph.clear();
      expect(context.clearRect).toHaveBeenCalledWith(0, 0, canvas.height, canvas.width);
    });
  });

  describe("#drawArc", () => {
    beforeEach(() => {
      context.beginPath = jasmine.createSpy('context#beginPath');
      context.arc = jasmine.createSpy('context#arc');
      context.stroke = jasmine.createSpy('context#stroke');;
    });

    it("draws the appropriate arc", () => {
      let arc = { insets: 0, lengthPercentage: 50, radiusPercentage: 30 };

      percentageGraph.drawArc(arc);

      let expectedCenterX = canvas.width / 2;
      let expectedCenterY = canvas.height / 2;
      let expectedRadius = (30 / 100) * canvas.height;
      let expectedAngleStart = -0.5 * Math.PI;
      let expectedAngleEnd = (2 * Math.PI * arc.lengthPercentage / 100) + expectedAngleStart;
      expect(context.arc).toHaveBeenCalledWith(expectedCenterX, expectedCenterY, expectedRadius, expectedAngleStart, expectedAngleEnd);
    });

    it("draws the next arc where the previous arc left off", () => {
      let arc1 = { insets: 0, lengthPercentage: 45, radiusPercentage: 30 };
      let arc2 = { insets: 0, lengthPercentage: 55, radiusPercentage: 30 };

      percentageGraph.drawArc(arc1);
      percentageGraph.drawArc(arc2);

      let expectedCenterX = canvas.width / 2;
      let expectedCenterY = canvas.height / 2;
      let expectedRadius = (30 / 100) * canvas.height;
      let minAngle = -0.5 * Math.PI;
      let expectedAngleStart = (2 * Math.PI * arc1.lengthPercentage / 100) + minAngle;
      let expectedAngleEnd = (2 * Math.PI * arc2.lengthPercentage / 100) + expectedAngleStart;
      expect(context.arc).toHaveBeenCalledWith(expectedCenterX, expectedCenterY, expectedRadius, expectedAngleStart, expectedAngleEnd);
    });
  });
});
