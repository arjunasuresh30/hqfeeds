/**
 * @author Arjun Suresh
 */

'use strict';
angular.module('hqFeeds', ['ui.bootstrap','ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
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
                }
            }
        });
    }])
    .run(['$state', function ($state) {
        $state.transitionTo('home');
    }]);