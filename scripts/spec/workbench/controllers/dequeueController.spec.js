import angular from 'angular';
import 'angular-mocks';
import workbenchModule from '../../../src/modules/workbench/workbenchModule.js';
const {inject, module} = angular.mock;

describe("DequeueController", () => {
  let dequeueController, $controller;
  let $uibModalInstance;

  beforeEach(module(workbenchModule));

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
