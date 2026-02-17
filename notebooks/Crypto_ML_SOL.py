import pandas as pd
import numpy as np
import os
from sklearn.linear_model import LinearRegression

# --- Paths ---
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CHART_PATH = os.path.join(PROJECT_ROOT, "outputs", "sol_chart_data.csv")
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "outputs", "sol_prediction.csv")

# --- Load SOL chart data ---
df = pd.read_csv(CHART_PATH)

if df.empty or "normalized_price" not in df.columns:
    raise ValueError("SOL chart data invalid or missing")

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

# --- Clamp prediction to [0, 1] ---
predicted_value = float(np.clip(predicted_value, 0, 1))

# --- Save prediction ---
pred_df = pd.DataFrame({
    "predicted_normalized_price": [predicted_value]
})

pred_df.to_csv(OUTPUT_PATH, index=False)

print("✅ SOL Prediction Saved:", OUTPUT_PATH)
print(pred_df)
