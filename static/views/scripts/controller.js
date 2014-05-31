/**
 * @author Arjun Suresh
 */

'use strict';

angular.module('hqFeeds')
    .controller("KeyBoardCtrl", [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
        console.log("KeyBoardCtrl is initiated ");
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }])
    .controller("TopNavCtrl", [ 'FeedsService', '$modal', function (FeedsService, $modal) {
        console.log("Top Nav Ctrl is initiated ");
        var tpnvCtrl = this, _updateMenu;
        tpnvCtrl.predicate = '-listpriority';
        tpnvCtrl.openKeyboardShortcuts = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '/static/views/partials/keyboardshortcuts.html',
                controller: 'KeyBoardCtrl'
            });
        };
        _updateMenu = function() {
            FeedsService.getAllMenuCategores()
                .then(function(data) {
                    tpnvCtrl.allMenuCatrgories = data.data.menu_list;
                    tpnvCtrl.allTopCatrgories = data.data.top_list;
                });
        };
        _updateMenu();
    }])
    .controller('MainContentCtrl', [ 'FeedsService', function (FeedsService) {
        var mnctctrl = this, _updateData;
        console.log("MainContentCtrl is initiated ");
        mnctctrl.shareMe = function(idx, eachfdobj, e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log(eachfdobj);
        };
//        _updateData = function() {
//            FeedsService.getFeedsDump()
//                .then(function(data) {
//                    debugger;
//
//                    mnctctrl.feedslist = data;
//                });
//        };
//        _updateData();
        mnctctrl.feedslist = [
            {
                title: 'Dynamic Group Header - 1',
                feed: 'Site point',
                recommendation: '3',
                feedupdated: '01:20am',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                feed: 'Site point',
                recommendation: '3',
                feedupdated: '01:20am',
                content: 'Dynamic Group Body - 2'
            }
        ];
    }])
    .controller('SocialShareCtrl', [ 'FeedsService', function (FeedsService) {
        var ssCtrl = this;
        console.log("SocialShareCtrl is initiated ");
    }])
    .controller('FooterCtrl', [ 'FeedsService', function (FeedsService) {
        var ftrctrl = this;
        console.log("FooterCtrl is initiated ");
    }]);