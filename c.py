import pandas as pd

df1 = pd.read_csv("outputs/crypto_realtime_preprocessed.csv")
df2 = pd.read_csv("outputs/next_price_prediction.csv")

print("Realtime columns:", df1.columns)
print("Prediction columns:", df2.columns)
