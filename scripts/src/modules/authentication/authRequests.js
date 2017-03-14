export default function AuthRequests($http, $q) {
  'ngInject';

  function signIn(credentials) {
    return $http({
      url: '/api/user',
      method: 'GET',
      params: credentials
    }).then(
      function success(response) {

      },
      function failure(response) {
        //RETURN FAILED PROMISE
      }
    );
  }

  return { signIn }
}
