import template from '../templates/todoShow.html';

export default function TodoCard(todosRequests) {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link(scope) {
      debugger
      scope.toggleTodoFinished = toggleTodoFinished;
      scope.$watch('todo', setToggleButtonText);

      function setToggleButtonText() {
        if(scope.todo)
          scope.toggleButtonText = scope.todo.finished ? "Mark Unfinished" : "Mark Finished";
      }

      function toggleTodoFinished() {
        scope.todo.finished = !scope.todo.finished;
        setToggleButtonText();
        todosRequests.updateTodo(scope.todo);
      }
    }
  });
}
