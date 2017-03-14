export default function LoginController(authRequests) {
  let vm = this;

  vm.username = "";

  vm.submitCredentials = function() {
    authRequests.signIn({ username: vm.username });
  }
}
