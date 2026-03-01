# 🎬 MoodLens — Emotion-Aware Movie Recommender

> The world's first recommendation system that lets you design your **emotional journey** — not just what genre you like, but how you want to *feel* from opening scene to credits.

![MoodLens](https://img.shields.io/badge/MoodLens-v1.0-a78bfa?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)

## ✨ Features

| Feature | Description |
|---|---|
| 🎭 **14 Moods** | From mind-bending to melancholic — your emotion drives 42% of the score |
| 🎞️ **25 Genres** | Searchable genre palette with 25 categories |
| 🎬 **50 Movies** | Curated catalog with summaries and trailers |
| 🎨 **Emotional Arc** | World-first: drag a curve to design how you want to feel start-to-finish |
| ⏰ **Time-Aware** | Late-night vs morning picks adapt automatically |
| ▶️ **Trailers** | Watch YouTube trailers in-app without leaving |
| 🔍 **Transparent** | Every recommendation shows exactly why it was chosen |

## 🚀 Live Demo

👉 **[Open MoodLens](https://YOUR-USERNAME.github.io/moodlens)**

## 🛠️ Run Locally

```bash
git clone https://github.com/YOUR-USERNAME/moodlens.git
cd moodlens
npm install
npm run dev
```

Open `http://localhost:5173`

## 🌐 Deploy to GitHub Pages (Free Public Link)

### One-time setup:
1. Push this repo to GitHub
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Every push to `main` auto-deploys → your link: `https://YOUR-USERNAME.github.io/moodlens`

## 🧠 How the ML Scoring Works

```
Score = 0.42 × mood_similarity
      + 0.20 × genre_overlap
      + 0.07 × time_context_boost
      + 0.07 × quality_signal (IMDb)
      + 0.24 × emotional_arc_distance
```

- **Mood similarity** — ratio of selected moods matching movie tags
- **Genre overlap** — Jaccard similarity on genre sets  
- **Temporal boost** — contextual bandit-style time-of-day adaptation
- **Arc distance** — L1 (Manhattan) distance in 2D emotional space (novel feature)

## 📁 Project Structure

```
moodlens/
├── src/
│   ├── App.jsx                  # Root component, state, trailer modal
│   ├── main.jsx                 # React entry point
│   ├── data/
│   │   ├── movies.js            # 50-movie catalog with trailer keys
│   │   └── moods.js             # 14 moods + 25 genre definitions
│   ├── utils/
│   │   ├── scoring.js           # ML scoring engine
│   │   └── helpers.js           # Pure utility functions
│   └── components/
│       ├── Header.jsx           # Sticky nav with step indicator
│       ├── WelcomeScreen.jsx    # Landing page
│       ├── MoodStep.jsx         # Step 1 — mood selection hero
│       ├── GenreStep.jsx        # Step 2 — genre picker with search
│       ├── TimeStep.jsx         # Step 3 — time-of-day slider
│       ├── ArcStep.jsx          # Step 4 — emotional arc canvas
│       ├── MovieCard.jsx        # Result card with trailer button
│       └── ResultsScreen.jsx    # Results list + comparison footer
├── .github/workflows/deploy.yml # Auto-deploy to GitHub Pages
├── index.html
├── vite.config.js
└── package.json
```

## 📄 License

MIT — free to use, fork, and extend.
