import template from '../templates/todoEditor.html';

export default function TodoEditor(todosRequests) {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link(scope) {

      scope.toggleTodoFinished = toggleTodoFinished;
      scope.unselectTodo = unselectTodo;
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

      function unselectTodo() {
        scope.todo = null;
      }
    }
  });
}
