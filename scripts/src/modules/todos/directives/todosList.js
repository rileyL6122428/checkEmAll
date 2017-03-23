import template from '../templates/todosList.html';

export default function TodosList() {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todos: '=', selectTodo: '&' },
    template: template,
  });
}
