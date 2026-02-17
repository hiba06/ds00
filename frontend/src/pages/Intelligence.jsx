import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function Intelligence() {
  const [selectedCoin, setSelectedCoin] = useState("btc");
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/llm/${selectedCoin}-summary`);
      const data = await res.json();
      setInsight(data.insight);
    } catch (err) {
      console.error("LLM fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
  }, [selectedCoin]);

  return (
    <div className="page-container fade-in">
      <div className="page-hero">
        <h1>AI Market Intelligence</h1>
        <p className="page-subtitle">
          Structured qualitative insights generated using large language models.
        </p>
      </div>

      <div className="card">
        <select
          className="coin-select"
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
          <option value="sol">Solana</option>
        </select>
      </div>

      {loading && <p className="loading">Generating AI analysis...</p>}

      {insight && (
        <div className="card intelligence-card">
          <h2>Market Regime: {insight.market_regime}</h2>

          <div className="intelligence-grid">
            <div>
              <span>Momentum</span>
              <strong>{insight.momentum}</strong>
            </div>
            <div>
              <span>Volatility</span>
              <strong>{insight.volatility_state}</strong>
            </div>
            <div>
              <span>Risk Outlook</span>
              <strong>{insight.risk_outlook}</strong>
            </div>
          </div>

          <h3>Key Insight</h3>
          <p>{insight.key_insight}</p>

          <h3>Risk Consideration</h3>
          <p>{insight.caution}</p>
        </div>
      )}
    </div>
  );
}
