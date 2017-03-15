export default function authHooks($rootScope, $ngRedux, $state) {
  $rootScope.$on("$stateChangeStart", rerouteIfUnauthorized);

  function rerouteIfUnauthorized(stateChangeEvent, nextState) {
    if(nextState.requireLogin && !_userLoggedIn()) {
      stateChangeEvent.preventDefault();
      $state.go('login');
    }
  }

  function _userLoggedIn() {
    return !!$ngRedux.getState().currentUser;
  }
}
