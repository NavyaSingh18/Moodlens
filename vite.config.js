import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Moodlens/",
  build: {
    outDir: "dist",
  },
});
```

Then:
- Press **Ctrl + S** to save
- Close Notepad

---

## Now Push the Fix to GitHub

Type these one by one and press **Enter** after each:

**1.**
```
git add .
```

**2.**
```
git commit -m "Fix base path for GitHub Pages"
```

**3.**
```
git push