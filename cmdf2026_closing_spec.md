# cmd-f 2026 Closing Ceremony — HTML Presentation Build Spec
**Version:** Final  
**Deliverable:** One fully self-contained `.html` file. No external dependencies. No CDN. No frameworks.  
**Slide count:** 30 slides  
**Duration:** ~75 minutes (Closing Ceremony: 4:00 PM – 5:30 PM PDT, March 8, 2026)  
**Companion file:** `cmdf2026_spec.md` (Opening Ceremony) — the design system defined there applies **identically** here. Do not re-define CSS variables, glass card system, animation keyframes, or typography. Import or copy that system verbatim and build on top of it.

---

## PART 0: RELATIONSHIP TO OPENING SPEC

This spec is a **companion**, not a standalone. Everything in Parts 1–5 of `cmdf2026_spec.md` applies here unchanged:

- Same CSS variables (`--navy`, `--crimson`, `--sky`, `--grass-top`, `--glass-bg`, etc.)
- Same glass card variants (`.glass-card--hero`, `.glass-card--content`, `.glass-card--accent`, `.glass-card--pill`)
- Same 4 gradient combinations (Wonderland Dusk, Sky Bloom, Golden Hour, Deep Rabbit Hole)
- Same typography scale (hero 96–120px → body 20–24px → label 12–13px)
- Same animation keyframes (`slideEnter`, `slideExit`, `cardReveal`, `float`, `shimmer`)
- Same navigation chrome (progress bar, slide counter, nav dots, notes drawer, keyboard shortcuts)
- Same background images: `IMG_BG1`, `IMG_BG2`, `IMG_BG3` from `bg_assets.js`
- Same safe content zone (never below 72% viewport height)

**What differs:**
- Slide count: 30 (not 40)
- Title slide uses `IMG_CLOSING` (see Part 1 below) instead of `IMG_OPENING`
- Emotional arc: celebratory → reflective → triumphant, not logistical
- No logistics slides (wifi, QR, CoC etc.) — the audience already knows all of this
- Heavier use of Gold and Crimson accents (celebration energy)
- More `callout` and `stat-grid` layouts, fewer `timeline` layouts
- The counter shows `X / 30` not `X / 40`

---

## PART 1: CLOSING TITLE ASSET

### ⚠️ Action Required Before Build
The `opening.png` was provided as a base64 asset. **A `closing.png` was NOT provided.**

**Option A (preferred):** Export the "closing" frame from the Figma file:
- File: `https://www.figma.com/design/pqeACtMy8SWqmboZtTT86v/Opening-Ceremony`
- Node ID: `1:1209` (the frame named "closing")
- Export at 1920×1080 PNG, name it `closing.png`
- Encode to base64 and add to `bg_assets.js` as `IMG_CLOSING`

