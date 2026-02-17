import pandas as pd
import os

# --- Paths ---
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
RAW_DATA_PATH = os.path.join(PROJECT_ROOT, "data", "raw", "crypto_realtime_data.csv")
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "outputs", "eth_chart_data.csv")

# --- Load raw dataset safely ---
df = pd.read_csv(
    RAW_DATA_PATH,
    engine="python",
    on_bad_lines="skip"
)

# --- Standardize column names ---
df = df.rename(columns={
    "Time": "timestamp",
    "Coin": "coin",
    "Price": "price",
    "Best_Bid": "best_bid",
    "Best_Ask": "best_ask",
    "Last_Size": "last_size",
    "Side": "side"
})

# --- Convert timestamp ---
df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")

# --- Filter ETH only ---
df_eth = df[df["coin"] == "ETH-USD"].copy()

# --- Clean ---
df_eth = df_eth.dropna(subset=["timestamp", "price"])
df_eth = df_eth.sort_values("timestamp")

# --- Normalize price (important for ML) ---
price_min = df_eth["price"].min()
price_max = df_eth["price"].max()

df_eth["normalized_price"] = (
    (df_eth["price"] - price_min) / (price_max - price_min)
)

# --- Keep only chart-required columns ---
chart_df = df_eth[["timestamp", "normalized_price"]]

# --- Ensure output directory exists ---
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

# --- Save ---
chart_df.to_csv(OUTPUT_PATH, index=False)

print("✅ ETH Chart Data Saved:", OUTPUT_PATH)
print(chart_df.head())