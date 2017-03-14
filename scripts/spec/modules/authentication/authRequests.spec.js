import angular from 'angular';
import 'angular-mocks';
import AuthRequests from "../../../src/modules/authentication/authRequests.js";

import authModule from '../../../src/modules/authentication/module.js';

const {inject, module} = angular.mock;

describe("AuthRequests", () => {
  let $httpBackend, $ngRedux;

  beforeEach(module(authModule));

  beforeEach(inject((_$httpBackend_, _$ngRedux_) => {
    $httpBackend = _$httpBackend_;
    $ngRedux = _$ngRedux_;
  }));

  it("is defined", () => {
    expect(AuthRequests).toBeDefined();
  });
});
