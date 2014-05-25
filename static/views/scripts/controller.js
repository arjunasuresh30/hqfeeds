/**
 * @author Arjun Suresh
 */

'use strict';

angular.module('hqFeeds')
    .controller("TopNavCtrl", [ function () {
        var tpnvCtrl = this;
        console.log("Top Nav Ctrl is initiated ");
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
    }]);