import summaryTemplate from './templates/weeklySummary.html';

export default function summaryRoutesConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('summary', {
        url: '/weekly-summary',
        template: summaryTemplate,
        requireLogin: true
    });
}
