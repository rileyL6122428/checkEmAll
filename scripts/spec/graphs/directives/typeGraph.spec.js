import angular from 'angular';
import 'angular-mocks';
import graphsModule from '../../../src/modules/graphs/graphModule.js';
const {inject, module} = angular.mock;

describe("TypeGraph", () => {
  let $rootScope, $compile, typeGraph, scope;
  let percentageGraphDrawer, arcFactory;

  beforeEach(module(graphsModule));
  beforeEach(_iniatilzeDirectiveBuilders);
  beforeEach(_initializeDirectiveDependencies);

  describe("#link", () => {
    xit("places a watch listener on stats that redraws a graph when provided with new stats", () => {
      let stats = _typeStatsMock({ typePercentages: { work: 35, chore: 65 } });
      spyOn(percentageGraphDrawer, 'draw');
      _setupTypeGraph({ graphId: "MOCK_GRAPH_ID", stats: stats});

      $rootScope.$digest();

      expect(percentageGraphDrawer.draw).toHaveBeenCalledWith({
        graphId: "MOCK_GRAPH_ID",
        underlyingArc: arcFactory.newUnderlyingArc(),
        arcs: [
          arcFactory.newTypeArc({ type: "work", length: 35 }),
          arcFactory.newTypeArc({ type: "chore", length: 65 })
        ]
      });
    });
  });

  function _iniatilzeDirectiveBuilders() {
    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  }

  function _initializeDirectiveDependencies() {
    inject((_percentageGraphDrawer_, _arcFactory_) => {
      percentageGraphDrawer = _percentageGraphDrawer_;
      arcFactory = _arcFactory_;
    });
  }

  function _setupTypeGraph(params) {
    $rootScope.graphId = params.graphId;
    $rootScope.stats = params.stats;

    typeGraph = $compile(
      "<type-graph graph-id='{{graphId}}' stats='stats'></type-graph>"
    )($rootScope);

    scope = typeGraph.isolateScope();
  }

  function _typeStatsMock(params) {
    return ({
      getTypePercentages: jasmine.createSpy('TypeStats#getTypePercentages')
                                 .and.returnValue(params.typePercentages)
    });
  }
});
