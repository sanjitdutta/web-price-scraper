"""Main scraping runner"""

import os
import datetime
import logging

from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

import sites.allen_edmonds as allen_edmonds

# 1) pull watch info from DB
# 2) execute scraping for each entry
# 3) log scraping results into database
# 4) pull past scraped data from DB (previous price)
# 5) send email if current price < previous price

load_dotenv(find_dotenv())

_MONGODB_USER = os.getenv("MONGODB_USER")
_MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
_MONGODB_URI = os.getenv("MONGODB_URI")

_WEBSITE_MAP = {
    "0": allen_edmonds,
    "1": None, # to be amazon
    "2": None # to be gap
}

_logger = None # pylint: disable=invalid-name

def _setup():
    global _logger
    _logger = logging.getLogger("web-price-scraper")
    _logger.setLevel(logging.DEBUG)
    ch = logging.StreamHandler() # pylint: disable=invalid-name
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    ch.setFormatter(formatter)
    _logger.addHandler(ch)

def main():
    """Main function"""
    _setup()

    client = MongoClient("mongodb://" + _MONGODB_USER + ":" + _MONGODB_PASSWORD \
        + "@" + _MONGODB_URI)
    _logger.info("connection to db successful")

    database = client["web-price-scraper"]
    watches = database["watches"]
    watch_data = database["watch-data"]

    all_watches = watches.find()
    _logger.info("got all watch data")

    for watch in all_watches:

        watch_id = watch["_id"]
        watch_url = watch["url"]
        watch_website_key = str(watch["website"])
        watch_website_module = _WEBSITE_MAP[watch_website_key]

        watch_watchers = []
        for watcher in watch["watchers"]:
            watch_watchers.append(watcher["email"])

        current_price = watch_website_module.scrape(watch_url)
        _logger.info("got price for watch with URL " + watch_url)

        watch_datum = {
            "watchKey": watch_id,
            "url": watch_url,
            "price": current_price,
            "date": datetime.datetime.now(datetime.timezone.utc)
        }
        watch_data.insert_one(watch_datum)
        _logger.info("stored price to db for watch with URL " + watch_url)

main()
