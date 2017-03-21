import angular from 'angular';
import ngRedux from 'ng-redux';
import reduxConfig from './config.js';

const reduxModule = angular.module('reduxModule', [ngRedux])
  .config(reduxConfig);

export default reduxModule.name;
