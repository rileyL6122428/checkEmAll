export default function TodosRequests($http, todosStore) {
  'ngInject';

  return ({
    getTodos(params) {
      $http({
        url:"/api/todos",
        method: 'GET',
        params: params,
      }).then(
        function success(response) {
          todosStore.depositTodos(response.data);
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO GET TODOS");
        }
      );
    }
  })
}
