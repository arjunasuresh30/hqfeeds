# from feed_models import *
from datetime import datetime
from tasks.read_update_feed import check_and_parse_feed
import logging
import simplejson as json
from mongo_stuff import MongoLib
logging.basicConfig(level = logging.DEBUG)
logger = logging.getLogger(__name__)
global mongo_lib
mongo_lib = MongoLib()

def create_entries():
    opmlfile = "/sarjun/instances/hqfeeds/google-reader-subscriptions.xml"
    logged_in_user_id = 'arjuna@codecognition.com'
    from feeds_helper import import_opml_file
    try:
        
        import_opml_file(logged_in_user_id,opmlfile,mongo_lib)
        return json.dumps({"message":"OPML imported successfully"})
    except Exception,e:
        return json.dumps({"message":"Could not import OPML file"})

def delete_entries():
    ss = feeds_tags.delete()
    dbsession.execute(ss)
    dbsession.query(Feeds).delete()
    dbsession.query(Tag).delete()

def parse_feed():
    from pymongo import MongoClient
    #import pdb; pdb.set_trace()
    client = MongoClient()
    client = MongoClient('localhost', 27017)
    db = client.feeds
    db_collection = db.feeds_meta
    all_feeds = db_collection.find()
    for feed in all_feeds:
        print "Sending URL %s to task queue " % (feed['xmlUrl'])
        result = check_and_parse_feed.delay(feed['xmlUrl'])
        
        print result.task_id
