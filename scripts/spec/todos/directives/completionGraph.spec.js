import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("CompletionGraph", () => {
  let $rootScope, $compile, completionGraph, scope;
  let percentageGraphDrawer, todoClassFactory, GRAPH_COLORS;

  beforeEach(module(todoModule));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject((_percentageGraphDrawer_, _todoClassFactory_, _GRAPH_COLORS_) => {
    percentageGraphDrawer = _percentageGraphDrawer_;
    todoClassFactory = _todoClassFactory_;
    GRAPH_COLORS = _GRAPH_COLORS_;
  }));

  describe("#link", () => {

    it("draws a graph based on the provided canvasId and completion statistics", () => {
      spyOn(percentageGraphDrawer, 'draw');
      _setupCompletionGraph({
        graphId: "MOCK_GRAPH_ID",
        completionStats: _completionStatsMock({ finishedPercentage: 50 })
      });

      expect(percentageGraphDrawer.draw).toHaveBeenCalledWith({
        graphId: "MOCK_GRAPH_ID",
        radius: 28.3,
        underlyingArc: todoClassFactory.newUnderlyingArc({
          color: GRAPH_COLORS.UNDERLYING_ARC,
          widthPercentage: 7.5
        }),
        arcs: [
          todoClassFactory.newArc({
            color: GRAPH_COLORS.COMPLETED_ARC,
            widthPercentage: 6.5,
            lengthPercentage: 50
          })
        ]
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