**Option B (CSS fallback if closing.png isn't ready):**
Use `IMG_BG1` as title slide background and overlay a styled text block:
```css
.slide-title-closing {
  background-image: var(--bg1-url);
}
.closing-title-overlay {
  text-align: center;
}
.closing-title-overlay .label {
  font-size: 22px; font-weight: 600;
  color: var(--navy); letter-spacing: 0.08em;
  margin-bottom: 12px;
}
.closing-title-overlay .main-title {
  font-size: 96px; font-weight: 800;
  color: var(--crimson); /* #B4143C */
  line-height: 1.05;
}
.closing-title-overlay .date-ribbon {
  display: inline-block;
  background: rgba(222, 234, 250, 0.9);
  border-radius: 100px;
  padding: 10px 32px;
  font-size: 26px; font-weight: 700;
  color: var(--navy);
  margin-top: 20px;
}
```
Overlay content:
- Label: "cmd-f 2026"
- Main title: "Closing Ceremony"
- Ribbon: "March 8, 2026"

---

## PART 2: CLOSING CEREMONY EMOTIONAL ARC

The opening ceremony is logistical and hype-building. The closing is **emotional payoff**.

Structure in three acts:
1. **Act 1 — Reflection** (slides 1–6): You made it. Here's what happened. A love letter to the weekend.
2. **Act 2 — Recognition** (slides 7–20): Raffle. Sponsor prizes. Finalist demos. The big winner.
3. **Act 3 — Gratitude & Goodbye** (slides 21–30): Thank everyone. Send them off feeling something.

Tone calibration per act:
- Act 1: Warm, a little emotional, nostalgic already even though it just happened
- Act 2: High energy, excitement, genuine celebration — this is the climax
- Act 3: Tender, sincere, Gen Z-genuine (not corporate). End on something they'll remember.

---

## PART 3: BACKGROUND ASSIGNMENT

```
Slide 1   → IMG_CLOSING (or CSS fallback — see Part 1)
Slides 2–6   → BG2, BG3, BG1, BG2, BG3   (Act 1 — soft, contemplative)
Slides 7–10  → BG1, BG2, BG3, BG1         (Raffle + sponsor prize intro)
Slides 11–16 → rotate BG2, BG3, BG1       (Sponsor prize announcements)
Slides 17–20 → BG2, BG3, BG1, BG2         (Finalist demos + deliberation)
Slides 21–23 → BG3, BG1, BG2              (Winners)
Slides 24–30 → BG3, BG1, BG2, BG3, BG1, BG2, BG3  (Thank yous + goodbye)
```

---

## PART 4: SLIDE DEFINITIONS

Each entry: `id`, `bg`, `layout`, `title`, `body`, `emoji`, `accent`, `notes`

Layout types inherited from Opening spec:
`title-hero` · `centered-single` · `split-left` · `split-right` · `two-col` · `three-col` · `list-card` · `stat-grid` · `full-card` · `callout` · `timeline`

**New layout for this deck:**
- `winner-reveal` — dark glass overlay, large centered announcement text, confetti CSS animation on entry
- `finalist-demo` — left card with project info, right side open space for presenter

---

### SLIDE 1 — Closing Title (Layout: title-hero)
**BG:** IMG_CLOSING (or CSS fallback — see Part 1)  
**Note:** If using exported PNG, render fullscreen with no glass cards, identical to Opening slide 1.  
If using CSS fallback, render the `.closing-title-overlay` centered over BG1.  
**Floating elements:** 🎉 (top-left, float), ✨ (top-right, float), 🏆 (bottom-center, float — larger, 48px)  
**Speaker notes:** Let the room fill and settle. You've all been through a lot. Take a breath. Welcome them back.

---

### SLIDE 2 — You Made It (Layout: callout)
**BG:** BG2  
**Giant emoji:** 🥺  
**Title:** you actually did it.  
**Body:** Whether you shipped a polished product, a chaotic prototype, or you just made it to Sunday —  
you showed up. And that is genuinely the whole point.  
Thank you for being in Wonderland with us this weekend. 💛  
**Floating extras:** 💙 🌸 🪄 (soft, staggered)  
**Animation:** Body text fades in 400ms after title, split into two lines with separate delays  
**Speaker notes:** Pause after "you showed up." Look at the room. Mean it.

---

### SLIDE 3 — By the Numbers (Layout: stat-grid)
**BG:** BG3  
**Title:** cmd-f 2026, by the numbers 📊  
**Six stat cards (icon + big number + label):**  
- 🐇 **170+** hackers
- 🍕 **5** Wonderland-themed meals
- 💻 **[N]** projects submitted ← fill in day-of from Devpost
- 🎓 **6+** workshops hosted
- 🧋 **∞** bubble teas at midnight (approximately)
- 🪄 **1** unforgettable weekend

**Animation:** Cards count up (number animates from 0 to final value over 800ms, staggered)  
**Speaker notes:** Get the actual project count from Devpost before ceremony. The crowd loves a real number.

---

### SLIDE 4 — Weekend Recap (Layout: three-col)
**BG:** BG1  
**Title:** things that happened this weekend 🎪  
**Three cards, each with emoji header:**  
🍽️ **Ate well**  
Mad Hatter's Pizza Party · Queen of Hearts' Poké Garden · Unbirthday Tea Party · White Rabbit's Morning Dash · Looking Glass Luncheon  

🎨 **Got creative**  
Tote Bag Painting · Doodle Pop-Up · Ping Pong · Late Night Activity  

💬 **Learned stuff**  
Branding · Tea Party Networking · GitHub · Recruiting Panel · Deployment · AI Prototyping  

**Speaker notes:** Read the food names with full enthusiasm. They deserve it.

---

### SLIDE 5 — 24 Hours (Layout: split-left)
**BG:** BG2  
**Title:** 24 hours. (well, technically.) ⏰  
**Body:**  
You started with an idea (or no idea — that's also valid) and you ended with something you built with your own hands.  

That's not nothing. That's actually everything.  

We watched you debug at 3 AM. Google at 4 AM. Present at 1 PM.  
You did that. 🫶  
**Right side floats:** 💻 🐞 ☕ 🌙 (staggered float animations, soft)  
**Speaker notes:** If you have a real moment or memory from the weekend, drop it here. Makes it feel real.

---

### SLIDE 6 — A Note from FG & Anna (Layout: centered-single)
**BG:** BG3  
**Title:** a note from FG & Anna 💌  
**Body (large quote card, glass-card--hero style):**  
"The best kind of magic is the kind you make yourself."  

Watching 170+ brilliant people spend their entire weekend building, learning, and lifting each other up — that IS the magic.  

We're so proud to have been your Wonderland this year. 🪄  
**Style:** Quote in italics, 26px. Attribution "— FG & Anna, cmd-f 2026" in 16px navy 70%.  
**Bottom glow element:** Soft gold shimmer strip under the card  
**Speaker notes:** Read this one slowly. This is the emotional peak of Act 1 before things get celebratory.

---

### SLIDE 7 — Raffle Setup (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🎟️  
**Title:** RAFFLE TIME. let's go.  
**Body:**  
All that stamp collecting has led to this exact moment.  
1 stamp = 1 raffle entry. More stamps = better odds.  
⚠️ You must be present to claim your prize.  
If we call your name and you're not here... we move on. Sorry, not sorry.  
**Prize badge (gold gradient pill):** Xbox controllers · Speakers · More 👀  
**Animation on entry:** The giant 🎟️ bounces with a scale keyframe (1 → 1.2 → 0.9 → 1.05 → 1) over 600ms  
**Speaker notes:** Build the energy. This is the crowd-warm-up before prizes.

---

### SLIDE 8 — Raffle Drawing (Layout: winner-reveal)
**BG:** BG1  
**Layout: winner-reveal** — Semi-dark glass overlay (rgba navy 0.25) fullscreen, centered text  
**Title (large, crimson):** and the winner is...  
**Subtext:** [ Draw winner(s) here — announce live ]  

**After announcing winner, advance to next slide:**

---

### SLIDE 9 — Raffle Winner (Layout: winner-reveal)
**BG:** BG1  
**Winner reveal layout with CSS confetti:**  
**Title (gold gradient text, 80px):** 🎉 CONGRATULATIONS!! 🎉  
**Body:** [ Winner name(s) ]  
Please come see an organizer to claim your prize! 🏆  

**CSS Confetti animation** (no JS library — pure CSS):
```css
@keyframes confettiFall {
  0%   { transform: translateY(-100vh) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(110vh)  rotate(720deg); opacity: 0; }
}
.confetti-piece {
  position: fixed; top: 0; width: 8px; height: 16px;
  border-radius: 2px; pointer-events: none;
  animation: confettiFall linear forwards;
}
/* Generate 40 pieces with varied left%, colors, durations (1.5s–3s), delays (0s–1s) */
/* Colors: #FFD93D, #FF6B6B, #4ECDC4, #A78BFA, #B4143C, #1A3786 */
```
Generate 40 `.confetti-piece` divs in HTML, each with inline `style` for `left`, `animation-duration`, `animation-delay`, `background-color`, `transform: rotate(Ndeg)`. Activate confetti only when this slide is `.active`.

**Speaker notes:** The confetti triggers automatically on slide entry — no interaction needed.

---

### SLIDE 10 — Sponsor Prizes Intro (Layout: callout)
**BG:** BG2  
**Giant emoji:** 🏆  
**Title:** and now — sponsor prizes.  
**Body:**  
This is the part where the hackers who went above and beyond get their flowers. 🌸  

Sponsor reps will now come up to announce their prize winners.  

Please give a massive round of applause for every single person who submitted a project. All of you. 💛  
**Speaker notes:** Pause for genuine applause. Look at the hackers, not the screen.

---

### SLIDE 11 — 1Password Prize (Layout: split-right)
**BG:** BG3  
**Left side (large glass card):**  
**Badge pill (Deep Rabbit Hole gradient):** 🔐 1PASSWORD  
**Prize:** Best Security Hack  
$100 CAD Best Buy gift card  
\+ 1 free year of 1Password  
\+ recruiter chat opportunity  
*(per team member)*  

**Right side (open — sponsor rep area):**  
Small label: "Presented by 1Password" in a ghost pill  

**Bottom strip:** "And the winner is..." in 32px italic navy  
**Speaker notes:** Invite 1Password rep to the stage/mic before advancing.

---

### SLIDE 12 — 1Password Winner (Layout: winner-reveal)
**BG:** BG3  
**Title:** 🔐 1Password Winner  
**Body:** [ Team name + project name ]  
**Confetti:** YES — same confetti system as slide 9, activate on `.active`  
**Speaker notes:** Rep announces winner. Advance when done.

---

### SLIDE 13 — ElevenLabs Prize (Layout: split-right)
**BG:** BG1  
**Badge pill (Wonderland Dusk gradient):** 🎙️ ELEVENLABS  
**Prize:** Best Use of ElevenLabs  
3 months ElevenLabs Scale Tier  
($990 value, per team member)  
**Bottom strip:** "And the winner is..."  
**Speaker notes:** Invite ElevenLabs rep.

---

### SLIDE 14 — ElevenLabs Winner (Layout: winner-reveal)
**BG:** BG1  
**Title:** 🎙️ ElevenLabs Winner  
**Body:** [ Team name + project name ]  
**Confetti:** YES  

---

### SLIDE 15 — Lovable Prize (Layout: split-right)
**BG:** BG2  
**Badge pill (Sky Bloom gradient):** 💜 LOVABLE  
**Prize:** Best Use of Lovable  
3 months Lovable Pro  
100 credits/month per team member  
**Bottom strip:** "And the winner is..."  
**Speaker notes:** Invite Lovable rep.

---

### SLIDE 16 — Lovable Winner (Layout: winner-reveal)
**BG:** BG2  
**Title:** 💜 Lovable Winner  
**Body:** [ Team name + project name ]  
**Confetti:** YES  

---

### SLIDE 17 — PCCA Prize (Layout: split-right)
**BG:** BG3  
**Badge pill (Golden Hour gradient):** 🌿 PCCA  
**Prize:** Best Wellness-Related Hack  
$325 for the winning team  
**Bottom strip:** "And the winner is..."  
**Speaker notes:** Invite PCCA rep.

---

### SLIDE 18 — PCCA Winner (Layout: winner-reveal)
**BG:** BG3  
**Title:** 🌿 PCCA Winner  
**Body:** [ Team name + project name ]  
**Confetti:** YES  

---

### SLIDE 19 — Additional Sponsor Prizes (Layout: split-right)
**BG:** BG1  
**Note:** Duplicate slides 11–18 pattern for any additional sponsor prizes added day-of.  
This slide is a **template placeholder**:  
**Badge pill:** [ SPONSOR NAME ]  
**Prize:** [ Prize description ]  
**Bottom strip:** "And the winner is..."  
**Speaker notes:** Remove this slide if no additional prizes. Duplicate + fill in if there are more.

---

### SLIDE 20 — Finalist Demo Intro (Layout: callout)
**BG:** BG2  
**Giant emoji:** 🎤  
**Title:** okay. now for the main event.  
**Body:**  
Our judges reviewed every single project submitted this weekend.  
Three teams were selected to demo live, right now, in front of all of you.  

5-minute pitch. 2-minute Q&A each.  

Please give all three finalist teams an enormous round of applause. 👏  
**Animation:** Body lines fade in one at a time, 200ms stagger  
**Speaker notes:** Build the energy. Pause before "enormous round of applause" — give them a beat to actually clap.

---

### SLIDE 21 — Finalist #1 Demo (Layout: finalist-demo)
**BG:** BG3  

**Layout: finalist-demo** — Two zones:  
**Left zone (glass card, ~55% width):**  
Large badge: 🌟 FINALIST #1  
**Team Name** (40px bold navy)  
**Project Name** (28px crimson)  
[ One-line description ] (20px navy 75%)  
Small separator line  
"Presenting now..." (16px italic gold)  

**Right zone (~45% width):** Intentionally open / minimal — the presenter stands here.  
Only a soft glow circle (radial gradient, rgba white 0.06, 300px diameter) centered in this zone.  

**Floating elements:** ⭐ (top of right zone, gentle float)  
**Speaker notes:** Read out team name + project name before they begin. Step aside.

---

### SLIDE 22 — Finalist #2 Demo (Layout: finalist-demo)
**BG:** BG1  
Same layout as Slide 21.  
Badge: 🌟 FINALIST #2  
[ Fill in team name, project name, description day-of ]  
**Speaker notes:** Same as above.

---

### SLIDE 23 — Finalist #3 Demo (Layout: finalist-demo)
**BG:** BG2  
Same layout as Slide 21.  
Badge: 🌟 FINALIST #3  
[ Fill in ]  
**Speaker notes:** After this one, explicitly tell the audience judges are deliberating.

---

### SLIDE 24 — Deliberation (Layout: centered-single)
**BG:** BG3  
**Title:** ⏳ judges are deliberating...  
**Body (glass-card--content, centered):**  
Our panel of judges are having a Very Serious Discussion right now.  

While we wait — one more enormous round of applause for ALL of our finalists?  

Building something real in 24 hours is genuinely hard. These teams did it. 👏  
**Continuous animation:** Subtle pulsing glow behind the glass card (scale 1 → 1.02 → 1, 2s loop)  
**Floating:** ⏳ (top right, gentle rotation animation instead of float — `rotate(0deg) → rotate(360deg)`, 8s loop)  
**Speaker notes:** Fill time here. Talk about a project that stood out. Compliment the audience. Keep energy warm.

---

### SLIDE 25 — Moment of Truth (Layout: winner-reveal)
**BG:** BG1  
**Semi-dark overlay, no confetti yet**  
**Title (80px, navy, centered):** 🥁 the moment of truth.  
**Body (32px italic, crimson):** And the winner of cmd-f 2026 is...  
**Animation on entry:** Title slides in from top, body fades in 600ms later  
**Speaker notes:** Pause for maximum drama. Look at the audience. Make them wait. Then advance.

---

### SLIDE 26 — WINNER (Layout: winner-reveal + confetti)
**BG:** BG1  
**Full confetti system active on `.active`**  
**Giant text (gold gradient, 96px, bold):** 🏆 WINNER!! 🏆  
**Team name (80px, crimson):** [ Team Name ]  
**Project name (40px, navy):** [ Project Name ]  
**Body (24px):** Congratulations!!! 🎉🎉🎉  
You built something incredible. Take a very deserved bow. 🙇  

**Special animation:** The 🏆 emoji starts small (scale 0) and springs to full size with an overshoot bounce:
```css
@keyframes trophyReveal {
  0%   { transform: scale(0) rotate(-15deg); }
  60%  { transform: scale(1.2) rotate(5deg); }
  80%  { transform: scale(0.95) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); }
}
```
Duration: 700ms, ease.  
**Speaker notes:** Let this breathe. Clap. Look at the winners.

---

### SLIDE 27 — Honourable Mentions (Layout: list-card)
**BG:** BG2  
**Title:** 🌟 Honourable Mentions  
**Body (staggered reveal, one per line):**  
[ Team 1 — Project Name ]  
[ Team 2 — Project Name ]  
*(Add/remove as needed day-of)*  

**Bottom callout pill (lavender):** Honourable mentions are a real achievement. The judges stopped and paid attention. That matters. 💛  
**Notes:** Fill in day-of from judge deliberation results. Can be 0–3 teams.

---

### SLIDE 28 — Thank You: Mentors, Volunteers, Sponsors (Layout: three-col)
**BG:** BG3  
**Title:** thank you. genuinely. 🙏  
**Three cards:**  

🎩 **Mentors**  
You debugged. You encouraged. You answered questions at 2 AM without complaint.  
You made cmd-f possible in ways that don't always get enough credit. 💙  

💛 **Volunteers**  
You scanned QR codes. Herded cats. Carried boxes at 6 AM. Hyped up hackers at 11 PM.  
You didn't have to. You did it anyway. That's everything. 🧡  

🌹 **Sponsors**  
1Password · Centre for Digital Media · CSE · GitHub · BCIT SA · Smart Cohort · Paraform · UBC SAC · Toolhouse AI · Microsoft · ElevenLabs · Lovable · PCCA · Steve's Poké · Koerner's Pub · Barry's · Spin Society · Reviva · Bon Macaron · Limegee · IdeaMatch · Minuteman Press  

**Notes:** Read through slowly. Gesture to people in the room.

---

### SLIDE 29 — Stay Connected (Layout: split-left)
**BG:** BG1  
**Title:** before you go 📱  
**Left glass card:**  
📸 Tag your project + us: **#cmdf2026**  
Instagram → @nwplusubc  
LinkedIn → @nwplus  
Facebook → nwplusubc  
YouTube → @nwPlusUBC  
linktr.ee/nwplusubc  
**Right callout card (accent, mint border):**  
📝 **Please fill out the feedback form.**  
It genuinely helps us make next year better. 🙏  
Link in Discord.  
**Floating:** 📱 (left zone, gentle float)  
**Notes:** The feedback form is IMPORTANT. Don't skip this ask.

---

### SLIDE 30 — Goodbye (Layout: callout)
**BG:** BG2 — or BG1 for variety  
**Giant emoji:** 🐇  
**Title (96px, crimson):** until next time.  
**Body:**  
"The best kind of magic is the kind you make yourself."  

You made it. You built something. You belong here.  
See you in the rabbit hole again soon. 💛  

**Attribution line (20px italic navy 60%):** — cmd-f 2026 · nwPlus · #cmdf2026  

**Final animation sequence** (triggers on slide entry, staggered):  
1. BG image fades in (400ms)  
2. Rabbit emoji drops from above, bounces to final position (600ms, `cubic-bezier(0.34,1.56,0.64,1)` spring)  
3. Title slides up (500ms, 200ms delay)  
4. Quote block fades in (400ms, 500ms delay)  
5. Attribution fades in (300ms, 800ms delay)  
6. Floating 🪄✨💛 appear last and begin their loop  

**Speaker notes:** Close your laptop after this slide is showing. Step away from the screen. Look at your hackers. Say goodbye to them, not to a slide.

---

## PART 5: CONFETTI SYSTEM (FULL SPEC)

Used on slides 9, 12, 14, 16, 18, 26. Must activate ONLY when slide is `.active` and deactivate when it leaves.

```html
<!-- Add inside each winner-reveal slide that needs confetti -->
<div class="confetti-container" aria-hidden="true">
  <!-- 40 pieces generated by JS or hardcoded HTML below -->
</div>
```

```css
.confetti-container {
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  pointer-events: none; overflow: hidden;
  z-index: 500; /* above BG, below glass cards */
}

/* Default hidden — only runs when parent slide is .active */
.slide:not(.active) .confetti-container { display: none; }

@keyframes confettiFall {
  0%   { transform: translateY(-10vh) rotate(var(--rot-start)); opacity: 1; }
  100% { transform: translateY(110vh) rotate(var(--rot-end));   opacity: 0; }
}

.confetti-piece {
  position: absolute;
  top: -20px;
  width: var(--w, 8px);
  height: var(--h, 16px);
  border-radius: var(--r, 2px);
  background-color: var(--color);
  animation: confettiFall var(--dur) linear var(--delay) forwards;
  --rot-start: 0deg;
  --rot-end: 720deg;
}
```

```javascript
// Generate confetti pieces programmatically (call once per winner slide on init)
function createConfetti(container) {
  const colors = ['#FFD93D','#FF6B6B','#4ECDC4','#A78BFA','#B4143C','#1A3786','#80CD7D'];
  const shapes = [
    { w: '8px',  h: '16px', r: '2px'   },  // rectangle
    { w: '10px', h: '10px', r: '50%'   },  // circle
    { w: '12px', h: '6px',  r: '1px'   },  // wide rect
    { w: '6px',  h: '18px', r: '3px'   },  // tall rect
  ];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    el.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    el.style.setProperty('--w', shape.w);
    el.style.setProperty('--h', shape.h);
    el.style.setProperty('--r', shape.r);
    el.style.setProperty('--dur', (1.5 + Math.random() * 2).toFixed(2) + 's');
    el.style.setProperty('--delay', (Math.random() * 0.8).toFixed(2) + 's');
    el.style.setProperty('--rot-start', Math.floor(Math.random() * 360) + 'deg');
    el.style.setProperty('--rot-end', (Math.floor(Math.random() * 4) + 2) * 360 + 'deg');
    el.style.left = Math.random() * 100 + 'vw';
    container.appendChild(el);
  }
}
```

---

## PART 6: WINNER-REVEAL LAYOUT SPEC

```css
.layout-winner-reveal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* Semi-dark glass overlay for drama */
  background: rgba(26, 55, 134, 0.12);
  backdrop-filter: blur(4px);
  position: relative;
  padding: 60px;
}

.winner-reveal__title {
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 800;
  line-height: 1.1;
  /* Gold gradient text */
  background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.winner-reveal__team {
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  color: #B4143C;
  margin-bottom: 8px;
}

.winner-reveal__project {
  font-size: clamp(22px, 3.5vw, 40px);
  font-weight: 500;
  color: #1A3786;
  opacity: 0.8;
  margin-bottom: 24px;
}

.winner-reveal__body {
  font-size: 22px;
  color: #1A3786;
  opacity: 0.75;
  max-width: 600px;
}
```

---

## PART 7: FINALIST-DEMO LAYOUT SPEC

```css
.layout-finalist-demo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  padding: 60px 80px;
  width: 100%;
  height: 100%;
}

.finalist-demo__card {
  /* Inherits glass-card--content */
  flex: 0 0 52%;
  padding: 48px 52px;
}

.finalist-demo__badge {
  display: inline-block;
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 8px 20px; border-radius: 100px;
  background: linear-gradient(135deg, #FFD93D, #FF6B6B);
  color: #1A3786;
  margin-bottom: 24px;
}

.finalist-demo__team {
  font-size: 44px; font-weight: 800; color: #1A3786;
  margin-bottom: 8px;
}

.finalist-demo__project {
  font-size: 30px; font-weight: 600; color: #B4143C;
  margin-bottom: 12px;
}

.finalist-demo__desc {
  font-size: 20px; color: #1A3786; opacity: 0.75;
  margin-bottom: 32px;
}

.finalist-demo__presenting {
  font-size: 18px; font-style: italic;
  color: #FFD93D;
}

/* Open right zone — presenter stands here */
.finalist-demo__stage {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}

.finalist-demo__glow {
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50%       { transform: scale(1.08); opacity: 1; }
}
```

---

## PART 8: SPEAKER NOTES (all 30 slides)

```javascript
const speakerNotes = [
  /* 01 */ "Let the room fill and settle. Deep breath. You've all been through a lot. Welcome them back warmly.",
  /* 02 */ "Pause after 'you showed up.' Look at the room. Mean every word of this one.",
  /* 03 */ "Get the REAL project count from Devpost before ceremony. That number matters to people.",
  /* 04 */ "Read the food names with full enthusiasm. 'Unbirthday Tea Party at midnight' deserves a dramatic voice.",
  /* 05 */ "If you have a specific memory from watching hackers struggle-then-succeed, drop it here.",
  /* 06 */ "Slow down. This is the emotional beat before celebration. Read the quote like you mean it.",
  /* 07 */ "Build energy. Get people excited. This is your warm-up act before prizes.",
  /* 08 */ "Draw winner(s) dramatically. Make them stand up. Make the room cheer.",
  /* 09 */ "Let the confetti breathe. Don't rush to the next slide.",
  /* 10 */ "Pause for genuine applause for everyone who submitted. Look at the hackers, not the screen.",
  /* 11 */ "Invite 1Password rep to stage BEFORE advancing to this slide.",
  /* 12 */ "Rep announces. Confetti goes. Cheer loudly.",
  /* 13 */ "Invite ElevenLabs rep.",
  /* 14 */ "Confetti. Cheer.",
  /* 15 */ "Invite Lovable rep.",
  /* 16 */ "Confetti. Cheer.",
  /* 17 */ "Invite PCCA rep.",
  /* 18 */ "Confetti. Cheer.",
  /* 19 */ "REMOVE this slide if no additional prizes. Duplicate for each additional prize.",
  /* 20 */ "Build real hype. Pause before 'enormous round of applause'. Give them a beat to actually clap.",
  /* 21 */ "Introduce Finalist #1 by name + project before they start. Step aside.",
  /* 22 */ "Same as above for Finalist #2.",
  /* 23 */ "After Finalist #3, explicitly say: 'Judges are now deliberating. We'll be right back.'",
  /* 24 */ "Fill dead time with a genuine comment about a project or moment that stood out. Don't just wait silently.",
  /* 25 */ "Full dramatic pause. Look at the audience. Make them wait. THEN advance.",
  /* 26 */ "Let the confetti and trophy animation breathe. Clap loudly. Look at the winners.",
  /* 27 */ "Fill in day-of. Can be 0–3 teams. Remove slide if none.",
  /* 28 */ "Read through each card. Gesture toward the people in the room. This takes time — don't rush it.",
  /* 29 */ "The feedback form ask is important. Say the link is in Discord. Don't skip it.",
  /* 30 */ "Close your laptop after this slide appears. Step away from the screen. Say goodbye to YOUR HACKERS, not to a slide.",
];
```

---

## PART 9: DAY-OF FILL-IN CHECKLIST

Before the ceremony, the following placeholders must be replaced in the HTML:

| Slide | Field | Source |
|---|---|---|
| 3 | `[N]` project count | Devpost at 12:00 PM after submissions close |
| 9 | Raffle winner name(s) | Live draw |
| 12 | 1Password winner team + project | From 1Password rep by 3:30 PM |
| 14 | ElevenLabs winner team + project | From ElevenLabs rep by 3:30 PM |
| 16 | Lovable winner team + project | From Lovable rep by 3:30 PM |
| 18 | PCCA winner team + project | From PCCA rep by 3:30 PM |
| 19 | Any additional sponsor prizes | From Ara/Sponsor POC |
| 21 | Finalist #1 team + project + desc | From organizer deliberation ~3:45 PM |
| 22 | Finalist #2 team + project + desc | Same |
| 23 | Finalist #3 team + project + desc | Same |
| 26 | Grand prize winner | Live deliberation |
| 27 | Honourable mention teams | Live deliberation |

**Recommended workflow:**  
- At 12:00 PM: Get project count, fill slide 3
- At 3:30 PM: Collect all sponsor winner names from Ara's Discord channel
- At 3:45 PM: Get finalist names from judging team
- At 4:00 PM: Get grand prize winner 5 minutes before ceremony starts if possible, or have it ready to type in live during deliberation slide

---

## PART 10: HTML FILE STRUCTURE (CLOSING)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cmd-f 2026 — Closing Ceremony</title>
  <style>
    /*
     * INHERIT ALL CSS FROM OPENING CEREMONY FILE
     * Copy identically: Reset, CSS Variables, Slide system,
     * Typography, Glass cards, Layout types, Animations,
     * UI Chrome, Mobile breakpoints
     *
     * ADD ONLY:
     */

    /* winner-reveal layout */
    .layout-winner-reveal { ... }
    .winner-reveal__title { ... }
    .winner-reveal__team { ... }
    .winner-reveal__project { ... }

    /* finalist-demo layout */
    .layout-finalist-demo { ... }
    .finalist-demo__card { ... }
    .finalist-demo__stage { ... }
    .finalist-demo__glow { ... }

    /* confetti */
    .confetti-container { ... }
    .confetti-piece { ... }
    @keyframes confettiFall { ... }

    /* trophy spring */
    @keyframes trophyReveal { ... }
  </style>
</head>
<body>
  <script>
    /* Same 4 background images from bg_assets.js */
    const IMG_BG1 = "...";
    const IMG_BG2 = "...";
    const IMG_BG3 = "...";
    const IMG_CLOSING = "..."; /* Export from Figma node 1:1209 — see Part 1 */
  </script>

  <!-- Same chrome as Opening file -->
  <div id="progress-bar"></div>
  <div id="slide-counter">1 / 30</div>
  <div id="nav-dots"></div>
  <div id="notes-drawer"><div id="notes-content"></div></div>
  <div id="help-modal" class="hidden">...</div>

  <div id="slides-container">
    <div class="slide active" id="slide-1"  data-bg="closing">...</div>
    <div class="slide"        id="slide-2"  data-bg="bg2">...</div>
    <!-- slides 3–30 -->
    <div class="slide"        id="slide-30" data-bg="bg2">...</div>
  </div>

  <script>
    /* Same navigation, counter, progress, notes, keyboard as Opening */
    const TOTAL = 30; /* ← only change from Opening */

    /* Confetti init — call for each winner slide */
    const winnerSlides = [9, 12, 14, 16, 18, 26];
    winnerSlides.forEach(n => {
      const container = document.querySelector(`#slide-${n} .confetti-container`);
      if (container) createConfetti(container);
    });

    function createConfetti(container) { /* ... see Part 5 ... */ }

    /* Same init() as Opening */
    init();
  </script>
</body>
</html>
```

---

## PART 11: KEY DIFFERENCES SUMMARY (CLOSING vs OPENING)

| Property | Opening | Closing |
|---|---|---|
| Slide count | 40 | 30 |
| Title image | `IMG_OPENING` | `IMG_CLOSING` (export needed) |
| Tone | Logistical + hype-building | Emotional + celebratory |
| Primary accent | Navy, Crimson | Gold, Crimson |
| New layouts | (none) | `winner-reveal`, `finalist-demo` |
| Confetti | ❌ | ✅ on 6 winner slides |
| Stats slide | ❌ | ✅ slide 3 (count-up animation) |
| Timeline layout | ✅ (schedule) | ❌ |
| Live fill-in slides | 2 (panelists, Toolhouse) | 10 (winners, finalists, count) |
| Last slide energy | High energy send-off | Tender, quiet, meaningful |
| Counter display | `X / 40` | `X / 30` |

---

## PART 12: HOW TO USE THIS SPEC IN A NEW CONVERSATION

Upload these files to a new Claude conversation:
1. `cmdf2026_spec.md` — Opening Ceremony spec (design system lives here)
2. `cmdf2026_closing_spec.md` — this file
3. `bg_assets.js` — base64 encoded background images

Then use this prompt:

> *"Build the HTML presentation described in cmdf2026_closing_spec.md. The design system (CSS variables, glass cards, typography, animation keyframes, navigation chrome) is defined in cmdf2026_spec.md — inherit it identically, don't redefine it. The bg_assets.js file contains the 4 base64 background images. For the closing title slide, use the CSS fallback defined in Part 1 of the closing spec since no closing.png was provided. Build all 30 slides as a single self-contained HTML file."*

If you have exported `closing.png` before starting:
> *"...I've also attached closing.png — encode it as base64 and use it as `IMG_CLOSING` for slide 1."*
