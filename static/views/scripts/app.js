/**
 * @author Arjun Suresh
 */

'use strict';
angular.module('hqFeeds', ['ui.bootstrap','ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        var home = {
                name:'home',
                url:'/',
                templateUrl:"/static/views/index.html"
            },
            add_feed = {
                name:'addFeed',
                url: '/feed',
                templateUrl: "/static/angular-stuff/app/views/add_feed.html"
            },
            import_opml = {
                name:'importOpml',
                url: '/opml',
                templateUrl: "/static/angular-stuff/app/views/import_opml.html"
            };
        $stateProvider.state(home);
        $stateProvider.state(addFeed);
        $stateProvider.state(importOpml);
    }])
    .run(['$state', function ($state) {
        $state.transitionTo('home');
    }]);