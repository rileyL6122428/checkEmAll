import { addTodos } from "../redux/actions/todo.action.js";

export default function TodosRequests($http, $ngRedux) {
  'ngInject';

  return ({
    getTodos(params) {
      $http({
        url:"/api/todos",
        method: 'GET',
        params: params,
      }).then(
        function success(response) {
          $ngRedux.dispatch(addTodos(response.data));
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO GET TODOS");
        }
      );
    }
  })
}
