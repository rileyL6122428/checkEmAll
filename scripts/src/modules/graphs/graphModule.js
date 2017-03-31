import angular from 'angular';

import PercentageGraphDrawer from './services/percentageGraphDrawer.js';

import StatsFactory from './classes/StatsFactory.js';
import GraphFactory from './classes/GraphFactory.js';
import ArcFactory from './classes/ArcFactory.js';

import TypeLabels from './directives/typeLabels.js';
import CompletionGraph from './directives/completionGraph.js';
import TypeGraph from './directives/typeGraph.js';

import { GRAPH_COLORS } from './constants/graphColors.js';
import { GRAPH_MEASUREMENTS } from './constants/graphMeasurements.js';

const graphModule = angular.module('graphModule', [])

  .factory('percentageGraphDrawer', PercentageGraphDrawer)

  .factory('graphFactory', GraphFactory)
  .factory('arcFactory', ArcFactory)
  .factory('statsFactory', StatsFactory)

  .directive('completionGraph', CompletionGraph)
  .directive('typeGraph', TypeGraph)
  .directive('typeLabels', TypeLabels)

  .constant('GRAPH_COLORS', GRAPH_COLORS)
  .constant('GRAPH_MEASUREMENTS', GRAPH_MEASUREMENTS);

export default graphModule.name;
