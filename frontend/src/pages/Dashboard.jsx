import CryptoDashboard from "../components/CryptoDashboard";
import CoinOverview from "../components/CoinOverview";

export default function Dashboard() {
  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <h1>Market Dashboard</h1>
        <p className="page-subtitle">
          Real-time analytics and predictive modeling.
        </p>
      </div>

      <CoinOverview />
      <CryptoDashboard />
    </div>
  );
}

