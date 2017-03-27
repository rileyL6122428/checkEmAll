import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';

const {inject, module} = angular.mock;

describe("PercentageGraphDrawer", () => {
  let percentageGraphDrawer, todoClassFactory;

  beforeEach(module(todoModule));

  beforeEach(inject((_percentageGraphDrawer_, _todoClassFactory_) => {
    percentageGraphDrawer = _percentageGraphDrawer_;
    todoClassFactory = _todoClassFactory_;
  }));

  describe("#draw", () => {
    let percentageGraph, underlyingArc, arcs;

    beforeEach(() => {
      percentageGraph = {
        clear: jasmine.createSpy('percentageGraph#clear'),
        drawArc: jasmine.createSpy('percentageGraph#drawArc')
      };

      spyOn(todoClassFactory, 'newPercentageGraph').and.returnValue(percentageGraph);
    });

    beforeEach(() => {
      underlyingArc = { description: "MOCK_UNDERLYING_ARC" };
      arcs = [{ description: "MOCK_ARC_1" }, { description: "MOCK_ARC_2" }];
    });

    it("clears the graph before drawing anything new", () => {
      percentageGraphDrawer.draw({underlyingArc, arcs});
      expect(percentageGraph.clear).toHaveBeenCalled();
    });

    it("draws the underlying arc", () => {
      percentageGraphDrawer.draw({underlyingArc, arcs});
      expect(percentageGraph.drawArc).toHaveBeenCalledWith(underlyingArc);
    });

    it("draws the supplied arcs list", () => {
      percentageGraphDrawer.draw({underlyingArc, arcs});
      arcs.forEach((arc) => {
        expect(percentageGraph.drawArc).toHaveBeenCalledWith(arc);
      });
    });
  });
});
