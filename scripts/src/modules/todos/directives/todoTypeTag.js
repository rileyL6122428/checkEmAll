import template from '../templates/todoTypeTag.html';

export default function TodoTypeTag() {
  return ({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
    link: (scope) => {
      scope.todoType = scope.todo.type ? scope.todo.type : 'unassigned';
    }
  });
}