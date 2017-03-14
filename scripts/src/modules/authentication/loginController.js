export default function LoginController(authRequests, $ngRedux) {
  let vm = this;

  vm.username = "";

  vm.submitCredentials = function() {
    authRequests.signIn({ username: vm.username });
  }
}
