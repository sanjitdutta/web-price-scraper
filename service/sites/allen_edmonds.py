"""Allen Edmonds website scraper"""

import requests
from bs4 import BeautifulSoup

def _currency_to_float(currency):
    return float(currency.strip().replace("$", ""))

def scrape(url):
    """Executes all logic"""

    # load page

    page = requests.get(url, headers={
        "User-agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36" \
        + " (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"
    })
    soup = BeautifulSoup(page.content, "html.parser")

    # find price area

    price_obj = soup.find(class_="product-price")
    sale_obj = price_obj.find(class_="price-sales")
    price_sale = None
    price_regular = None

    # set sale price if it exists
    # modify regular price span if sale price exists

    if sale_obj is not None:
        price_obj = price_obj.find(class_="price-standard")
        price_sale = _currency_to_float(sale_obj.get_text())
    else:
        price_obj = price_obj.find("span")

    # get regular price

    price_regular = _currency_to_float(price_obj.get_text())

    # return price

    return price_sale if price_sale is not None else price_regular
