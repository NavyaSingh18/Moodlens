export default function WelcomeScreen({ setStep }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.icon}>🎭</div>
      <h1 style={styles.h1}>
        Movies that match<br />
        <span style={styles.gradient}>exactly how you feel</span>
      </h1>
      <p style={styles.sub}>
        Your mood is the star. MoodLens begins with <strong style={{ color: "#c4b5fd" }}>how you feel right now</strong> —
        then layers genre, time-of-day, and our exclusive{" "}
        <strong style={{ color: "#f9a8d4" }}>Emotional Journey Arc</strong> to find your perfect film.
      </p>
      <div style={styles.badge}>✨ 14 moods · 25 genres · 50 movies · Emotional Journey Arc</div>

      <div style={styles.grid}>
        {FEATURES.map(([ic, t, d]) => (
          <div key={t} style={styles.card}>
            <div style={styles.cardIcon}>{ic}</div>
            <div style={styles.cardTitle}>{t}</div>
            <div style={styles.cardDesc}>{d}</div>
          </div>
        ))}
      </div>

      <button onClick={() => setStep(1)} style={styles.cta}>
        Begin My Cinema Journey →
      </button>
    </div>
  );
}

const FEATURES = [
  ["🎭", "Mood-First",   "Your emotion today, not yesterday's watch history"],
  ["🎨", "Arc Designer", "Draw how you want to feel start-to-finish"],
  ["⏰", "Time-Aware",   "Late-night vs morning picks adapt automatically"],
  ["🔍", "Transparent",  "Every pick comes with a full reasoning breakdown"],
];

const styles = {
  wrap: { textAlign: "center" },
  icon: { fontSize: 96, marginBottom: 20, filter: "drop-shadow(0 0 48px rgba(167,139,250,0.55))", lineHeight: 1 },
  h1: { fontSize: 44, fontWeight: 900, marginBottom: 12, lineHeight: 1.1 },
  gradient: { background: "linear-gradient(90deg,#a78bfa,#f472b6,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { color: "rgba(255,255,255,0.48)", fontSize: 16, maxWidth: 580, margin: "0 auto 16px", lineHeight: 1.8 },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.28)",
    borderRadius: 50, padding: "8px 20px", fontSize: 13, color: "#c4b5fd", marginBottom: 56,
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, maxWidth: 740, margin: "0 auto 60px" },
  card: { background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: "22px 14px", border: "1px solid rgba(255,255,255,0.06)" },
  cardIcon: { fontSize: 30, marginBottom: 10 },
  cardTitle: { fontWeight: 700, fontSize: 13, marginBottom: 5 },
  cardDesc: { fontSize: 11, color: "rgba(255,255,255,0.36)", lineHeight: 1.6 },
  cta: {
    background: "linear-gradient(135deg,#a78bfa,#f472b6)", border: "none", borderRadius: 50,
    padding: "20px 68px", fontSize: 19, fontWeight: 800, color: "#fff", cursor: "pointer",
    boxShadow: "0 16px 52px rgba(167,139,250,0.48)", letterSpacing: "0.2px",
  },
};
