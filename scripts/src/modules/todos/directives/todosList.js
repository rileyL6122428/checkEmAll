import template from '../templates/todosList.html';

export default function TodosList() {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todos: '=', selectTodo: '&', selectedTodo: '=' },
    template: template,
    // link: (scope) => {
    //   scope.$watch('todos', (newTodos, oldTodos) => {
    //     let testNew = newTodos;
    //     let testOld = oldTodos;
    //     debugger
    //   });
    //
    // }
  });
}
