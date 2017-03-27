import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';

const {inject, module} = angular.mock;

describe("PercentageGraphDrawer", () => {

  beforeEach(module(todoModule));

});
