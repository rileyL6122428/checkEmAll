import template from '../templates/todoShow.html';

export default function TodoCard () {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todo: '=' },
    template: template,
  });
}
