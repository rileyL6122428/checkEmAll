import template from '../templates/todosList.html';

export default function TodosList(nameFilter) {
  "ngInject";

  return({
    restrict: 'E',
    scope: { todos: '=', selectTodo: '&', selectedTodo: '=' },
    template: template,
    link: (scope) => {
      scope.nameFilter = "";
      scope.filteredTodos = scope.todos;

      scope.$watch('todos', setFilteredTodos);
      scope.$watch('nameFilter', setFilteredTodos);

      function setFilteredTodos() {
        if(scope.todos)
          scope.filteredTodos = nameFilter.filterList(scope.nameFilter, scope.todos);
      }
    }
  });
}
