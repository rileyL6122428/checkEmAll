import angular from 'angular'
import uiRouter from 'angular-ui-router';
import reduxModule from '../../redux/module.js';

const todoModule = angular.module('todoModule', [reduxModule, uiRouter])

export default todoModule.name;
