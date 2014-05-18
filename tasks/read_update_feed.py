from __future__ import absolute_import
from .celery import celery
from pymongo import MongoClient
import feedparser
from datetime import datetime
import logging
import simplejson as json

from lxml.html.clean import Cleaner

logging.basicConfig(level = logging.DEBUG)
logger = logging.getLogger(__name__)
print logger
root_logger = logging.getLogger("MainProcess")
root_logger.setLevel(logging.DEBUG)
print root_logger

client = MongoClient()
client = MongoClient('localhost', 27017)

db = client.feeds
collection = db.feeds_dump
collection_title = db.feeds_meta

def sanitize_content(description):
    if not description:
        return None
    cleaner = Cleaner(style=False,links=True,add_nofollow=True,page_structure=False,safe_attrs_only=False)
    return cleaner.clean_html(description)
    #import lxml.html    
    # try:
    #     html = lxml.html.fromstring(description)
    # except:
    #     import ipdb; ipdb.set_trace()

    # for tag in html.xpath('//*[@class]'):
    #     tag.attrib.pop('class')
    # for tag in html.xpath('//*[@style]'):
    #     tag.attrib.pop('style')
    # return lxml.html.tostring(html)

@celery.task(ignore_result=True)
def check_and_parse_feed(url):
    root_logger.info("Parsing feed %s " % (url))
    feed_entry = {}
    feed = feedparser.parse(url)
    feed_entry['xmlUrl'] = url

    feed_entries = []
    for entry in feed['entries']:
        feed_entry['title'] = entry.title
        if hasattr(entry, 'description'):
            # print "entry.description",entry.description
            feed_entry['description'] = sanitize_content(entry.description)
        if hasattr(entry, 'content'):
            # print "entry.content",entry.content
            # feed_entry['content'] = sanitize_content(entry.content)
            try:
                feed_entry['content'] = sanitize_content(entry.content)
            except:
                feed_entry['content'] = sanitize_content(entry.content[0].value)
        if hasattr(entry, 'published'):
            feed_entry['published_entry'] = entry.published
        feed_entry['link'] = entry.link
        if  collection.find({"link":entry.link}).count():
            root_logger.info( "Link is already present skipping %s " % entry.link)
            continue
        feed_entry['parsed_time'] = datetime.now()
        collection.insert(feed_entry, manipulate=False, safe=True)
        collection_title.update({"xmlUrl":url}, {'$set': {'meta_info': feed.feed.title}}, upsert=True)

        root_logger.info("Inserted link %s " % entry.link)
    root_logger.info("Done with  %s" % url)