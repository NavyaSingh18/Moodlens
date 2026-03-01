import { useRef, useEffect, useState } from "react";
import { yToEmotion } from "../utils/helpers";

const ARC_PRESETS = [
  { label: "😢→😊 Uplifting",    arc: { start: 88, end: 8  } },
  { label: "😐→🔥 Thrilling",    arc: { start: 55, end: 18 } },
  { label: "😊→💭 Reflective",   arc: { start: 12, end: 72 } },
  { label: "🌀→🌀 Mind-Trip",    arc: { start: 40, end: 38 } },
  { label: "😎→⚡ Build-Up",     arc: { start: 45, end: 14 } },
  { label: "💙→❤️ Heartfelt",    arc: { start: 62, end: 9  } },
  { label: "🔥→🌧️ Devastating",  arc: { start: 20, end: 95 } },
  { label: "🌧️→⚡ Rise Up",      arc: { start: 80, end: 20 } },
];

const ROWS = [
  { pct: 5,  label: "Euphoric 😂",   col: "#fbbf24" },
  { pct: 22, label: "Excited ⚡",    col: "#f97316" },
  { pct: 39, label: "Engaged 😎",    col: "#60a5fa" },
  { pct: 56, label: "Neutral 😐",    col: "#94a3b8" },
  { pct: 73, label: "Melancholy 💭", col: "#a78bfa" },
  { pct: 90, label: "Devastated 😢", col: "#e879f9" },
];

function ArcCanvas({ value, onChange }) {
  const ref  = useRef(null);
  const [drag, setDrag] = useState(null);
  const pts = value;

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    ROWS.forEach(r => {
      const y = (r.pct / 100) * H;
      ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.setLineDash([]);
    });

    const sx = 60, sy = (pts.start / 100) * H, ex = W - 60, ey = (pts.end / 100) * H;
    const c1x = sx + (ex - sx) / 3, c2x = sx + (ex - sx) * 2 / 3;

    ctx.beginPath(); ctx.moveTo(sx, H); ctx.lineTo(sx, sy);
    ctx.bezierCurveTo(c1x, sy, c2x, ey, ex, ey);
    ctx.lineTo(ex, H); ctx.closePath();
    const ag = ctx.createLinearGradient(0, 0, 0, H);
    ag.addColorStop(0, "rgba(167,139,250,0.2)"); ag.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = ag; ctx.fill();

    const lg = ctx.createLinearGradient(sx, 0, ex, 0);
    lg.addColorStop(0, "#a78bfa"); lg.addColorStop(1, "#f472b6");
    ctx.strokeStyle = lg; ctx.lineWidth = 3;
    ctx.shadowColor = "#a78bfa"; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(c1x, sy, c2x, ey, ex, ey); ctx.stroke();
    ctx.shadowBlur = 0;

    [[sx, sy, "start", "#a78bfa"], [ex, ey, "end", "#f472b6"]].forEach(([x, y, k, col]) => {
      ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fillStyle = drag === k ? "#fff" : col; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 2; ctx.stroke();
    });
  }, [pts, drag]);

  const getY = e => {
    const rect = ref.current.getBoundingClientRect();
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return Math.max(0, Math.min(100, ((cy - rect.top) / rect.height) * 100));
  };
  const down = e => {
    const rect = ref.current.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setDrag(cx < ref.current.width / 2 ? "start" : "end");
  };
  const move = e => { if (!drag) return; onChange({ ...pts, [drag]: getY(e) }); };
  const up   = () => setDrag(null);

  return (
    <div>
      <div style={styles.arcHeader}>
        <span>🎬 Start: <strong style={{ color: "#a78bfa" }}>{yToEmotion(pts.start)}</strong></span>
        <span>End: <strong style={{ color: "#f472b6" }}>{yToEmotion(pts.end)}</strong> 🎬</span>
      </div>
      <div style={styles.canvasRow}>
        <div style={styles.rowLabels}>
          {ROWS.map(r => <div key={r.label} style={{ fontSize: 10, color: r.col, whiteSpace: "nowrap" }}>{r.label}</div>)}
        </div>
        <canvas ref={ref} width={480} height={170}
          style={{ ...styles.canvas, cursor: drag ? "grabbing" : "grab" }}
          onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}
          onTouchStart={down} onTouchMove={move} onTouchEnd={up} />
      </div>
      <p style={styles.hint}>Drag the purple dot (film start) and pink dot (film end) to shape your emotional journey</p>
    </div>
  );
}

