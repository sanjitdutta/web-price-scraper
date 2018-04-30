"""Main scraping runner"""

import os
import datetime

from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

import sites.allen_edmonds as allen_edmonds

# 1) pull watch info from DB
# 2) execute scraping for each entry
# 3) log scraping results into database
# 4) pull past scraped data from DB (previous price)
# 5) send email if current price < previous price

load_dotenv(find_dotenv())

MONGODB_USER = os.getenv("MONGODB_USER")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
MONGODB_URI = os.getenv("MONGODB_URI")

WEBSITE_MAP = {
    "0": allen_edmonds,
    "1": None, # to be amazon
    "2": None # to be gap
}

def main():
    """Main function"""
    client = MongoClient("mongodb://" + MONGODB_USER + ":" + MONGODB_PASSWORD + "@" + MONGODB_URI)
    database = client["web-price-scraper"]
    watches = database["watches"]
    watch_data = database["watch-data"]
    all_watches = watches.find()
    for watch in all_watches:
        watch_id = watch["_id"]
        watch_url = watch["url"]
        watch_website_key = str(watch["website"])
        watch_website_module = WEBSITE_MAP[watch_website_key]
        watch_watchers = []
        for watcher in watch["watchers"]:
            watch_watchers.append(watcher["email"])
        current_price = watch_website_module.scrape(watch_url)

        watch_datum = {
            "watchKey": watch_id,
            "url": watch_url,
            "price": current_price,
            "date": datetime.datetime.now(datetime.timezone.utc)
        }
        watch_data.insert_one(watch_datum)

main()
