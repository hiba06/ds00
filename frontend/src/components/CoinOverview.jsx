/* ---------------------------------------------
   Static Coin Metadata (UI Only)
--------------------------------------------- */
const COIN_INFO = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    tagline: "The First Decentralized Digital Currency",
    description:
      "Bitcoin is a peer-to-peer digital asset operating without central authority. It introduced blockchain technology and is widely regarded as digital gold due to its scarcity and global adoption.",
    launch: "2009",
    consensus: "Proof of Work (PoW)",
    primaryUse: "Store of Value, Hedge Asset",
    color: "#f7931a",
  },

  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    tagline: "Programmable Blockchain for Smart Contracts",
    description:
      "Ethereum is a decentralized platform enabling smart contracts and decentralized applications (dApps). It powers DeFi, NFTs, DAOs, and the broader Web3 ecosystem.",
    launch: "2015",
    consensus: "Proof of Stake (PoS)",
    primaryUse: "Smart Contracts, DeFi, NFTs",
    color: "#627eea",
  },

  SOL: {
    name: "Solana",
    symbol: "SOL",
    tagline: "High-Performance Blockchain for Scalable Apps",
    description:
      "Solana is engineered for high throughput and low transaction latency. It combines Proof of History with PoS to enable scalable decentralized systems.",
    launch: "2020",
    consensus: "Proof of History + PoS",
    primaryUse: "High-Speed DeFi, NFTs, Web3 Apps",
    color: "#14f195",
  },
};

export default function CoinOverview({ selectedCoin = "BTC" }) {
  const coin = COIN_INFO[selectedCoin];

  if (!coin) {
    return (
      <div className="coin-overview-card">
        <p className="error">Coin information unavailable.</p>
      </div>
    );
  }

  return (
    <div className="coin-overview-card">
      {/* Header */}
      <div
        className="coin-header"
        style={{ borderLeft: `6px solid ${coin.color}` }}
      >
        <div>
          <h2 className="coin-name">
            {coin.name} ({coin.symbol})
          </h2>
          <p className="coin-tagline">{coin.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="coin-description">{coin.description}</p>

      {/* Statistics */}
      <div className="coin-stats-grid">
        <div className="stat-box">
          <span className="stat-label">Launch Year</span>
          <span className="stat-value">{coin.launch}</span>
        </div>

        <div className="stat-box">
          <span className="stat-label">Consensus Mechanism</span>
          <span className="stat-value">{coin.consensus}</span>
        </div>

        <div className="stat-box">
          <span className="stat-label">Primary Use Case</span>
          <span className="stat-value">{coin.primaryUse}</span>
        </div>
      </div>
    </div>
  );
}
