// app/page.js
export default function Home() {
  return (
    <div className="card">
      <h1 className="heading">FCAST</h1>
      <p style={{ textAlign: "center", color: "var(--secondary-text)" }}>
        Cost Forecasting Made Simple
      </p>
      <a href="/login" className="button" style={{ marginTop: "2rem" }}>
        Get Started
      </a>
    </div>
  );
}