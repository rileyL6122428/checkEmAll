export default function TodosRequests($http) {
  'ngInject';

  return ({
    getTodos(params) {
      $http({
        url:"/api/todos",
        method: 'GET',
        params: params,
      }).then(
        function success(response) {
          let testResponse = response;
          debugger
        },
        function failure(response) {
          let testResponse = response;
          debugger
        }
      )
    }
  })
}
