export default function DequeueController($uibModalInstance) {
  'ngInject';
  let vm = this;

  vm.confirmDequeue = () => {
    $uibModalInstance.close();
  };

  vm.cancel = () => {
    $uibModalInstance.dismiss();
  };
}
