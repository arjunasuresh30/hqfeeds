/**
 * @author Arjun Suresh
 */

'use strict';
angular.module('hqFeeds', ['ui.bootstrap','ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/Category?categoryname',
                views: {
                    'topNav' : {
                        templateUrl: '/static/views/partials/topnav.html',
                        controller: "TopNavCtrl as tpnvCtrl"
                    },
                    'socialShare' : {
                        templateUrl: '/static/views/partials/socialshare.html',
                        controller: "SocialShareCtrl as ssCtrl"
                    },
                    'mainContent': {
                        templateUrl: '/static/views/partials/maincontent.html',
                        controller: "MainContentCtrl as mnctctrl"
                    },
                    'footer': {
                        templateUrl: '/static/views/partials/footer.html',
                        controller: "FooterCtrl as ftrctrl"
                    }
                }
            })
            .state('upgrade', {
                url: '/upgrade',
                views: {
                    'topNav' : {
                        templateUrl: '/static/views/partials/topnav.html',
                        controller: "TopNavCtrl as tpnvCtrl"
                    },
                    'mainContent': {
                        templateUrl: '/static/views/partials/upgrade.html',
                        controller: "UpgradeCtrl as upctrl"
                    },
                    'footer': {
                        templateUrl: '/static/views/partials/footer.html',
                        controller: "FooterCtrl as ftrctrl"
                    }
                }
            })
            .state('settings', {
                url: '/settings',
                views: {
                    'topNav' : {
                        templateUrl: '/static/views/partials/topnav.html',
                        controller: "TopNavCtrl as tpnvCtrl"
                    },
                    'mainContent': {
                        templateUrl: '/static/views/partials/settings.html',
                        controller: "SettingsCtrl as stctrl"
                    },
                    'footer': {
                        templateUrl: '/static/views/partials/footer.html',
                        controller: "FooterCtrl as ftrctrl"
                    }
                }
            });
    }])
    .run(['$state', function ($state) {
        $state.transitionTo('home');
    }]);