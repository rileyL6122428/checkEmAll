import angular from 'angular';
import 'angular-mocks';

import authModule from '../../src/modules/authentication/authenticationModule.js';

const {inject, module} = angular.mock;

describe("LoginController", () => {
  let loginController, authRequests, $controller, $ngRedux;

  beforeEach(module(authModule));

  beforeEach(inject((_authRequests_, _$controller_, _$ngRedux_) => {
    authRequests = _authRequests_;
    $ngRedux = _$ngRedux_;
    $controller = _$controller_;

    loginController = $controller('loginController');
  }));

  describe("initial state", () => {
    it("initializes with an empty username", () => {
      expect(loginController.username).toEqual("");
    });
  });

  describe("#submitCredentials", () => {
    it("it calls authRequests#signIn with the vm username", () => {
      spyOn(authRequests, 'signIn');
      loginController.username = "MOCK_USERNAME";

      loginController.submitCredentials();

      expect(authRequests.signIn).toHaveBeenCalledWith({ username: loginController.username });
    });
  });
});
