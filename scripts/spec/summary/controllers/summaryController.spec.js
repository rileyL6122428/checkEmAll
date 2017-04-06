import angular from 'angular';
import 'angular-mocks';
import summaryModule from '../../../src/modules/summary/summaryModule.js';
const {inject, module} = angular.mock;

import { WeekSelector } from '../../../src/modules/summary/classes/WeekSelector.js';

xdescribe("SummaryController", () => {
  let $controller;
  let vm, $scope;

  beforeEach(module(summaryModule));

  beforeEach(inject((_$controller_, _$rootScope_) => {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  it("exposes a weekSelector to the view", () => {
    vm = $controller('summaryController');
    expect(vm.weekSelector).toEqual(jasmine.any(WeekSelector));
  });
});
