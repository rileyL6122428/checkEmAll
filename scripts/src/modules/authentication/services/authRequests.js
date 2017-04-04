import { setCurrentUser } from "../../redux/actions/user.action.js";

export default function AuthRequests($http, $q, $ngRedux) {
  'ngInject';

  function signIn(credentials) {
    return $http({
      url: '/api/user',
      method: 'GET',
      params: credentials
    }).then(
      function success(response) {
        $ngRedux.dispatch(setCurrentUser(response.data));
      },
      function failure(response) {
        return $q.reject(response)
      }
    );
  }

  return { signIn };
}
