import { timeLabel } from "../utils/helpers";

export default function TimeStep({ setStep, hour, setHour }) {
  return (
    <div>
      <div style={styles.head}>
        <div style={styles.stepLabel}>STEP 3 / 4</div>
        <h2 style={styles.h2}>What time is it? ⏰</h2>
        <p style={styles.desc}>Late-night brains crave something different from morning minds.</p>
      </div>

      <div style={styles.card}>
        <div style={styles.emoji}>{timeLabel(hour)}</div>
        <input type="range" min={0} max={23} value={hour}
          onChange={e => setHour(+e.target.value)}
          style={styles.slider} />
        <div style={styles.ticks}>
          {["12am","2am","4am","6am","8am","10am","12pm","2pm","4pm","6pm","8pm","10pm"].map(t => (
            <span key={t} style={styles.tick}>{t}</span>
          ))}
        </div>
        <div style={styles.hourDisplay}>{String(hour).padStart(2,"0")}:00</div>
      </div>

      <div style={styles.nav}>
        <button onClick={() => setStep(2)} style={styles.backBtn}>← Back</button>
        <button onClick={() => setStep(4)} style={styles.nextBtn}>Next →</button>
      </div>
    </div>
  );
}

const styles = {
  head: { marginBottom: 32 },
  stepLabel: { fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: "1.2px", marginBottom: 8 },
  h2: { fontSize: 36, fontWeight: 900, marginBottom: 8 },
  desc: { color: "rgba(255,255,255,0.4)", fontSize: 15, margin: 0 },
  card: { background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: "34px 32px", marginBottom: 40, border: "1px solid rgba(255,255,255,0.07)" },
  emoji: { fontSize: 56, textAlign: "center", marginBottom: 24, display: "block" },
  slider: { width: "100%", accentColor: "#a78bfa", cursor: "pointer" },
  ticks: { display: "flex", justifyContent: "space-between", marginTop: 8 },
  tick: { fontSize: 10, color: "rgba(255,255,255,0.22)" },
  hourDisplay: { textAlign: "center", marginTop: 20, fontSize: 44, fontWeight: 900, color: "#a78bfa", letterSpacing: "-1px" },
  nav: { display: "flex", gap: 12 },
  backBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "13px 30px", color: "#fff", cursor: "pointer", fontSize: 14 },
  nextBtn: { background: "linear-gradient(90deg,#a78bfa,#f472b6)", border: "none", borderRadius: 50, padding: "13px 46px", fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer" },
};
