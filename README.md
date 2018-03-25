# web-price-scraper

## Overview
This project is meant to be a web scraper that runs server side and sends
alerts any time the price of a requested item has changed. It is planned to be
built to support:
* Amazon
* Allen Edmonds
* Uniqlo
* J. Crew
* The GAP

## Language
Python3 w/ Beautiful Soup

## Setup

```bash
cd service
pip3 install -r requirements.txt
cd ../client
npm install
```

## Service - Execution

```bash
python service/main.py
```

## Client - Execution

```bash
node client/server.js
```