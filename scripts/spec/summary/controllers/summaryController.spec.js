import angular from 'angular';
import 'angular-mocks';
import summaryModule from '../../../src/modules/summary/summaryModule.js';
const {inject, module} = angular.mock;

import { WeekSelector } from '../../../src/modules/summary/classes/WeekSelector.js';
import { SummaryGraphFilter } from '../../../src/modules/summary/classes/SummaryGraphFilter.js';

describe("SummaryController", () => {
  let $controller, todosRequests, todosStore, summaryFactory;
  let vm, $scope;

  beforeEach(module(summaryModule));

  beforeEach(inject((_$controller_, _$rootScope_, _todosRequests_, _todosStore_, _summaryFactory_) => {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    todosRequests = _todosRequests_;
    todosStore = _todosStore_;
    summaryFactory = _summaryFactory_;
  }));

  beforeEach( () => spyOn(todosRequests, 'getUserTodos') );

  it("exposes a WeekSelector instance to the view", () => {
    vm = $controller('summaryController');
    expect(vm.weekSelector).toEqual(jasmine.any(WeekSelector));
  });

  it("exposes a SummaryGraphFilter instance to the view", () => {
    vm = $controller('summaryController');
    expect(vm.summaryFilter).toEqual(jasmine.any(SummaryGraphFilter));
  });

  it("exposes an aggregateSummary based on the todos present in the todosStore", () => {
    let todos = [{ id: 1 }, { id: 2 }];
    let summary = { description: "MOCK_SUMMARY" };
    spyOn(todosStore, 'withdrawTodos').and.returnValue(todos);
    spyOn(summaryFactory, 'newAggregateSummary').and.returnValue(summary);

    vm = $controller('summaryController');

    expect(summaryFactory.newAggregateSummary).toHaveBeenCalledWith(todos);
    expect(vm.summary).toBe(summary);
  });

  xit("updates the aggregateSummary when the todosStore is updated", () => {

  });

  xit("removes the todosStore listener upon scope being destroyed", () => {
    
  });

  it("makes a call to todosRequests.getUserTodos to get all of the user's todos", () => {
    vm = $controller('summaryController');
    expect(todosRequests.getUserTodos).toHaveBeenCalledWith({ queuedOnly: false });
  });
});
