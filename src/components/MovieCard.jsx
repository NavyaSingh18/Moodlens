import { useRef, useEffect } from "react";
import { MOODS, GENRE_COLORS } from "../data/moods";
import { arcDirectionLabel } from "../utils/helpers";

function ArcMini({ movie, desiredArc }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const draw = (a, col, dash) => {
      const sx = 4, sy = (a.start / 100) * H, ex = W - 4, ey = (a.end / 100) * H;
      if (dash) ctx.setLineDash([3, 3]);
      ctx.strokeStyle = col; ctx.lineWidth = dash ? 1.5 : 2.5;
      ctx.beginPath(); ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(sx + (ex - sx) / 3, sy, sx + (ex - sx) * 2 / 3, ey, ex, ey);
      ctx.stroke(); ctx.setLineDash([]);
    };
    if (desiredArc) draw(desiredArc, "rgba(255,255,255,0.18)", true);
    draw(movie.arc, movie.color, false);
  }, []);
  return (
    <canvas ref={ref} width={80} height={34}
      style={{ borderRadius: 8, background: "rgba(0,0,0,0.25)", flexShrink: 0 }} />
  );
}

function MovieLogo({ movie }) {
  return (
    <div style={{
      width: 52, height: 52,
      borderRadius: 52 * 0.24,
      background: `linear-gradient(135deg,${movie.color}28,${movie.color}65)`,
      border: `2px solid ${movie.color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 52 * 0.44, flexShrink: 0,
      boxShadow: `0 3px 14px ${movie.color}28`,
    }}>
      {movie.emoji}
    </div>
  );
}

export default function MovieCard({ movie, idx, expanded, setExpanded, liked, toggleLike, arc: desiredArc, selMoods, selGenres, setTrailer }) {
  const isOpen = expanded === movie.id;

  return (
    <div style={{
      background: isOpen ? "rgba(167,139,250,0.09)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${isOpen ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 20, overflow: "hidden", transition: "all 0.22s",
    }}>
      {/* ── Row ── */}
      <div style={styles.row} onClick={() => setExpanded(isOpen ? null : movie.id)}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <MovieLogo movie={movie} />
          {idx === 0 && (
            <div style={styles.topBadge}>★1</div>
          )}
        </div>

        <div style={styles.info}>
          <div style={styles.titleRow}>
            <span style={styles.title}>{movie.title}</span>
            <span style={styles.meta}>{movie.year} · {movie.duration} · ⭐ {movie.rating}</span>
          </div>
          <div style={styles.tags}>
            {movie.genres.slice(0, 3).map(g => (
              <span key={g} style={{ ...styles.genreTag, background: (GENRE_COLORS[g] || "#555") + "22", border: `1px solid ${GENRE_COLORS[g] || "#555"}38`, color: GENRE_COLORS[g] || "#aaa" }}>{g}</span>
            ))}
            <span style={styles.dot}>·</span>
            {movie.mood.slice(0, 3).map(id => {
              const m = MOODS.find(x => x.id === id);
              return m ? <span key={id} title={m.label} style={{ fontSize: 14 }}>{m.emoji}</span> : null;
            })}
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.scoreRow}>
            <div style={styles.scoreBar}>
              <div style={{ height: "100%", width: `${movie.score}%`, background: movie.score >= 80 ? "linear-gradient(90deg,#a78bfa,#f472b6)" : "linear-gradient(90deg,#60a5fa,#a78bfa)", borderRadius: 3 }} />
            </div>
            <span style={{ ...styles.scoreNum, color: movie.score >= 80 ? "#c4b5fd" : "#93c5fd" }}>{movie.score}%</span>
          </div>
          <ArcMini movie={movie} desiredArc={desiredArc} />
        </div>

        <button onClick={e => { e.stopPropagation(); toggleLike(movie.id); }} style={styles.likeBtn}>
          {liked[movie.id] ? "❤️" : "🤍"}
        </button>
        <span style={styles.chevron}>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* ── Expanded ── */}
      {isOpen && (
        <div style={styles.expanded}>
          <div style={styles.expandGrid}>
            <div>
              <div style={styles.sectionLabel}>SYNOPSIS</div>
              <p style={styles.summary}>{movie.summary}</p>
              <div style={styles.director}>🎬 {movie.director}</div>
              {/* Trailer button */}
              <button
                onClick={() => setTrailer(movie.trailerKey)}
                style={styles.trailerBtn}
              >
                ▶ Watch Trailer
              </button>
            </div>
            <div>
              <div style={{ ...styles.sectionLabel, color: "#f472b6" }}>WHY MOODLENS CHOSE THIS</div>
              <div style={styles.whyList}>
                <div>🎭 Mood: <strong style={{ color: "#c4b5fd" }}>{movie.mood.filter(m => selMoods.includes(m)).map(id => { const m = MOODS.find(x => x.id === id); return m ? `${m.emoji} ${m.label}` : id; }).join(", ") || "arc & genre driven"}</strong></div>
                {selGenres.length > 0 && <div>🎞️ Genre: <strong style={{ color: "#93c5fd" }}>{movie.genres.filter(g => selGenres.includes(g)).join(", ") || "none"}</strong></div>}
                <div>📈 Arc: <strong style={{ color: "#f9a8d4" }}>{arcDirectionLabel(movie.arc)}</strong></div>
                <div>⭐ Quality: <strong style={{ color: "#fde68a" }}>{movie.rating}/10 IMDb</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  row: { display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", cursor: "pointer" },
  topBadge: { position: "absolute", top: -6, right: -6, background: "linear-gradient(135deg,#f59e0b,#f97316)", borderRadius: 50, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#fff" },
  info: { flex: 1, minWidth: 0 },
  titleRow: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 5 },
  title: { fontWeight: 800, fontSize: 16 },
  meta: { fontSize: 11, color: "rgba(255,255,255,0.28)" },
  tags: { display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" },
  genreTag: { borderRadius: 50, padding: "2px 9px", fontSize: 10 },
  dot: { color: "rgba(255,255,255,0.25)", fontSize: 12, margin: "0 2px" },
  right: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7, flexShrink: 0 },
  scoreRow: { display: "flex", alignItems: "center", gap: 8 },
  scoreBar: { width: 78, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" },
  scoreNum: { fontSize: 14, fontWeight: 800, minWidth: 36, textAlign: "right" },
  likeBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: "0 2px", flexShrink: 0 },
  chevron: { color: "rgba(255,255,255,0.22)", fontSize: 12, flexShrink: 0 },
  expanded: { borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 18px" },
  expandGrid: { display: "grid", gridTemplateColumns: "3fr 2fr", gap: 22 },
  sectionLabel: { fontSize: 10, color: "#a78bfa", fontWeight: 700, letterSpacing: "1px", marginBottom: 8 },
  summary: { fontSize: 13, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, margin: "0 0 10px 0" },
  director: { fontSize: 11, color: "rgba(255,255,255,0.28)", marginBottom: 14 },
  trailerBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "linear-gradient(135deg,#ef4444,#f97316)", border: "none",
    borderRadius: 50, padding: "9px 22px", fontSize: 13, fontWeight: 700,
    color: "#fff", cursor: "pointer", boxShadow: "0 4px 16px rgba(239,68,68,0.4)",
  },
  whyList: { fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 2 },
};
