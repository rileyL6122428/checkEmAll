import PercentageGraph from '../../../src/modules/todos/classes/PercentageGraph.js';

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
  })
});
