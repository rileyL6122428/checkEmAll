import template from '../templates/todoTypeTag.html';

export default function TodoTypeTag() {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      scope.$watch('todo', (newTodo) => {
        scope.todoType = newTodo.type ? newTodo.type : 'unassigned';
      });
    }
  });
}
