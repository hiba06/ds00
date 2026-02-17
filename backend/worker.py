import os
import sys
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

import time
import requests
import pandas as pd
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import sys


BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

from db import SessionLocal
from models import Price, Prediction, Insight
from llm.openrouter_helper import ask_llm

load_dotenv()

API_KEY = os.getenv("CRYPTO_API_KEY")

# -------------------------------------------
# CONFIG
# -------------------------------------------
SYMBOLS = ["BTC", "ETH", "SOL"]
FETCH_INTERVAL = 60  # seconds

API_URL = "https://api.coingecko.com/api/v3/simple/price"


# -------------------------------------------
# FETCH LIVE DATA
# -------------------------------------------
def fetch_live_prices():
    params = {
        "ids": "bitcoin,ethereum,solana",
        "vs_currencies": "usd"
    }

    response = requests.get(API_URL, params=params)
    data = response.json()

    return {
        "BTC": data["bitcoin"]["usd"],
        "ETH": data["ethereum"]["usd"],
        "SOL": data["solana"]["usd"],
    }


# -------------------------------------------
# SIMPLE NORMALIZATION
# -------------------------------------------
def normalize_price(price):
    return price / 100000  # example normalization


# -------------------------------------------
# SIMPLE PREDICTION (replace with real model)
# -------------------------------------------
def predict_next(price):
    return price * 1.002  # mock 0.2% increase


# -------------------------------------------
# GENERATE LLM INSIGHT
# -------------------------------------------
def generate_insight(symbol, price):
    prompt = f"""
Analyze {symbol} current price: {price}.
Return JSON:
{{
"market_regime": "",
"momentum": "",
"volatility_state": "",
"risk_outlook": "",
"key_insight": "",
"caution": ""
}}
"""
    raw = ask_llm(prompt)

    try:
        import json
        return json.loads(raw)
    except:
        return None


# -------------------------------------------
# STORE DATA
# -------------------------------------------
def store_data(db: Session, symbol, price, prediction, insight):
    price_row = Price(symbol=symbol, value=price)
    db.add(price_row)

    pred_row = Prediction(symbol=symbol, predicted_value=prediction)
    db.add(pred_row)

    if insight:
        insight_row = Insight(
            symbol=symbol,
            market_regime=insight.get("market_regime"),
            momentum=insight.get("momentum"),
            volatility_state=insight.get("volatility_state"),
            risk_outlook=insight.get("risk_outlook"),
            key_insight=insight.get("key_insight"),
            caution=insight.get("caution"),
        )
        db.add(insight_row)

    db.commit()


# -------------------------------------------
# MAIN LOOP
# -------------------------------------------
def run_worker():
    print("🚀 Live Crypto Worker Started...")

    while True:
        try:
            db = SessionLocal()

            prices = fetch_live_prices()

            for symbol, price in prices.items():
                normalized = normalize_price(price)
                prediction = predict_next(normalized)
                insight = generate_insight(symbol, normalized)

                store_data(db, symbol, normalized, prediction, insight)

                print(f"Updated {symbol}")

            db.close()

        except Exception as e:
            print("Worker Error:", e)

        time.sleep(FETCH_INTERVAL)


if __name__ == "__main__":
    run_worker()