import MovieCard from "./MovieCard";
import { MOODS } from "../data/moods";
import { timeLabel } from "../utils/helpers";

export default function ResultsScreen({ results, liked, toggleLike, expanded, setExpanded, selMoods, selGenres, hour, arc, setTrailer, reset }) {
  return (
    <div>
      <div style={styles.header}>
        <div>
          <h2 style={styles.h2}>Your Personalized Cinema 🎬</h2>
          <p style={styles.sub}>
            {selMoods.map(id => { const m = MOODS.find(x=>x.id===id); return `${m.emoji} ${m.label}`; }).join(" · ")}
            {selGenres.length > 0 ? " · " + selGenres.slice(0, 3).join(", ") + (selGenres.length > 3 ? ` +${selGenres.length - 3}` : "") : ""}
            {" · " + timeLabel(hour)}
          </p>
        </div>
        <button onClick={reset} style={styles.resetBtn}>↺ Start Over</button>
      </div>

      <div style={styles.list}>
        {results.map((movie, idx) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            idx={idx}
            expanded={expanded}
            setExpanded={setExpanded}
            liked={liked}
            toggleLike={toggleLike}
            arc={arc}
            selMoods={selMoods}
            selGenres={selGenres}
            setTrailer={setTrailer}
          />
        ))}
      </div>

      {/* Comparison footer */}
      <div style={styles.footer}>
        <div style={styles.footerTitle}>🧠 WHY MOODLENS BEATS EVERY OTHER SYSTEM</div>
        <div style={styles.compare}>
          <div>
            <div style={styles.compareHeadOld}>Traditional AI (Netflix / Spotify-style)</div>
            <div style={styles.compareBody}>
              ❌ Requires your watch history<br />
              ❌ Completely mood-blind<br />
              ❌ Ignores time of day<br />
              ❌ Cold-start failure for new users<br />
              ❌ Black box — no explanations
            </div>
          </div>
          <div>
            <div style={styles.compareHeadNew}>MoodLens</div>
            <div style={{ ...styles.compareBody, color: "rgba(255,255,255,0.65)" }}>
              ✅ Works from your very first session<br />
              ✅ Emotion is the primary signal (42%)<br />
              ✅ Time-of-day contextual scoring<br />
              ✅ Emotional journey arc design (24%)<br />
              ✅ Full transparent reasoning per pick
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 12 },
  h2: { fontSize: 30, fontWeight: 900, marginBottom: 4 },
  sub: { color: "rgba(255,255,255,0.36)", fontSize: 12, margin: 0 },
  resetBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "10px 22px", color: "rgba(255,255,255,0.65)", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" },
  list: { display: "flex", flexDirection: "column", gap: 12, marginTop: 24, marginBottom: 44 },
  footer: { background: "rgba(167,139,250,0.05)", borderRadius: 20, padding: "22px 24px", border: "1px solid rgba(167,139,250,0.11)" },
  footerTitle: { fontSize: 10, color: "#a78bfa", fontWeight: 700, letterSpacing: "1px", marginBottom: 14 },
  compare: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 },
  compareHeadOld: { color: "rgba(255,255,255,0.38)", fontWeight: 700, marginBottom: 6, fontSize: 12 },
  compareHeadNew: { color: "#a78bfa", fontWeight: 700, marginBottom: 6, fontSize: 12 },
  compareBody: { fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.9 },
};
