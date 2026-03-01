export function timeLabel(h) {
  if (h >= 5  && h < 12) return "🌅 Morning";
  if (h >= 12 && h < 17) return "☀️ Afternoon";
  if (h >= 17 && h < 21) return "🌆 Evening";
  return "🌙 Late Night";
}

export function yToEmotion(y) {
  if (y <= 14) return "Euphoric";
  if (y <= 28) return "Excited";
  if (y <= 44) return "Engaged";
  if (y <= 60) return "Neutral";
  if (y <= 78) return "Melancholy";
  return "Devastated";
}

export function arcDirectionLabel(arc) {
  if (arc.end < arc.start - 10) return "Uplifting trajectory";
  if (arc.end > arc.start + 10) return "Intensifying / darkening";
  return "Steady emotional tone";
}
