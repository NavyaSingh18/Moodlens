import { useState } from "react";
import { ALL_GENRES, GENRE_COLORS } from "../data/moods";

export default function GenreStep({ setStep, selGenres, toggleGenre }) {
  const [filter, setFilter] = useState("");
  const visible = ALL_GENRES.filter(g => g.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div style={styles.head}>
        <div style={styles.stepLabel}>STEP 2 / 4</div>
        <h2 style={styles.h2}>Genre preferences? 🎞️</h2>
        <p style={styles.desc}>25 genres to choose from. Optional — skip to stay open to everything.</p>
      </div>

      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search genres..."
          style={styles.searchInput}
        />
      </div>

      <div style={styles.tags}>
        {visible.map(g => {
          const on = selGenres.includes(g);
          const c  = GENRE_COLORS[g];
          return (
            <button key={g} onClick={() => toggleGenre(g)} style={{
              ...styles.tag,
              background: on ? c : "rgba(255,255,255,0.05)",
              border: on ? "none" : "1px solid rgba(255,255,255,0.1)",
              fontWeight: on ? 700 : 400,
              boxShadow: on ? `0 3px 20px ${c}50` : "none",
            }}>
              {g}
            </button>
          );
        })}
        {visible.length === 0 && <span style={styles.noMatch}>No genres match "{filter}"</span>}
      </div>

      {selGenres.length > 0 && (
        <div style={styles.selected}>
          <span style={styles.selLabel}>Selected ({selGenres.length}):</span>
          {selGenres.map(g => (
            <span key={g} style={{ ...styles.selTag, background: GENRE_COLORS[g] + "28", border: `1px solid ${GENRE_COLORS[g]}45`, color: GENRE_COLORS[g] }}>{g}</span>
          ))}
          <button onClick={() => { selGenres.forEach(() => {}); }} style={styles.clearBtn} onClick={() => selGenres.length && Array.from({length: selGenres.length}).forEach(() => toggleGenre(selGenres[0]))}>
            — or <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); selGenres.slice().forEach(g => toggleGenre(g)); }}>clear all</span>
          </button>
        </div>
      )}

      <div style={styles.nav}>
        <button onClick={() => setStep(1)} style={styles.backBtn}>← Back</button>
        <button onClick={() => setStep(3)} style={styles.nextBtn}>
          {!selGenres.length ? "Skip →" : `Next — ${selGenres.length} genre${selGenres.length > 1 ? "s" : ""} →`}
        </button>
      </div>
    </div>
  );
}

const styles = {
  head: { marginBottom: 28 },
  stepLabel: { fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: "1.2px", marginBottom: 8 },
  h2: { fontSize: 36, fontWeight: 900, marginBottom: 8 },
  desc: { color: "rgba(255,255,255,0.4)", fontSize: 15, margin: 0 },
  searchWrap: { position: "relative", marginBottom: 20, maxWidth: 340 },
  searchIcon: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "rgba(255,255,255,0.35)", pointerEvents: "none" },
  searchInput: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "11px 16px 11px 42px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" },
  tags: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  tag: { borderRadius: 50, padding: "10px 20px", fontSize: 13, color: "#fff", cursor: "pointer", transition: "all 0.2s" },
  noMatch: { color: "rgba(255,255,255,0.3)", fontSize: 13 },
  selected: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20, alignItems: "center" },
  selLabel: { fontSize: 12, color: "rgba(255,255,255,0.4)" },
  selTag: { borderRadius: 50, padding: "3px 12px", fontSize: 11, fontWeight: 700 },
  clearBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 11 },
  nav: { display: "flex", gap: 12, marginTop: 28 },
  backBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "13px 30px", color: "#fff", cursor: "pointer", fontSize: 14 },
  nextBtn: { background: "linear-gradient(90deg,#a78bfa,#60a5fa)", border: "none", borderRadius: 50, padding: "13px 46px", fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer" },
};
