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
    .controller('MainContentCtrl', [ 'FeedsService', '$state', '$stateParams', function (FeedsService, $state, $stateParams) {
        var mnctctrl = this, _updateData;
        mnctctrl.getConfig = {
            stateObj : $state,
            stateParamsObj : $stateParams
        };
        console.log("MainContentCtrl is initiated ");
        mnctctrl.shareMe = function(idx, eachfdobj, e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log(eachfdobj);
        };
        _updateData = function(config) {
            FeedsService.getFeedsDump((config.stateParamsObj && config.stateParamsObj.categoryname) || 'All')
                .then(function(data) {
                    mnctctrl.feedslist = data.data;
                });
        };
        _updateData(mnctctrl.getConfig);
    }])
    .controller('SocialShareCtrl', [ 'FeedsService', function (FeedsService) {
        var ssCtrl = this;
        console.log("SocialShareCtrl is initiated ");
    }])
    .controller('FooterCtrl', [ 'FeedsService', function (FeedsService) {
        var ftrctrl = this;
        console.log("FooterCtrl is initiated ");
    }])
    .controller('UpgradeCtrl', [ '$window', 'FeedsService', function ($window,FeedsService) {
        console.log("upctrl is initiated ");
        var upctrl = this,
            upgradeWindowFeatures = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes";
        upctrl.upgrade = function() {
            $window.open('/paypal',"HQ Feeds Upgrade",upgradeWindowFeatures);
        };
    }])
    .controller('SettingsCtrl', [ 'FeedsService', function (FeedsService) {
        var stctrl = this;
        console.log("stctrl is initiated ");
    }]);