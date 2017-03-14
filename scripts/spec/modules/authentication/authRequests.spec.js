import angular from 'angular';
import 'angular-mocks';
import { setCurrentUser } from "../../../src/redux/actions/user.action.js";

import authModule from '../../../src/modules/authentication/module.js';

const {inject, module} = angular.mock;

describe("AuthRequests", () => {
  let $httpBackend, $ngRedux, authRequests;

  beforeEach(module(authModule));

  beforeEach(inject((_authRequests_, _$httpBackend_, _$ngRedux_) => {
    authRequests = _authRequests_;
    $httpBackend = _$httpBackend_;
    $ngRedux = _$ngRedux_;
  }));

  describe("#signIn", () => {
    afterEach(() => {
       $httpBackend.verifyNoOutstandingRequest();
       $httpBackend.verifyNoOutstandingExpectation();
    });

    it("dispatches an action to set the current user upon success", () => {
      spyOn($ngRedux, 'dispatch');
      let currentUser = { id: 1, username: "USERNAME" };
      $httpBackend.expectGET('/api/user?username=USERNAME').respond(200, currentUser);

      authRequests.signIn({ username: "USERNAME" });
      $httpBackend.flush();

      expect($ngRedux.dispatch).toHaveBeenCalledWith(setCurrentUser(currentUser));
    });

    it("returns the server response as a rejected promise when a reource is not found", () => {
      let errorResponse = { message: "MOCK_ERROR_MESSAGE" };
      $httpBackend.expectGET('/api/user?username=USERNAME').respond(404, errorResponse);

      let responsePromise = authRequests.signIn({ username: "USERNAME" })
                                        .catch((response) => { return response.data; });
      $httpBackend.flush();

      expect(responsePromise.$$state.value).toEqual(errorResponse);
    });
  });
});
