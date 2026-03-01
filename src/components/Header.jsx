import { timeLabel } from "../utils/helpers";

const STEP_LABELS = ["", "Mood", "Genre", "Time", "Arc", "Results"];

export default function Header({ step, hour }) {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <div style={styles.icon}>🎬</div>
        <div>
          <div style={styles.title}>MoodLens</div>
          <div style={styles.sub}>EMOTION-AWARE CINEMA AI</div>
        </div>
      </div>

      {step > 0 && step < 5 && (
        <nav style={styles.steps}>
          {STEP_LABELS.slice(1, 5).map((s, i) => (
            <div key={s} style={{ ...styles.stepItem, opacity: i + 1 <= step ? 1 : 0.28 }}>
              <div style={{ ...styles.dot, background: i + 1 <= step ? "linear-gradient(90deg,#a78bfa,#f472b6)" : "rgba(255,255,255,0.2)" }} />
              <span style={{ ...styles.stepLabel, color: i + 1 === step ? "#c4b5fd" : "rgba(255,255,255,0.35)", fontWeight: i + 1 === step ? 700 : 400 }}>{s}</span>
            </div>
          ))}
        </nav>
      )}

      <div style={styles.time}>{timeLabel(hour)}</div>
    </header>
  );
}

const styles = {
  header: {
    background: "rgba(10,7,30,0.9)",
    backdropFilter: "blur(24px)",
    padding: "13px 26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { display: "flex", alignItems: "center", gap: 11 },
  icon: {
    width: 40, height: 40, borderRadius: 12,
    background: "linear-gradient(135deg,#a78bfa,#f472b6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, boxShadow: "0 4px 18px rgba(167,139,250,0.45)",
  },
  title: {
    fontWeight: 900, fontSize: 21,
    background: "linear-gradient(90deg,#a78bfa,#f472b6,#60a5fa)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    letterSpacing: "-0.4px",
  },
  sub: { fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "1.4px", marginTop: -2 },
  steps: { display: "flex", gap: 18, alignItems: "center" },
  stepItem: { display: "flex", alignItems: "center", gap: 5, transition: "opacity 0.3s" },
  dot: { width: 7, height: 7, borderRadius: "50%", transition: "all 0.3s" },
  stepLabel: { fontSize: 11, transition: "color 0.3s" },
  time: { fontSize: 11, color: "rgba(255,255,255,0.28)" },
};
