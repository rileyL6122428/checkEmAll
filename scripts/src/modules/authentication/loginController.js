export default function LoginController(authRequests, $ngRedux) {
  let vm = this;

  vm.username = "";

  vm.unsubscribe = $ngRedux.subscribe(() => {
    let currentUser = $ngRedux.getState().currentUser;
    if(currentUser) console.log("TRANSITION TO TODO INDEX (REMOVE LISTENER)");
  });

  vm.submitCredentials = function() {
    authRequests.signIn({ username: vm.username });
  }
}
