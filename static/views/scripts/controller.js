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
    .controller("TopNavCtrl", [ '$state', '$stateParams', 'FeedsService', '$modal', function ($state, $stateParams, FeedsService, $modal) {
        console.log("Top Nav Ctrl is initiated ");
        var tpnvCtrl = this, _updateMenu;
        tpnvCtrl.predicate = '-listpriority';
        tpnvCtrl.openKeyboardShortcuts = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '/static/views/partials/keyboardshortcuts.html',
                controller: 'KeyBoardCtrl'
            });
        };
        tpnvCtrl.updateViewType = function () {
            var newview;
            if ($stateParams.view === 'list') {
                newview = 'tiles';
            }
            else {
                newview = 'list';
            }
            $state.transitionTo($state.current, {'cname': $stateParams.cname, 'view': newview}, {
                reload: true, inherit: false, notify: true
            });
        };
        _updateMenu = function () {
            FeedsService.getAllMenuCategores()
                .then(function (data) {
                    tpnvCtrl.allMenuCatrgories = data.data.menu_list;
                    tpnvCtrl.allTopCatrgories = data.data.top_list;
                });
        };
        _updateMenu();
    }])
    .controller("TileModalCtrl", [ '$scope', '$modalInstance', 'eachItemObj', function ($scope, $modalInstance, eachItemObj) {
        console.log("TileModalCtrl is initiated ");
        $scope.item = eachItemObj;
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }])
    .controller('MainContentCtrl', [ 'SplitArrayService', 'FeedsService', '$state', '$stateParams', '$modal',
        function (SplitArrayService, FeedsService, $state, $stateParams, $modal) {
            var mnctctrl = this, _updateData;
            mnctctrl.viewtype = $stateParams.view || 'list';
            mnctctrl.getConfig = {
                stateObj: $state,
                stateParamsObj: $stateParams
            };
            console.log("MainContentCtrl is initiated ");
            mnctctrl.shareMe = function (idx, eachfdobj, e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                console.log(eachfdobj);
            };
            mnctctrl.openModalContent = function (itemObj) {
                var modalInstance = $modal.open({
                    templateUrl: '/static/views/partials/tilemodal.html',
                    controller: 'TileModalCtrl',
                    size: 'lg',
                    resolve: {
                        eachItemObj : function () {
                            return itemObj;
                        }
                    }
                });
            };
            _updateData = function (config) {
                FeedsService.getFeedsDump((config.stateParamsObj && config.stateParamsObj.cname) || 'All', (config.stateParamsObj && config.stateParamsObj.view) || 'list')
                    .then(function (data) {
                        mnctctrl.feedslist = data.data;
                        if (mnctctrl.viewtype === 'tiles') {
                            mnctctrl.rows = SplitArrayService.SplitArray(mnctctrl.feedslist, 1); //im splitting an array of images into 3 columns
                        }
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
    .controller('UpgradeCtrl', [ '$window', 'FeedsService', function ($window, FeedsService) {
        console.log("upctrl is initiated ");
        var upctrl = this,
            upgradeWindowFeatures = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes";
        upctrl.upgrade = function () {
            $window.open('/paypal', "HQ Feeds Upgrade", upgradeWindowFeatures);
        };
    }])
    .controller('SettingsCtrl', [ 'FeedsService', function (FeedsService) {
        var stctrl = this;
        console.log("stctrl is initiated ");
    }]);