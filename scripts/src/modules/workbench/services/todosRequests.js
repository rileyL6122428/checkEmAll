export default function TodosRequests($http, todosStore, $ngRedux) {
  'ngInject';

  return ({
    getUserTodos(params) {
      return $http({
        url:"/api/todos",
        method: 'GET',
        params: {
          userId: $ngRedux.getState().currentUser.id,
          queuedOnly: params.queuedOnly
        },
      }).then(
        function success(response) {
          todosStore.depositTodos(response.data);
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO GET TODOS");
          console.log(response);
        }
      );
    },

    createTodo(newTodo) {
      return $http({
        url: "/api/todo",
        method: "POST",
        data: {
          name: newTodo.name,
          description: newTodo.description,
          finished: newTodo.finished,
          type: newTodo.type,
          userId: $ngRedux.getState().currentUser.id,
        }
      }).then(
        function success(response) {
          todosStore.depositTodo(response.data);
          return response.data;
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO SAVE TODO.");
          console.log(response);
        }
      )
    },

    updateTodo(updatedTodo) {
      return $http({
        url: "/api/todo",
        method: "PUT",
        data: updatedTodo
      }).then(
        function success(response) {
          todosStore.depositTodo(response.data);
          return response.data;
        },
        function failure(response) {
          console.log("AN ERROR OCCURRED WHILE ATTEMPTING TO UPDTATE TODO.");
          console.log(response);
        }
      )
    }
  })
}
