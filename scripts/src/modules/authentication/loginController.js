export default function LoginController(authRequests, $ngRedux, $state) {
  let vm = this;

  vm.username = "";

  vm.unsubscribe = $ngRedux.subscribe(_sendUserToTodosPage);

  vm.submitCredentials = function() {
    authRequests.signIn({ username: vm.username });
  }

  function _sendUserToTodosPage() {
    let currentUser = $ngRedux.getState().currentUser;
    if(currentUser) {
      $state.go('todosIndex');
      vm.unsubscribe();
    };
  }
}
