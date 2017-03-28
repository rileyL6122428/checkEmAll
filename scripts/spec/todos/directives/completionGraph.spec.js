import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("CompletionGraph", () => {
  let $rootScope, $compile, completionGraph, scope;
  let percentageGraphDrawer, arcFactory;

  beforeEach(module(todoModule));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject((_percentageGraphDrawer_, _arcFactory_) => {
    percentageGraphDrawer = _percentageGraphDrawer_;
    arcFactory = _arcFactory_;
  }));

  describe("#link", () => {
    it("draws a graph based on the provided canvasId and completion statistics", () => {
      let stats = _completionStatsMock({ finishedPercentage: 50 });
      spyOn(percentageGraphDrawer, 'draw');
      _setupCompletionGraph({ graphId: "MOCK_GRAPH_ID", completionStats: stats});

      expect(percentageGraphDrawer.draw).toHaveBeenCalledWith({
        graphId: "MOCK_GRAPH_ID",
        radius: 28.3,
        underlyingArc: arcFactory.newUnderlyingArc(),
        arcs: [arcFactory.newCompletionArc(stats)]
      })
    });
  });

  function _setupCompletionGraph(params) {
    $rootScope.graphId = params.graphId;
    $rootScope.completionStats = params.completionStats;
    debugger
    completionGraph = $compile(
      "<completion-graph graph-id='MOCK_GRAPH_ID' completion-stats='completionStats'></completion-graph>"
    )($rootScope);

    scope = completionGraph.isolateScope();
    $rootScope.$digest();
  }

  function _completionStatsMock(params) {
    return ({
      getCompletionPercentages: jasmine.createSpy('completionStats#getCompletionPercentages')
                                .and.returnValue({ finished: params.finishedPercentage})
    });
  }
});
