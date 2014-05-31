/**
 * @author Arjun Suresh
 */

'use strict';
angular.module('hqFeeds')
    .directive('toggleNavBar', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    jQuery('.scrollable-menu').toggle(200);
                });
            }
        };
    }])
    .directive('toggleSubNavBar', ['$state', 'FeedsService',function ($state,FeedsService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    var elementObject = jQuery(event.target);
                    if(elementObject.hasClass('changecategoryroute')) {
                        $state.go('home',{categoryname:event.target.innerHTML},{reload:true});
                        return true;
                    }
                    else if (elementObject.hasClass('markunread')) {
                        FeedsService.markRead(elementObject.attr('hq-menu'));
                        elementObject.toggle(200);
                        return true;
                    }
                    jQuery(this).parent().children('ul.tree').toggle(300);
                });
            }
        };
    }])
    .directive('markRead',['$state', 'FeedsService',function ($state,FeedsService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    var elementObject = jQuery(this);
                    FeedsService.markRead(elementObject.attr('hq-menu'));
                    elementObject.toggle(200);
                });
            }
        };
    }]);