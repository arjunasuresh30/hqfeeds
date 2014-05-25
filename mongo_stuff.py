__author__='jchandrashekar'

import pymongo
import os

class MongoLib(object):
    def __init__(self):
        MONGO_PORT = os.environ.get('MONGO_PORT')
        MONGO_URL = os.environ.get('MONGO_URL')
        self.client = pymongo.MongoClient(MONGO_URL, MONGO_PORT)
        self.db = self.client.feeds
        self.feeds_dump_collection = self.db.feeds_dump
        self.feeds_meta_collection = self.db.feeds_meta
        self.user_feeds_collection = self.db.user_feeds_map
        self.user_info_collection = self.db.user_info

    def get_entries_for_a_particular_feed(self, feed_uri, feed_no_limit=20):
        list_of_feeds = self.feeds_dump_collection.find({'xmlUrl': feed_uri}).sort(
                    "parsed_time", pymongo.DESCENDING)
        list_of_feeds_count = list_of_feeds.count()
        feeds_list = []
        for feeds in list_of_feeds:
            feed_info = {}
            feed_info['description'] = feeds['description']
            feed_info['link'] = feeds['link']
            feed_info['title'] = feeds['title']
            feed_info['published_entry'] = feeds['parsed_time'].strftime("%Y-%m-%d %H:%M:%S")
            feeds_list.append(feed_info)
        if feed_no_limit:
            return feeds_list[:feed_no_limit]
        return feeds_list

    def get_all_feeds_for_user(self, mailid, limit):
        list_of_feeds = self.user_feeds_collection.find_one({'user_name': mailid})['listOfFeeds']
        list_of_feeds_export = []
        
        for feed_label, feeds_list in list_of_feeds.iteritems():
            feed_info = {}
            feed_info['label'] = feed_label
            feed_info['feeds'] = []
            for feed in feeds_list:
                feed_info['feeds'].append({"feed_label" : self.feeds_meta_collection.find_one({"xmlUrl":feed}) and self.feeds_meta_collection.find_one({"xmlUrl":feed})['meta_info'], "URI":feed })
                list_of_feeds_export.append(feed_info)
        if limit:
            return list_of_feeds_export[:limit]
        return list_of_feeds_export
        
    def add_feed_to_feeds_meta(self, feed_uri, feed_title):
        self.feeds_meta_collection.update({"xmlUrl":feed_uri}, {'$set': {'meta_info': feed_title}}, upsert=True)

    def associate_tags_to_user_feed(self, tags, feed_uri, logged_in_user_id):
        for tag in tags:
            self.user_feeds_collection.update({'user_name': logged_in_user_id},
                          {"$addToSet": {'listOfFeeds.%s' % tag: feed_uri}}, upsert=True)

    def get_feed_labels_for_user(self, logged_in_user_id):
        list_of_feeds = self.user_feeds_collection.find_one({'user_name': logged_in_user_id})['listOfFeeds']
        return list_of_feeds.keys()