export default function ArcStep({ setStep, arc, setArc, generate }) {
  return (
    <div>
      <div style={styles.head}>
        <div style={styles.badges}>
          <span style={styles.stepLabel}>STEP 4 / 4</span>
          <span style={styles.exclusiveBadge}>✨ WORLD-EXCLUSIVE FEATURE</span>
        </div>
        <h2 style={styles.h2}>Design your Emotional Journey 🎨</h2>
        <p style={styles.desc}>
          No other recommender on the planet does this. Drag the curve to define{" "}
          <em>how you want to feel</em> — from the opening frame to the final credits.
        </p>
      </div>

      <div style={styles.canvasCard}>
        <ArcCanvas value={arc} onChange={setArc} />
      </div>

      <div style={styles.presetsSection}>
        <div style={styles.presetsLabel}>OR CHOOSE A PRESET JOURNEY</div>
        <div style={styles.presetsGrid}>
          {ARC_PRESETS.map(p => (
            <button key={p.label} onClick={() => setArc(p.arc)} style={styles.presetBtn}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.nav}>
        <button onClick={() => setStep(3)} style={styles.backBtn}>← Back</button>
        <button onClick={generate} style={styles.goBtn}>✨ Find My Movies</button>
      </div>
    </div>
  );
}

const styles = {
  head: { marginBottom: 28 },
  badges: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" },
  stepLabel: { fontSize: 11, color: "#f472b6", fontWeight: 700, letterSpacing: "1.2px" },
  exclusiveBadge: { background: "rgba(244,114,182,0.14)", border: "1px solid rgba(244,114,182,0.32)", borderRadius: 50, padding: "3px 12px", fontSize: 10, color: "#f9a8d4", fontWeight: 700 },
  h2: { fontSize: 36, fontWeight: 900, marginBottom: 10 },
  desc: { color: "rgba(255,255,255,0.43)", fontSize: 15, maxWidth: 620, lineHeight: 1.7, margin: 0 },
  canvasCard: { background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: "26px 22px", marginBottom: 24, border: "1px solid rgba(167,139,250,0.17)" },
  arcHeader: { display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, fontWeight: 500 },
  canvasRow: { display: "flex", gap: 10, alignItems: "stretch" },
  rowLabels: { display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 2, paddingBottom: 2, width: 100 },
  canvas: { flex: 1, maxWidth: "100%", borderRadius: 12, background: "rgba(0,0,0,0.2)", display: "block" },
  hint: { textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 6 },
  presetsSection: { marginBottom: 36 },
  presetsLabel: { fontSize: 11, color: "rgba(255,255,255,0.32)", marginBottom: 12, letterSpacing: "0.5px" },
  presetsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 },
  presetBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "11px 8px", color: "rgba(255,255,255,0.72)", cursor: "pointer", fontSize: 12, textAlign: "center" },
  nav: { display: "flex", gap: 12 },
  backBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "13px 30px", color: "#fff", cursor: "pointer", fontSize: 14 },
  goBtn: { background: "linear-gradient(135deg,#a78bfa,#f472b6)", border: "none", borderRadius: 50, padding: "15px 58px", fontSize: 17, fontWeight: 800, color: "#fff", cursor: "pointer", boxShadow: "0 14px 48px rgba(167,139,250,0.52)" },
};
