"""Amazon website scraper"""

import requests
from bs4 import BeautifulSoup

def _currency_to_float(currency):
    return float(currency.strip().replace("$", ""))

def scrape(url):
    """Executes all logic"""

    # url = "https://www.allenedmonds.com/factory-second-shoes/" \
    #     + "factory-2nd---fifth-avenue-cap-toe-oxford/SF5705S.html"
    # url = "https://www.allenedmonds.com/factory-second-shoes/" \
    #     + "factory-2nd---sanford-cap-toe-derby-dress-shoe/SF6517S.html"

    # load page

    page = requests.get(url, headers={
        "User-agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36" \
        + " (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"
    })
    soup = BeautifulSoup(page.content, "html.parser")

    # find price area

    price_obj = soup.find(id="price")
    list_price_obj = price_obj.find(class_="a-text-strike")
    our_price_obj = price_obj.find(id="priceblock_ourprice")

    list_price = None
    our_price = None
    if list_price_obj is not None:
        list_price = _currency_to_float(list_price_obj.get_text())
    if our_price_obj is not None:
        our_price = _currency_to_float(our_price_obj.get_text())

    # return price - our_price = lower

    return our_price if our_price is not None else list_price
