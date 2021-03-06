import angular from 'angular';
import 'angular-mocks';
import graphsModule from '../../../src/modules/graphs/graphModule.js';

const {inject, module} = angular.mock;

describe("PercentageGraphDrawer", () => {
  let percentageGraphDrawer, graphFactory;

  beforeEach(module(graphsModule));

  beforeEach(inject((_percentageGraphDrawer_, _graphFactory_) => {
    percentageGraphDrawer = _percentageGraphDrawer_;
    graphFactory = _graphFactory_;
  }));

  describe("#draw", () => {
    let percentageGraph, underlyingArc, arcs;

    beforeEach(() => {
      percentageGraph = {
        clear: jasmine.createSpy('percentageGraph#clear'),
        drawArc: jasmine.createSpy('percentageGraph#drawArc')
      };

      spyOn(graphFactory, 'newPercentageGraph').and.returnValue(percentageGraph);
    });

    beforeEach(() => {
      underlyingArc = { description: "MOCK_UNDERLYING_ARC" };
      arcs = [{ description: "MOCK_ARC_1" }, { description: "MOCK_ARC_2" }];
    });

    xit("clears the graph before drawing anything new", () => {
      _setCallOrderExpectation(percentageGraph.clear, percentageGraph.drawArc);
      percentageGraphDrawer.draw({underlyingArc, arcs});
      expect(percentageGraph.clear).toHaveBeenCalled();
    });

    xit("draws the underlying arc before drawing the supplied arcs", () => {
      _setCallWithArgOrderExpectation(percentageGraph.drawArc, underlyingArc, arcs);
      percentageGraphDrawer.draw({underlyingArc, arcs});
      expect(percentageGraph.drawArc).toHaveBeenCalledWith(underlyingArc);
    });

    xit("draws the supplied arcs list", () => {
      percentageGraphDrawer.draw({underlyingArc, arcs});
      arcs.forEach((arc) => {
        expect(percentageGraph.drawArc).toHaveBeenCalledWith(arc);
      });
    });
  });

  function _setCallOrderExpectation(earlyMock, lateMock) {
    earlyMock.and.callFake(() => {
      expect(lateMock.calls.count()).toBe(0);
    });
  }

  function _setCallWithArgOrderExpectation(mock, firstArg, laterArgs) {
    mock.and.callFake(() => {
      if(mock.calls.count() === 1)
        laterArgs.forEach((arg) => expect(mock).not.toHaveBeenCalledWith(arg));
    });
  }
});
