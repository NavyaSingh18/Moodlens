/**
 * MoodLens Scoring Engine
 * Weighted multi-feature relevance model
 */
export function computeScore(movie, selMoods, selGenres, hour, arc) {
  let score = 0;

  // Feature 1 — Mood similarity (42% weight) — highest priority
  const moodMatches = selMoods.filter(m => movie.mood.includes(m)).length;
  score += (moodMatches / Math.max(selMoods.length, 1)) * 42;

  // Feature 2 — Genre overlap (20% weight)
  const genreMatches = selGenres.filter(g => movie.genres.includes(g)).length;
  score += (genreMatches / Math.max(selGenres.length, 1)) * 20;

  // Feature 3 — Temporal context boost (7% weight)
  if (hour >= 22 || hour < 5) {
    if (movie.mood.some(m => ["intense","dark","tense","mind-bending"].includes(m))) score += 7;
  } else if (hour >= 6 && hour < 12) {
    if (movie.mood.some(m => ["fun","uplifting","heartwarming","quirky"].includes(m))) score += 7;
  } else {
    score += 3;
  }

  // Feature 4 — Quality signal / bias term (7% weight)
  score += ((movie.rating - 6) / 3.3) * 7;

  // Feature 5 — Emotional arc similarity (24% weight) — L1 distance in 2D emotional space
  if (arc) {
    const startDist = Math.abs(movie.arc.start - arc.start);
    const endDist   = Math.abs(movie.arc.end   - arc.end);
    score += Math.max(0, 24 - (startDist + endDist) / 8);
  }

  return Math.min(Math.round(score), 100);
}
