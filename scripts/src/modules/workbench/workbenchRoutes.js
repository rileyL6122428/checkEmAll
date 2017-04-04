import workbenchTemplate from './templates/workbench.html';
import viewTodoTemplate from './templates/viewTodo.html';
import todoFormTemplate from './templates/todoForm.html';

export default function workbenchRoutingConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('workbench', {
        url: '/workbench',
        template: workbenchTemplate,
        controller: 'workbenchController as vm',
        requireLogin: true
    })

    .state('workbench.todoNotSelected', {
        url: '/todo-not-selected',
        requireLogin: true
    })

    .state('workbench.viewTodo', {
        url: '/view-todo',
        controller: 'viewTodoController as vm',
        template: viewTodoTemplate,
        requireLogin: true
    })

    .state('workbench.editTodo', {
        url: '/edit-todo',
        template: todoFormTemplate,
        controller: 'editTodoController as vm',
        requireLogin: true
    })

    .state('workbench.newTodo', {
        url: '/new-todo',
        template: todoFormTemplate,
        controller: 'newTodoController as vm',
        requireLogin: true
    });
}
