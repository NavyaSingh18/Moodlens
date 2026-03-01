import { useState } from "react";
import { MOODS, ALL_GENRES } from "./data/moods";
import { computeScore } from "./utils/scoring";
import { timeLabel } from "./utils/helpers";
import WelcomeScreen  from "./components/WelcomeScreen";
import MoodStep       from "./components/MoodStep";
import GenreStep      from "./components/GenreStep";
import TimeStep       from "./components/TimeStep";
import ArcStep        from "./components/ArcStep";
import ResultsScreen  from "./components/ResultsScreen";
import Header         from "./components/Header";
import { MOVIES }     from "./data/movies";

export default function App() {
  const [step,      setStep]     = useState(0);
  const [selMoods,  setSelMoods] = useState([]);
  const [selGenres, setSelGenres]= useState([]);
  const [hour,      setHour]     = useState(new Date().getHours());
  const [arc,       setArc]      = useState({ start: 50, end: 50 });
  const [results,   setResults]  = useState([]);
  const [liked,     setLiked]    = useState({});
  const [expanded,  setExpanded] = useState(null);
  const [trailer,   setTrailer]  = useState(null);

  const toggleMood  = (m) => setSelMoods(p  => p.includes(m) ? p.filter(x=>x!==m) : [...p,m]);
  const toggleGenre = (g) => setSelGenres(p => p.includes(g) ? p.filter(x=>x!==g) : [...p,g]);
  const toggleLike  = (id) => setLiked(p => ({ ...p, [id]: !p[id] }));

  const generate = () => {
    const scored = MOVIES
      .map(m => ({ ...m, score: computeScore(m, selMoods, selGenres, hour, arc) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
    setResults(scored);
    setExpanded(null);
    setStep(5);
  };

  const reset = () => {
    setStep(0); setSelMoods([]); setSelGenres([]);
    setLiked({}); setExpanded(null); setTrailer(null);
    setHour(new Date().getHours());
    setArc({ start: 50, end: 50 });
  };

  const sharedProps = { step, setStep, selMoods, toggleMood, selGenres, toggleGenre,
    hour, setHour, arc, setArc, results, liked, toggleLike,
    expanded, setExpanded, trailer, setTrailer, generate, reset };

  return (
    <div style={styles.page}>
      <Header step={step} hour={hour} />

      {step > 0 && step < 5 && (
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${(step / 4) * 100}%` }} />
        </div>
      )}

      <main style={styles.main}>
        {step === 0 && <WelcomeScreen  {...sharedProps} />}
        {step === 1 && <MoodStep       {...sharedProps} />}
        {step === 2 && <GenreStep      {...sharedProps} />}
        {step === 3 && <TimeStep       {...sharedProps} />}
        {step === 4 && <ArcStep        {...sharedProps} />}
        {step === 5 && <ResultsScreen  {...sharedProps} />}
      </main>

      {/* Trailer Modal */}
      {trailer && (
        <div style={styles.modalOverlay} onClick={() => setTrailer(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setTrailer(null)}>✕</button>
            <div style={styles.iframeWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={styles.iframe}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0d0920 0%,#110d30 45%,#091525 100%)",
    fontFamily: "'Segoe UI',system-ui,sans-serif",
    color: "#fff",
  },
  progressBar: { height: 2, background: "rgba(255,255,255,0.05)" },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#a78bfa,#f472b6)",
    transition: "width 0.5s ease",
  },
  main: { maxWidth: 960, margin: "0 auto", padding: "40px 20px" },
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, backdropFilter: "blur(8px)",
  },
  modalBox: {
    background: "#1a1030", borderRadius: 20,
    padding: 20, width: "min(860px, 95vw)", position: "relative",
    border: "1px solid rgba(167,139,250,0.25)",
  },
  modalClose: {
    position: "absolute", top: 12, right: 14, background: "rgba(255,255,255,0.1)",
    border: "none", color: "#fff", fontSize: 16, width: 32, height: 32,
    borderRadius: "50%", cursor: "pointer", zIndex: 10,
  },
  iframeWrap: { position: "relative", paddingBottom: "56.25%", height: 0 },
  iframe: { position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 12, border: "none" },
};
