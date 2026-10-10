# Happy Anniversary My Cutie ❤️

> *"A whole year of us, a thousand memories, and one forever."*

A handcrafted, romantic luxury anniversary surprise website designed for **Cutie**, celebrating one full year together from **October 11, 2025 through October 11, 2026**.

Built with React, Vite, Lucide icons, and a **non-scrolling full-screen 3D "Crazy Motion" Stage Architecture**. Works 100% offline once loaded, requires zero backend or paid APIs, and is mobile-first for her phone.

---

## ✨ Features Included

1. **3D Crazy Motion Stage System (No Vertical Page Scrolling)**:
   - Fullscreen `100dvh` interactive stage deck with 3D perspective camera transitions.
   - Interactive 3D cards that dynamically tilt with mouse cursor and touch motion.
   - Floating glass HUD dock at bottom with active glowing indicator.
   - Floating 3D navigation arrows and full mobile touch swipe support.
   - Celebration particle explosions (floating hearts and sparkles) on button interactions.
   - "Hey Cutie ❤️" greeting with "365 Reasons, One Forever" headline.
   - Interactive 3D wax-sealed envelope that unfolds with gentle animations.
   - "Open My Heart 💌" button that begins the music and reveals the story.
2. **Persistent Floating Music Player**:
   - Location: `public/music/our-song.mp3`.
   - Play/pause, mute/unmute, audio equalizer bars, volume control, and graceful ambient harmonic chime fallback if the song file is not yet added.
3. **Our Year Together — Memory Timeline**:
   - **13 Monthly Chapters** covering October 2025 through October 2026 inclusive.
   - Polaroid-style framed photographs with captions and notes.
   - Elegant fallback illustrations if photos are not yet placed.
4. **All 365 Reasons I Love You**:
   - **Exactly 365 distinct, numbered reasons** (1 to 365) in `src/data/reasons.js`.
   - Spotlight Card view and Browse All 365 Grid view.
   - Real-time search by keyword or `#number`.
   - "Random Reason" generator and "Reveal Today's Reason" (offline algorithmic daily selection).
   - One-click copy with romantic toast notification.
   - Concludes with *"365 reasons, one person: you"*.
5. **My Love Letter**:
   - Vintage ivory paper aesthetic with burgundy handwriting and serif typography.
   - Fully customizable in `src/data/siteContent.js`.
6. **The Final Surprise**:
   - "Cutie, there's one last thing..." reveal button.
   - Glowing heart animation and celebratory sparkles.
   - Editable forever promise.
   - Replay button to re-experience the sealed envelope anytime.
7. **Accessibility & Luxury Polish**:
   - Reduced-motion accessibility toggle.
   - Responsive layouts for mobile phones, tablets, and desktop.
   - Custom glowing heart SVG favicon.

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL displayed in your terminal).

### 3. Verify the 365 Reasons
Run the automated verification suite to guarantee exactly 365 sequential, non-empty, unique reasons:
```bash
npm run verify-reasons
```

---

## 🎨 How to Personalize Your Website

All content is organized into clean, easy-to-edit central data files:

### 1. Add Your Background Song (MP3)
- Drop your favorite song file into:
  ```
  public/music/our-song.mp3
  ```
- **File Name**: It must be named exactly `our-song.mp3`.
- If you don't add the song yet, the player automatically plays gentle ambient chimes so the site never crashes.

### 2. Add Your Photos
Each of the 13 monthly chapters has its own folder in `public/images/memories/`:
- `public/images/memories/october-2025/`
- `public/images/memories/november-2025/`
- `public/images/memories/december-2025/`
- `public/images/memories/january-2026/`
- `public/images/memories/february-2026/`
- `public/images/memories/march-2026/`
- `public/images/memories/april-2026/`
- `public/images/memories/may-2026/`
- `public/images/memories/june-2026/`
- `public/images/memories/july-2026/`
- `public/images/memories/august-2026/`
- `public/images/memories/september-2026/`
- `public/images/memories/october-2026/`

For each month:
- Put your main large photo as `featured.jpg`.
- Put additional photos as `photo1.jpg`, `photo2.jpg`, etc.
- *Tip: If you don't add photos for some months yet, the website displays an elegant Polaroid placeholder asking to drop them in.*

### 3. Edit Timeline Captions & Memories
Open `src/data/memories.js`. You can edit:
- `heading`: Chapter title (e.g. *"The Beginning of Our Chapter"*).
- `date`: Specific dates (e.g. *"October 11, 2025"*).
- `caption`: Your personal note or memory summary.
- `notes`: Highlight notes or little stories from that month.
- Photo URLs & captions.

### 4. Edit or Replace the 365 Reasons
Open `src/data/reasons.js`.
The file contains an array of 365 items:
```javascript
export const reasons = [
  { id: 1, text: "The way your smile lights up even the greyest, gloomiest morning." },
  ...
  { id: 365, text: "Because you are my one, my only, my Cutie, and my forever love." }
];
```
You can edit any reason text, or paste your reasons directly. Just keep the `{ id, text }` structure and run `npm run verify-reasons` to verify.

### 5. Edit The Love Letter & Final Surprise
Open `src/data/siteContent.js`:
- `loveLetter`: Opening text, body paragraphs, and signature.
- `finalSurprise`: Revealed anniversary message and `promiseText`.

---

## 📦 Building For Production

To generate the optimized production files:
```bash
npm run build
```
This produces a static distribution in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 📱 How to Deploy for Her to Open on Her Phone (Free & Fast)

### Option A: Vercel (Easiest & Recommended)
1. Push this folder to a GitHub repository (can be private).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**. In under 1 minute, you'll receive a live link (e.g., `https://our-anniversary.vercel.app`) that you can send to Cutie!

### Option B: Netlify
1. Go to [netlify.com](https://netlify.com).
2. Drag and drop the `dist/` folder into the Netlify Drop zone, or connect your GitHub repository with build command `npm run build` and publish directory `dist`.
3. Set a custom romantic subdomain (e.g. `cutie-one-forever.netlify.app`).

### Option C: GitHub Pages
1. In `vite.config.js`, add `base: '/<repo-name>/'`.
2. Push to GitHub and enable GitHub Pages in repository settings under **Actions / Pages**.

---

## ❤️ Color Palette Reference
- **Deep Burgundy**: `#4B1025`
- **Wine Red**: `#721C38`
- **Blush Pink**: `#F4B8C8`
- **Warm Ivory**: `#FFF7F0`
- **Champagne Gold**: `#D9B56D`

*Happy First Anniversary to you and Cutie! Here’s to a whole lifetime of love.*
