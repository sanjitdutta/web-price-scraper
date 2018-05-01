"""Allen Edmonds website scraper"""

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

    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

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
