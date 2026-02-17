import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_BASE = "http://127.0.0.1:8000";

/* -------------------------------------------------
   Coin Configuration
--------------------------------------------------*/
const COINS = {
  BTC: {
    label: "Bitcoin (BTC)",
    chartEndpoint: "/btc/chart",
    predictionEndpoint: "/btc/prediction",
    color: "#f7931a",
  },
  ETH: {
    label: "Ethereum (ETH)",
    chartEndpoint: "/eth/chart",
    predictionEndpoint: "/eth/prediction",
    color: "#627eea",
  },
  SOL: {
    label: "Solana (SOL)",
    chartEndpoint: "/sol/chart",
    predictionEndpoint: "/sol/prediction",
    color: "#14f195",
  },
};

export default function CryptoDashboard() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [chartData, setChartData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -------------------------------------------------
     Fetch Market Data
  --------------------------------------------------*/
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const coin = COINS[selectedCoin];

      const [chartRes, predRes] = await Promise.all([
        fetch(API_BASE + coin.chartEndpoint),
        fetch(API_BASE + coin.predictionEndpoint),
      ]);

      if (!chartRes.ok || !predRes.ok) {
        throw new Error("API response error");
      }

      const chartJson = await chartRes.json();
      const predJson = await predRes.json();

      setChartData(Array.isArray(chartJson) ? chartJson : []);
      setPrediction(
        typeof predJson.predicted_normalized_price === "number"
          ? predJson.predicted_normalized_price
          : null
      );
    } catch (err) {
      console.error("API Error:", err);
      setError("Unable to load market data.");
      setChartData([]);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------
     Lifecycle
  --------------------------------------------------*/
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  /* -------------------------------------------------
     Render
  --------------------------------------------------*/
  return (
  <div className="card fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <h2>
          {COINS[selectedCoin].label} — Normalized Price
        </h2>

        <select
          className="coin-select"
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          {Object.entries(COINS).map(([key, coin]) => (
            <option key={key} value={key}>
              {coin.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error State */}
      {error && <p className="error">{error}</p>}

      {/* Chart */}
      <div className="chart-box">
        {loading && chartData.length === 0 ? (
          <p className="loading">Loading chart data...</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="time"
                tickFormatter={(t) =>
                  new Date(t * 1000).toLocaleTimeString()
                }
                stroke="#cbd5f5"
              />
              <YAxis stroke="#cbd5f5" domain={["auto", "auto"]} />
              <Tooltip
                formatter={(v) => v?.toFixed(6)}
                labelFormatter={(l) =>
                  new Date(l * 1000).toLocaleTimeString()
                }
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COINS[selectedCoin].color}
                strokeWidth={3}
                dot={false}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Prediction */}
      <div className="prediction-box">
        🔮 Predicted Next Normalized Price:{" "}
        <strong>
          {prediction !== null
            ? prediction.toFixed(6)
            : "Loading..."}
        </strong>
      </div>

      {/* Live Update Indicator */}
      {loading && chartData.length > 0 && (
        <p className="loading">Updating data...</p>
      )}
    </div>
  );
}
