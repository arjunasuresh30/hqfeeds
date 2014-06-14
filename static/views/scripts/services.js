/**
 * @author Arjun Suresh
 */

'use strict';

angular.module('hqFeeds')
    .factory('FeedsService', ['$http', function ($http) {
        var feeds_info, currently_reading_uri, currently_reading_label, currently_reading_feed_label, feed_labels;
        feeds_info = {};
        currently_reading_uri = "";
        currently_reading_label = "";
        currently_reading_feed_label = "";
        feed_labels = "";

        return {
            getAllMenuCategores: function () {
                return $http.get('get_all_menu_categories');
            },
            markRead: function (category) {
                $http.post('mark_read', category);
            },
            set_feed_uri: function (uri, label, feed_label) {
                currently_reading_uri = uri;
                currently_reading_label = label;
                currently_reading_feed_label = feed_label;
            },
            get_currently_reading_label: function () {
                return currently_reading_label;
            },
            get_currently_reading_feed_label: function () {
                return currently_reading_feed_label;
            },
            add_feed_with_tags: function (feed_details) {
                console.log("This needs to be posted ", feed_details);
                $http.post('add_tag', feed_details);
            },
//            get_feed_uri : function() {
//                return currently_reading_uri;
//            },
            return_feed_labels: function () {
                return feed_labels;
            },
            create_entries_through_opml: function (opmlFile) {
                var fd = new FormData();
                fd.append('file', opmlFile);
                console.log(fd);
                $http.post('upload_opml_file', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            },
            getFeeds: function () {
                return $http.get('get_feeds_for_user');
            },
            getFeedsDump: function (ctgy) {
                return $http.get('get_all_feeds_dump_for_user?ctgy='+ctgy);
            },
//            get_latest_feeds_for_default_view: function() {
//                return $http.get('get_top_stories_for_user');
//            },
            get_feed_categories_for_user: function () {
                return $http.get("get_feed_labels_for_user").then(
                    function (feed_labels_response) {
                        feed_labels = feed_labels_response.data;
                    },
                    function () {
                        console.log("Error in getting feed labels for user");
                    }
                );
            },
            get_feeds_details_for_uri: function () {
                if (currently_reading_uri) {
                    console.log("Showing feeds for ", currently_reading_uri);
                    return $http.post('fetch_feeds_for_url', {feed_uri: currently_reading_uri });
                } else {
                    console.log("Showing the default page !! ");
                    return $http.get('get_top_stories_for_user');
                }
            },
            get: function () {
                return feeds_info;
            }
        };
    }]);