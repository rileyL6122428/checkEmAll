import template from '../templates/todosList.html';

export default function TodosList(nameFilter) {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todos: '=', selectTodo: '&', selectedTodo: '=' },
    template: template,
    link: (scope) => {
      scope.nameInput = "";
      scope.filteredTodos = scope.todos;

      scope.$watch('todos', setFilteredTodos);
      scope.$watch('nameInput', setFilteredTodos);

      function setFilteredTodos() {
        if(scope.todos)
          scope.filteredTodos = nameFilter.filterList(scope.nameInput, scope.todos);
      }
    }
  });
}
