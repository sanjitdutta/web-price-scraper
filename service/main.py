"""Main scraping runner"""

import os
import datetime
import logging

import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

import sites.allen_edmonds as allen_edmonds
import send_email

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

def _get_logger():
    logger = logging.getLogger("web-price-scraper")
    logger.setLevel(logging.DEBUG)
    ch = logging.StreamHandler() # pylint: disable=invalid-name
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    return logger

def _notify_watchers(watch_obj):
    """Sends email to watchers to watch stuff"""
    logger = _get_logger()
    logger.info("price has decreased - sending email(s)")

    connection = send_email.connect()

    watchers = watch_obj["watchers"]
    for watcher in watchers:
        send_email.send_email(
            connection=connection,
            subject="",
            recipient="",
            sender="",
            body=""
        )

    send_email.quit(connection)

def main():
    """Main function"""
    logger = _get_logger()

    client = MongoClient("mongodb://" + _MONGODB_USER + ":" + _MONGODB_PASSWORD \
        + "@" + _MONGODB_URI)
    logger.info("connection to db successful")

    database = client["web-price-scraper"]
    watches = database["watches"]
    watch_data = database["watch-data"]

    all_watches = watches.find()
    logger.info("got all watch data")

    for watch in all_watches:

        watch_watchers = []
        for watcher in watch["watchers"]:
            watch_watchers.append(watcher["email"])

        watch_obj = {
            "id": watch["_id"],
            "url": watch["url"],
            "website_key": str(watch["website"]),
            "website_module": _WEBSITE_MAP[str(watch["website"])],
            "watchers": watch_watchers
        }

        last_watch_datum = watch_data.find_one(
            filter={"watchKey": watch_obj["id"]},
            sort=[("date", pymongo.DESCENDING)]
        )
        last_watch_price = None

        if last_watch_datum is not None:
            last_watch_price = last_watch_datum["price"]
            logger.info("got previous price %d for watch with URL %s", \
                last_watch_price, watch_obj["url"])

        current_price = watch_obj["website_module"].scrape(watch_obj["url"])
        logger.info("got price for watch with URL %s", watch_obj["url"])

        watch_datum = {
            "watchKey": watch_obj["id"],
            "url": watch_obj["url"],
            "price": current_price,
            "date": datetime.datetime.now(datetime.timezone.utc)
        }
        watch_data.insert_one(watch_datum)
        logger.info("stored price %d to db for watch with URL %s", \
            current_price, watch_obj["url"])

        if last_watch_price is not None and current_price < last_watch_price:
            _notify_watchers(watch_obj)

main()
