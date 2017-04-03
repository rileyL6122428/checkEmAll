import angular from 'angular';
import 'angular-mocks';
import todoModule from '../../../src/modules/todos/todoModule.js';
const {inject, module} = angular.mock;

describe("DequeueController", () => {
  let dequeueController, $controller;
  let $uibModalInstance;

  beforeEach(module(todoModule));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(() => {
    $uibModalInstance = {
      close: jasmine.createSpy('close'),
      dismiss: jasmine.createSpy('dismiss')
    };
  });

  describe("#confirmDequeue", () => {
    it("closes the modal by calling '$uibModalInstance.close'", () => {
      dequeueController = $controller('dequeueController', { $uibModalInstance });
      dequeueController.confirmDequeue();
      expect($uibModalInstance.close).toHaveBeenCalled();
    });
  });

  describe("#cancel", () => {
    it("dismisses the modal by calling '$uibModalInstance.dismiss'", () => {
      dequeueController = $controller('dequeueController', { $uibModalInstance });
      dequeueController.cancel();
      expect($uibModalInstance.dismiss).toHaveBeenCalled();
    });
  });
});
