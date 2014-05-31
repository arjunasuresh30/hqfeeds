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
    .directive('toggleSubNavBar', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    jQuery(this).parent().children('ul.tree').toggle(300);
                });
            }
        };
    }]);