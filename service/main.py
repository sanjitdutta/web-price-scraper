"""Main scraping runner"""

import os

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

def main():
    """Main function"""
    client = MongoClient("mongodb://" + MONGODB_USER + ":" + MONGODB_PASSWORD + "@" + MONGODB_URI)
    database = client["web-price-scraper"]
    watches = database["watches"]
    all_watches = watches.find()
    for watch in all_watches:
        print(watch)

main()

allen_edmonds.main()
