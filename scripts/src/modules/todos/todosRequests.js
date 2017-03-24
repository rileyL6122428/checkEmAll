export default function TodosRequests($http, todosStore, $ngRedux) {
  'ngInject';

  return ({
    getUserTodos() {
      $http({
        url:"/api/todos",
        method: 'GET',
        params: { userId: $ngRedux.getState().currentUser.id },
      }).then(
        function success(response) {
          todosStore.depositTodos(response.data);
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO GET TODOS");
        }
      );
    },

    createTodo(newTodo) {
      $http({
        url: "/api/todo",
        method: "POST",
        data: {
          name: newTodo.name,
          description: newTodo.description,
          finished: newTodo.finished,
          userId: $ngRedux.getState().currentUser.id
        }
      }).then(
        function success(response) {
          let testResponse = response;
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO SAVE TODO.");
          console.log(response);
        }
      )
    }
  })
}
