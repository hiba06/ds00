# Crypto_ML_BTC.py

import pandas as pd
import numpy as np
import os
from sklearn.linear_model import LinearRegression

# --- Paths (ROBUST) ---
PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

CHART_DATA_PATH = os.path.join(PROJECT_ROOT, "outputs", "btc_chart_data.csv")
PREDICTION_OUTPUT = os.path.join(PROJECT_ROOT, "outputs", "btc_prediction.csv")

# --- Load BTC chart data ---
df = pd.read_csv(CHART_DATA_PATH)

if df.empty or "normalized_price" not in df.columns:
    raise ValueError("BTC chart data invalid or missing normalized_price")

# --- Prepare features ---
df["step"] = np.arange(len(df))

X = df[["step"]].values
y = df["normalized_price"].values

# --- Train model ---
model = LinearRegression()
model.fit(X, y)

# --- Predict next step ---
next_step = np.array([[len(df)]])
predicted_value = model.predict(next_step)[0]

# --- Clamp to [0, 1] ---
predicted_value = float(np.clip(predicted_value, 0, 1))

# --- Save prediction ---
pred_df = pd.DataFrame({
    "predicted_normalized_price": [predicted_value]
})

pred_df.to_csv(PREDICTION_OUTPUT, index=False)

print("✅ BTC Prediction Saved:", PREDICTION_OUTPUT)
print(pred_df)
