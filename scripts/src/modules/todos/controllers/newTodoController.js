export default function NewTodoController () {
  'ngInject';
  let vm = this;

  vm.todoName = "";
  vm.todoFinished = false;
  vm.todoTypeId = 0;
  vm.description = "";

  vm.submit = () => {
    console.log(vm);
  };
}
