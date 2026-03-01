import { MOODS } from "../data/moods";

export default function MoodStep({ setStep, selMoods, toggleMood }) {
  return (
    <div>
      <div style={styles.head}>
        <div style={styles.stepLabel}>STEP 1 / 4 — THE MOST IMPORTANT STEP</div>
        <h2 style={styles.h2}>
          How are you feeling{" "}
          <span style={styles.gradient}>right now?</span>
        </h2>
        <p style={styles.desc}>
          This step drives <strong style={{ color: "#c4b5fd" }}>42% of your recommendation score</strong> — the largest single factor.
          Be honest. Pick as many moods as feel true today.
        </p>
      </div>

      <div style={styles.grid}>
        {MOODS.map(m => {
          const on = selMoods.includes(m.id);
          return (
            <button key={m.id} onClick={() => toggleMood(m.id)} style={{
              ...styles.moodCard,
              background: on ? `linear-gradient(135deg,${m.color}55,${m.color}22)` : "rgba(255,255,255,0.04)",
              border: on ? `2px solid ${m.color}` : "1px solid rgba(255,255,255,0.09)",
              transform: on ? "scale(1.03)" : "scale(1)",
              boxShadow: on ? `0 6px 30px ${m.color}40` : "none",
            }}>
              {on && <div style={{ ...styles.check, background: m.color }}>✓</div>}
              <div style={styles.emoji}>{m.emoji}</div>
              <div style={styles.moodLabel}>{m.label}</div>
              <div style={styles.moodDesc}>{m.desc}</div>
            </button>
          );
        })}
      </div>

      {selMoods.length > 0 && (
        <div style={styles.selected}>
          <span style={styles.selectedLabel}>Selected:</span>
          {selMoods.map(id => {
            const m = MOODS.find(x => x.id === id);
            return (
              <span key={id} style={{ ...styles.tag, background: m.color + "30", border: `1px solid ${m.color}55`, color: m.color }}>
                {m.emoji} {m.label}
              </span>
            );
          })}
        </div>
      )}

      <div style={styles.nav}>
        <button onClick={() => setStep(0)} style={styles.backBtn}>← Back</button>
        <button onClick={() => setStep(2)} disabled={!selMoods.length} style={{
          ...styles.nextBtn,
          background: selMoods.length ? "linear-gradient(90deg,#a78bfa,#60a5fa)" : "rgba(255,255,255,0.06)",
          opacity: selMoods.length ? 1 : 0.35,
          cursor: selMoods.length ? "pointer" : "not-allowed",
        }}>
          {selMoods.length ? `Next — ${selMoods.length} mood${selMoods.length > 1 ? "s" : ""} selected →` : "Pick at least one mood"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  head: { marginBottom: 36 },
  stepLabel: { fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: "1.2px", marginBottom: 8 },
  h2: { fontSize: 38, fontWeight: 900, marginBottom: 10, lineHeight: 1.1 },
  gradient: { background: "linear-gradient(90deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  desc: { color: "rgba(255,255,255,0.42)", fontSize: 15, maxWidth: 560, lineHeight: 1.7, margin: 0 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14, marginBottom: 32 },
  moodCard: {
    position: "relative", textAlign: "left", padding: "22px 16px",
    borderRadius: 20, cursor: "pointer", overflow: "hidden",
    transition: "all 0.2s", width: "100%",
  },
  check: {
    position: "absolute", top: 10, right: 10, width: 20, height: 20,
    borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#fff",
  },
  emoji: { fontSize: 32, marginBottom: 10 },
  moodLabel: { fontWeight: 800, fontSize: 15, marginBottom: 5, color: "#fff" },
  moodDesc: { fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.5 },
  selected: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28, alignItems: "center" },
  selectedLabel: { fontSize: 12, color: "rgba(255,255,255,0.4)" },
  tag: { borderRadius: 50, padding: "4px 14px", fontSize: 12, fontWeight: 700 },
  nav: { display: "flex", gap: 12 },
  backBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "14px 30px", color: "#fff", cursor: "pointer", fontSize: 14 },
  nextBtn: { border: "none", borderRadius: 50, padding: "14px 46px", fontSize: 15, fontWeight: 700, color: "#fff", transition: "all 0.2s" },
};
