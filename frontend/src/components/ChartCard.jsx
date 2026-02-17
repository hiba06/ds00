import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartCard({
  title = "Price Chart",
  data = [],
  color = "#00e5ff",
  loading = false,
}) {
  const hasData = Array.isArray(data) && data.length > 0;

  const formatTime = (t) =>
    t ? new Date(t * 1000).toLocaleTimeString() : "";

  const formatValue = (v) =>
    typeof v === "number" ? v.toFixed(6) : v;

  if (loading && !hasData) {
    return (
      <div className="chart-card">
        <p className="loading">Loading chart data...</p>
      </div>
    );
  }

  if (!loading && !hasData) {
    return (
      <div className="chart-card">
        <p className="error">No data available</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2 className="chart-title">{title}</h2>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              tickFormatter={formatTime}
            />

            <YAxis
              stroke="#94a3b8"
              domain={["auto", "auto"]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              formatter={formatValue}
              labelFormatter={formatTime}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
