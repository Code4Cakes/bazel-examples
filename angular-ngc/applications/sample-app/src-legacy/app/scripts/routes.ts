import settings from './pages/settings/settings.template';
import user from './pages/user/user.template';

export default function($stateProvider) {
  $stateProvider
    .state({
      name: 'admin',
      url: '/legacy/admin',
      component: 'pagesAdmin',
      data: {
        pageTitle: 'Admin',
        pageId: 'pages-admin',
      },
      resolve: {},
    })
    .state({
      name: 'settings',
      url: '/legacy',
      template: settings,
      controller: 'PagesSettingsController',
      data: {
        pageTitle: 'Settings',
        pageId: 'pages-settings',
      },
      resolve: {},
    })
    .state({
      name: 'user',
      url: '/legacy/user',
      template: user,
      controller: 'PagesUserController as $ctrl',
      data: {
        pageTitle: 'User',
        pageId: 'pages-user',
      },
      resolve: {},
    })
    .state({
      name: 'root',
      url: '/*path',
      template: '',
    });
}
