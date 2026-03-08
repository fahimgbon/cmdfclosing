# cmd-f 2026 Opening Ceremony — HTML Presentation Build Spec
**Version:** Final  
**Deliverable:** One fully self-contained `.html` file. No external dependencies. No CDN. No frameworks.  
**Slide count:** 40 slides  
**Duration:** ~75 minutes of content (Opening Ceremony: 10:30 AM – 11:45 AM)

---

## PART 1: ASSET PACKAGE

### Background Images
All four images are 1920×1080 PNG, embedded as base64 data URIs in the HTML.
They are provided as a separate `bg_assets.js` file alongside this spec — copy the
data URI strings directly into the HTML as JS constants:

```
const IMG_BG1    = "data:image/png;base64,..."  // Plain BG #1 — Cheshire cat + butterfly (bottom right)
const IMG_BG2    = "data:image/png;base64,..."  // Plain BG #2 — Caterpillar + Alice (bottom left), smoke wisps
const IMG_BG3    = "data:image/png;base64,..."  // Plain BG #3 — Queen of Hearts + White Rabbit (bottom corners)
const IMG_OPENING = "data:image/png;base64,..." // Opening Ceremony full illustrated title scene
```

### Exact Colors Sampled from Assets

**Sky (all BG variants):**
- Sky fill: `#C2E6FC` (rgb 194, 230, 252)
- Cloud shapes (subtle lighter blue): `#A9DEFD` (rgb 169, 222, 253)
- The sky is essentially flat — no gradient needed, it's a solid very light blue

**Grass / Hill:**
- Grass top edge: `#80CD7D` (rgb 128, 205, 125) — transition at ~y=920px out of 1080
- Grass mid: `#79CA7E` (rgb 121, 202, 126)
- Grass bottom: `#67BF83` (rgb 103, 191, 131)

**Opening Ceremony title slide typography:**
- "cmd-f 2026" label above title: `#1A3786` (deep navy, rgb 26, 55, 134)
- "Opening Ceremony" main headline: `#B4143C` (deep crimson, rgb 180, 20, 60)
- Date ribbon background: `#DEEAFA` (soft white-blue, rgb 222, 234, 250)
- Date text (inside ribbon): same navy `#1A3786`
- cmd-f keyboard logo: white text on navy `#1B2E7A` background

---

## PART 2: DESIGN SYSTEM

### Philosophy
The aesthetic is **Wonderland Glassmorphism** — the whimsical illustrated Figma backgrounds
serve as the "world", and content lives in frosted glass cards floating above it.
The result feels like Studio Ghibli × Apple keynote. Warm, dreamy, premium.

### Typography
- Font stack: `'SF Pro Display', 'Inter', 'Helvetica Neue', system-ui, sans-serif`
- **Hero title** (slide 1 only): 96–120px, font-weight 800, color `#1A3786` or `#B4143C`
- **Section title**: 64–80px, font-weight 700, color `#1A3786`
- **Slide headline**: 48–64px, font-weight 700, color `#1A3786`
- **Body text**: 20–24px, font-weight 400, color `#1A3786` at 85% opacity, line-height 1.6
- **Label / badge**: 12–13px, font-weight 600, letter-spacing 0.12em, uppercase
- **Accent text** (callouts, emojis, highlighted items): 22–28px

### Glass Card System
Every content card uses this CSS foundation:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(26, 55, 134, 0.12),
    0 2px 8px rgba(26, 55, 134, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
```

**Card variants:**
- `.glass-card--hero`: rgba white 22%, blur 20px — for title slides
- `.glass-card--content`: rgba white 18%, blur 16px — standard content
- `.glass-card--accent`: rgba white 12%, blur 12px, border rgba(26, 55, 134, 0.2) — for callout boxes
- `.glass-card--pill`: border-radius 100px, small padding — for tags/badges

### Color Accent Palette (for highlights, badges, borders)
These are used as accents on top of the glass cards — NOT as backgrounds:
- **Coral**: `#FF6B6B` — warnings, deadlines, urgent notes
- **Mint**: `#4ECDC4` — positive, confirmations, tips
- **Lavender**: `#A78BFA` — neutral info, features
- **Gold**: `#FFD93D` — prizes, highlights, special moments
- **Navy**: `#1A3786` — primary text, borders
- **Crimson**: `#B4143C` — cmd-f brand accent, matches opening title

### Gradient Combinations (4 required, used on badges/decorative elements only)
1. **Wonderland Dusk**: `linear-gradient(135deg, #B4143C 0%, #A78BFA 100%)`
2. **Sky Bloom**: `linear-gradient(135deg, #4ECDC4 0%, #A9DEFD 100%)`
3. **Golden Hour**: `linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)`
4. **Deep Rabbit Hole**: `linear-gradient(135deg, #1A3786 0%, #A78BFA 100%)`

### Floating Emoji / Decorative Elements
All emoji decorations are absolutely positioned, `pointer-events: none`, with subtle
float animations. Use a keyframe like:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-12px) rotate(3deg); }
  66% { transform: translateY(-6px) rotate(-2deg); }
}
```
Each emoji gets a different `animation-delay` so they don't sync.

---

## PART 3: LAYOUT SYSTEM

### Slide Shell
```html
<div class="slide" id="slide-N" data-bg="bg1|bg2|bg3|opening">
  <!-- background image is set via JS using data-bg -->
  <!-- content goes here -->
</div>
```

Each slide:
- `position: fixed; width: 100vw; height: 100vh; top: 0; left: 0`
- `background-image: url(IMG_BGx); background-size: cover; background-position: center`
- `display: flex; align-items: center; justify-content: center`
- Hidden via `opacity: 0; pointer-events: none` when inactive
- Active via `opacity: 1; pointer-events: all`

### Background Assignment Per Slide
Rotate BG1→BG2→BG3 for content slides. Slide 1 uses OPENING image.
```
Slide 1  → IMG_OPENING (special title)
Slides 2–14  → rotate BG1, BG2, BG3
Slides 15–27 → rotate BG2, BG3, BG1
Slides 28–40 → rotate BG3, BG1, BG2
```

### Safe Content Zone
Illustrations sit in bottom 25% of the background. **Never place glass cards below y=68% of viewport.**
Content zone: top 10% → bottom 72% of viewport (avoiding grass/characters).
Horizontally: 6% margin each side.

### cmd-f Logo (top right corner)
Present on EVERY slide, inheriting from the background image itself (it's baked in).
If building slide 1 specially, the logo appears embedded in the opening scene.

---

## PART 4: TRANSITIONS & ANIMATIONS

### Slide Transitions
CSS-only. No JS animation libraries.

**Default transition** (content slides): Crossfade + subtle upward drift
```css
.slide { transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.slide.entering { animation: slideEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.slide.exiting  { animation: slideExit  0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

@keyframes slideEnter {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes slideExit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-12px); }
}
```

**Title slide** (slide 1): Fade in only, slower (0.8s).

**Section divider slides**: Brief zoom-pulse on the icon/emoji before content appears.

### Card Entry Stagger
Each `.glass-card` inside a slide animates in with staggered delay:
```css
.glass-card:nth-child(1) { animation-delay: 0.1s; }
.glass-card:nth-child(2) { animation-delay: 0.2s; }
.glass-card:nth-child(3) { animation-delay: 0.3s; }
/* etc. */

@keyframes cardReveal {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.glass-card { animation: cardReveal 0.4s ease forwards; opacity: 0; }
```

### Continuous Background Animations
On every slide:
- **Floating emoji decorations** use the `float` keyframe above, 4–6s duration, infinite
- **Background parallax tilt** (optional): On `mousemove`, shift the BG image by ±8px using `transform: translate()`
- **Shimmer on glass cards**: Very subtle `background-position` animation that sweeps a lighter highlight diagonally every 6s

---

## PART 5: NAVIGATION & UI CHROME

### Slide Counter
Bottom-right corner, always visible:
```html
<div id="slide-counter">3 / 40</div>
```
```css
#slide-counter {
  position: fixed; bottom: 24px; right: 32px; z-index: 1000;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 13px; font-weight: 600;
  color: #1A3786; letter-spacing: 0.06em;
}
```

### Navigation Dots
Bottom-center, small dots:
```css
/* 40 dots, active = navy, inactive = rgba navy 25% */
#nav-dots { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); }
.dot { width: 6px; height: 6px; border-radius: 50%; margin: 0 3px; cursor: pointer; }
.dot.active { background: #1A3786; transform: scale(1.4); }
.dot.inactive { background: rgba(26,55,134,0.25); }
```

### Progress Bar
Top of screen, 3px height:
```css
#progress-bar {
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, #B4143C, #A78BFA);
  transition: width 0.4s ease;
  z-index: 1001;
}
```
Width = `(currentSlide / totalSlides) * 100%`

### Speaker Notes Drawer
Hidden by default. Toggled by pressing **N**. Slides up from bottom.
```html
<div id="notes-drawer" class="hidden">
  <div id="notes-content"></div>
</div>
```
```css
#notes-drawer {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(26, 55, 134, 0.92);
  backdrop-filter: blur(20px);
  color: white; padding: 20px 40px;
  border-top: 1px solid rgba(255,255,255,0.2);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 2000; max-height: 200px; overflow-y: auto;
  font-size: 16px; line-height: 1.5;
}
#notes-drawer.visible { transform: translateY(0); }
```

### Keyboard Shortcut Legend
Triggered by pressing **?**. Modal overlay:
```
→ / Space     Next slide
←             Previous slide  
N             Toggle speaker notes
F             Fullscreen
?             This help menu
Esc           Close this menu
```
Styled as a glass card modal, centered, with navy text.

### Keyboard Controls (JS)
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
  if (e.key === 'ArrowLeft')  prevSlide();
  if (e.key === 'n' || e.key === 'N') toggleNotes();
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
  if (e.key === '?') toggleHelp();
  if (e.key === 'Escape') closeOverlays();
});
```

### Touch / Click Navigation
- Click right half of screen → next
- Click left half of screen → prev
- Swipe left/right on mobile (touch events)

---

## PART 6: SLIDE DEFINITIONS

Each slide entry has: `id`, `bg`, `layout`, `title`, `body`, `emoji`, `notes`, `accent`

### LAYOUT TYPES
- `title-hero` — full-bleed centered, massive type, no cards (slide 1 only)
- `centered-single` — one large centered glass card with title + body
- `split-left` — large glass card left-aligned (~60% width), floating emoji right
- `split-right` — glass card right-aligned, floating emoji left
- `two-col` — two equal glass cards side by side
- `three-col` — three smaller cards in a row
- `list-card` — centered card with staggered animated list items
- `stat-grid` — grid of 4–6 small stat cards (icon + number + label)
- `full-card` — single card taking 80% of safe zone, scrollable if needed
- `callout` — giant emoji top-center, single bold statement, sub-copy below
- `timeline` — horizontal line with nodes (for schedule slides)

---

### SLIDE 1 — Title (Layout: title-hero)
**BG:** IMG_OPENING  
**Note:** This slide uses the opening.png which already has "Opening Ceremony / March 7, 2026" embedded. No glass card needed. Just render the BG image fullscreen.  
Floating decorations: none (all illustrated in the image itself)  
**Speaker notes:** Welcome everyone, wait for the room to settle.

---

### SLIDE 2 — Welcome (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🐇  
**Title:** you fell down the rabbit hole.  
**Body:** and honestly? we're obsessed that you did.  
Welcome to cmd-f 2026 — 24 hours for people who've been told they don't belong in tech, to build like they do.  
**Floating extras:** 🍄 (bottom-left, floats), ✨ (top-right, floats), 🦋 (mid-right, floats)  
**Notes:** Pause after "rabbit hole" — let it land. Then continue warmly.

---

### SLIDE 3 — What is cmd-f? (Layout: centered-single)
**BG:** BG2  
**Title:** so... what IS cmd-f?  
**Body (animated list):**
- 🖥️ A 24-hour hackathon at UBC
- 🌱 Focused on gender inequality in tech
- 🔒 A dedicated, safe space for historically excluded genders
- 🪄 Where you connect, build, and take up space

**Badge accent:** `#B4143C` pill → "since 2016"  
**Notes:** Keep it snappy. People in the room know what they signed up for — this is for sponsors in the room.

---

### SLIDE 4 — Who's in the Room (Layout: split-left)
**BG:** BG3  
**Title:** who's in the room? 🌱  
**Body:** cmd-f is open to people who identify as an underrepresented gender in tech — including women, trans, non-binary, and two-spirited folks.

"We use the term 'underrepresented genders' to reflect who has historically faced — and still faces — systemic barriers in the field."

**Floating right side:** 💛 🫶 🌸 (staggered float)  
**Bottom callout pill (glass-card--accent):** "We ask that everyone trust that the people here are meant to be here."  
**Notes:** Read the quote directly. Pause. This one matters.

---

### SLIDE 5 — Allies (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🫶  
**Title:** allies, we see you too.  
**Body:** Allyship matters, and we appreciate you showing up the right way.  
Allies are here as volunteers and mentors — supporting, not competing.  
**Notes:** Quick slide — 20 seconds max.

---

### SLIDE 6 — Code of Conduct (Layout: two-col)
**BG:** BG2  
**Left card (accent: Coral):**  
🚫 **No exceptions.**  
No harassment. No discrimination.  
All participants follow the MLH Code of Conduct at all times.  
**Right card (accent: Mint):**  
🆘 **If something's wrong:**  
• Find an organizer in a 🔵 navy nwPlus hoodie  
• #anonymous-reporting on Discord  
• Email cmd-f@nwplus.io  
**Notes:** Don't rush this. Read both cards.

---

### SLIDE 7 — Pronouns & Names (Layout: list-card)
**BG:** BG3  
**Title:** names + pronouns 🏷️  
**Animated list (two columns — DO vs DON'T):**  
✅ Use the name on someone's nametag  
✅ Share YOUR pronouns when you introduce yourself  
✅ "hackers", "everyone", "folks" — not "guys"  
✅ Just ask if you're unsure  
❌ Don't assume pronouns from appearance  
❌ No deadnaming. Ever.  
**Notes:** Quick but intentional. Wave to the volunteers to model it.

---

### SLIDE 8 — Where Things Are (Layout: three-col)
**BG:** BG1  
**Title:** 📍 where things are happening  
**Three cards:**  
🎤 **Ceremonies** — IRC 2 — P.A. Woodward IRC, 2194 Health Sciences Mall  
💻 **Hacking** — LSI East Atrium — 2350 Health Sciences Mall  
📚 **Workshops** — LSC 1003  /  🤝 **Sponsor+Mentor HQ** — LSC 1416  /  😴 **Sleeping** — LSC 1423+1535  
**Notes:** Keep visible for ~20 seconds. People are writing this down.

---

### SLIDE 9 — Get Connected (Layout: split-right)
**BG:** BG2  
**Title:** 📡 get connected rn  
**Main glass card (right-aligned):**  
```
Wi-Fi:      cmd-f 2026
Password:   nwplus_cmd-f

💬 Discord    cmd-f.nwplus.io/discord
📅 Schedule   portal.nwplus.io/cmd-f/schedule  
💻 Devpost    cmd-f-2026.devpost.com
```
All URLs styled in gold `#FFD93D` on navy  
**Left side:** Floating 📱 emoji, large, with glow  
**Notes:** Pause here. Tell people to actually open Discord right now.

---

### SLIDE 10 — QR Code (Layout: centered-single)
**BG:** BG3  
**Title:** your QR code is your golden ticket 🎟️  
**Body:**  
Log in → portal.nwplus.io/cmd-f → "My Ticket"  
You need it for:  
🍕 Meal verification  🎟️ Raffle stamps  🤝 Hacker networking  
**Tip pill (gold):** "Add it to your digital wallet. Future you will thank you."  
**Notes:** Tell people to get it out now.

---

### SLIDE 11 — ID (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🆔  
**Title:** have your ID on you  
**Body:** Driver's license · Passport · Gov photo ID card · Health card  
Wear your nametag lanyard at all times. Lost it? Info Desk has extras.  
**Notes:** 15 seconds. Move quickly.

---

### SLIDE 12 — Key Times (Layout: full-card)
**BG:** BG2  
**Title:** ⏰ the times that actually matter  
**Content (two timeline sections):**  
**Saturday March 7**  
8:30 AM → Check-in opens (East Entrance, LSI)  
10:30 AM → Opening Ceremony ← you are HERE  
12:00 PM → 🚀 HACKING BEGINS  
**Sunday March 8**  
12:00 PM → Submissions close on Devpost ⚠️  
1:00 PM → Panel Judging  
4:00 PM → Closing Ceremony 🏆  
Style the "HACKING BEGINS" line with a gradient pill badge (Sky Bloom).  
Style the "Submissions close" with a Coral pill badge.  
**Notes:** Point out the DST slide coming up.

---

### SLIDE 13 — Daylight Saving (Layout: callout)
**BG:** BG3  
**Giant emoji:** 🕰️  
**Title:** PSA: clocks jump forward tonight  
**Body:** 2:00 AM → Sunday March 8 → lose 1 hour  
(very Wonderland energy tbh 🐇)  
Hacking window:  
**March 7 @ 12:00 PM PST → March 8 @ 12:00 PM PDT**  
Still exactly 24 hours.  
**Notes:** Get a laugh. Move on.

---

### SLIDE 14 — Saturday Schedule (Layout: timeline)
**BG:** BG1  
**Title:** Saturday schedule ☀️  
**Timeline (horizontal or vertical depending on space):**  
8:30 AM — Check-in + Boothing  
9:00 AM — Team Formation #1 (LSI 1013)  
10:30 AM — Opening Ceremony (you are here!)  
12:00 PM — 🚀 Hacking + Pizza lunch  
12:00 PM — Team Formation #2  
1:20 PM — Workshop: Branding  
2:40 PM — Workshop: Tea Party Networking 🍵  
4:00 PM — Workshop: GitHub  
5:00 PM — Workshop: Recruiting Panel  
6:00 PM — Workshop: Deployment  
7:15 PM — Dinner 🥗  
Each node is a small glass pill with time + label. Active time (now: 10:30) glows brighter.

---

### SLIDE 15 — Saturday Night (Layout: centered-single)
**BG:** BG2  
**Title:** Saturday night 🌙  
**Body:**  
8:00 PM — Workshop: AI Prototyping  
9:00 PM — Ping Pong 🏓 + Doodle Pop-Up 🖍️  
10:30 PM — Late Night Activity ✨  
11:00 PM — SafeWalk Round 1 💛  
⸻  
12:00 AM — Sleeping rooms open (LSI 1423 + 1535)  
12:10 AM — Midnight Snack 🧋🍩  
**Bottom italic:** sleep is a power move, btw  
**Notes:** Wave at the moon. You've been at it for hours by now.

---

### SLIDE 16 — Sunday Schedule (Layout: timeline)
**BG:** BG3  
**Title:** Sunday schedule ☀️  
8:00 AM — Breakfast 🥐  
9:00 AM — MLH Hardware Lab open 🔧  
12:00 PM ⚠️ — SUBMISSIONS DUE  
12:20 PM — Lunch 🥖  
1:00 PM — Panel Judging  
3:00 PM — Deliberation  
4:00 PM — Closing Ceremony 🏆  

---

### SLIDE 17 — Meals (Layout: three-col)
**BG:** BG1  
**Title:** the Wonderland dining experience 🍽️  
**Five cards (use 3-col + small bottom strip):**  
🍕 **Sat Lunch** — The Mad Hatter's Pizza Party  
🥗 **Sat Dinner** — The Queen of Hearts' Poké Garden (Steve's Poké)  
🧋 **Midnight** — Unbirthday Tea Party (Bubble Tea + Donuts + Macarons)  
🥐 **Sun Breakfast** — White Rabbit's Morning Dash  
🥖 **Sun Lunch** — Looking Glass Luncheon (Sandwiches + Bánh Mì)  
**Bottom quote pill:** "We're all mad here... mad hungry." 🐱  
**Notes:** Get a laugh on the food names.

---

### SLIDE 18 — Dietary (Layout: callout)
**BG:** BG2  
**Giant emoji:** 🌿  
**Title:** dietary stuff  
**Body:** ✅ Vegetarian ✅ Vegan ✅ Halal ✅ Gluten-free options at every meal.  
Allergy-friendly snacks → Info Desk, just ask!  
⚠️ No food or drinks in ceremony or lecture rooms.  
**Notes:** Quick.

---

### SLIDE 19 — Sleeping (Layout: split-left)
**BG:** BG3  
**Title:** sleeping @ cmd-f 😴  
**Body:**  
Sleeping rooms open at midnight: LSI 1423 + 1535  
Bring: sleeping bag · blanket · pillow · eye mask · earplugs  
Limited blankets at Info Desk (first come, first served)  
**Callout card (accent):** You are NOT required to stay overnight. Going home is valid and smart.  
**Notes:** Say "hacking is not allowed in sleeping rooms" with a smile.

---

### SLIDE 20 — SafeWalk (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🦺  
**Title:** SafeWalk — yes, we have this  
**Body:**  
Two rounds for on-campus folks:  
⏰ 11:00 PM  /  ⏰ 12:00 AM  
Drop by the Info Desk 5 min before.  
(You had to sign up on RSVP — check if you're on the list!)  

---

### SLIDE 21 — Hacking Rules (Layout: full-card)
**BG:** BG2  
**Title:** 💻 ok, hacking. here's the deal.  
**Body:**  
Hacking starts at 12:00 PM PST today.  
ALL code, design, and boilerplate must be created during:  
⏰ **March 7 @ 12:00 PM PST → March 8 @ 12:00 PM PDT**  
Ideas? Brainstorm away.  
Code before noon? 👀 That's a disqualification.  
Hardware projects welcome — MLH Hardware Lab is open all event!  
**Notes:** Firm but light.

---

### SLIDE 22 — Teams (Layout: split-right)
**BG:** BG3  
**Title:** teams 👥  
**Body:**  
Teams of 1–4. Solo allowed, but we encourage you to meet people!  
Still looking for teammates?  
🔍 Team Formation: 9 AM + noon in LSI 1013/1003  
💬 #team-formation on Discord  
No team registration needed — add teammates on Devpost when you submit.  

---

### SLIDE 23 — Submission (Layout: centered-single)
**BG:** BG1  
**Title:** 📬 submitting your project  
**Body:**  
cmd-f-2026.devpost.com  
**Deadline (coral pill, large):** ⚠️ March 8 @ 12:00 PM PDT — NO EXTENSIONS.  
Video demos aren't required but sponsors use your Devpost to shortlist.  
Write a good description. Add your teammates.  

---

### SLIDE 24 — Judging (Layout: two-col)
**BG:** BG2  
**Title:** 🪷 judging — we changed things up  
**Left card:**  
**Round 1** (1–3 PM)  
Every submitted project  
4-min pitch + 2-min Q&A  
Score → finalist eligibility  
**Right card:**  
**Round 2** (4–4:40 PM)  
Finalists only  
5-min pitch + 2-min Q&A  
Top 3 demo LIVE at Closing  
**Bottom strip:** Finalists notified on Discord ~3:45 PM — ringer ON 🔔  

---

### SLIDE 25 — Rubric (Layout: stat-grid)
**BG:** BG3  
**Title:** 📋 what judges are looking for  
**Four stat cards (large emoji + title + description):**  
⚙️ **Technology** — Are you using the tools? Using them well?  
✅ **Completion** — Does the thing... work?  
🎨 **Design** — Is it usable? Accessible? Intentional?  
🎤 **Pitch + Originality** — Can you sell it? Is it interesting?  
**Bottom note:** No additional rubric info will be shared by judges or staff. Trust the process. 🌙  

---

### SLIDE 26 — New This Year (Layout: list-card)
**BG:** BG1  
**Title:** new this year ✨  
**Staggered animated list (each item flies in with delay):**  
🎩 **Dedicated Mentor Zones** — mentors in assigned quadrants throughout LSI  
🪷 **Panel Judging** — you pitch once to a panel, not a roaming carousel  
📱 **Hacker Networking** — scan each other's QR codes (Pokémon GO but for networking)  
🎟️ **Digital Stampbook Raffle** — attend things, earn stamps, win prizes  

---

### SLIDE 27 — Raffle (Layout: centered-single)
**BG:** BG2  
**Title:** 🎟️ the raffle, explained  
**Body:**  
Collect stamps at workshops + activities + events  
**1 stamp = 1 raffle entry.** More stamps = better odds 📈  
Track yours: portal.nwplus.io/cmd-f/stampbook  
⚠️ Must be present at Closing Ceremony to claim a prize.  
**Prize badge (gold gradient):** Xbox controllers · Speakers · More 👀  

---

### SLIDE 28 — First 75 (Layout: callout)
**BG:** BG3  
**Giant emoji:** 🌟  
**Title:** first 75 to check in  
**Body:**  
If you were in the first 75 hackers to arrive this morning:  
🍄 Exclusive bonus merch  
🍄 Extra raffle stamps  
Already in? You know if you made the cut. 😌  

---

### SLIDE 29 — Mentor Zones (Layout: split-left)
**BG:** BG1  
**Title:** 🎩 Mentor Zones — real ones  
**Body:**  
Stuck? Need a second opinion? Just want to talk through your idea?  
Mentors are in dedicated zones throughout LSI. Help is always nearby.  
Request a ticket in #request-mentor-ticket on Discord (opens when hacking starts!)  
**Callout accent card:** Mentors can debug + advise — they can't write code or design assets for you.  

---

### SLIDE 30 — Toolhouse Credits (Layout: split-right)
**BG:** BG2  
**Title:** 🔥 free AI credits — yes, actually  
**Body:**  
Toolhouse AI is giving cmd-f hackers free credits to build + deploy AI agents.  
**Numbered step cards:**  
1️⃣ Create a Toolhouse account at toolhouse.ai (use your cmd-f email)  
2️⃣ Fill out the Hacker Credit Request Form (link pinned in Discord)  
3️⃣ Credits injected directly into your account ✨  
**Bottom:** Questions? DM Anna F (nwPlus) on Discord  

---

### SLIDE 31 — Toolhouse Video (Layout: centered-single)
**BG:** BG3  
**Title:** 📹 a word from our friends at Toolhouse AI  
**Center:** Large glass card with a play button icon (▶) and "[ Video plays here ]" label  
Add an actual `<video>` or `<iframe>` tag referencing the drive link for the Toolhouse video.  
Drive URL for Toolhouse video: https://drive.google.com/file/d/1p[...] (organizer: get full URL from Anna F)  
**Notes:** Hit play, step back.

---

### SLIDE 32 — Sponsor Intro (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🌹  
**Title:** none of this happens without them.  
**Body:**  
cmd-f 2026 is powered by sponsors who genuinely believe in what we're building here.  
Stop by booths in the East Atrium — many are hiring interns + new grads 👀  

---

### SLIDE 33 — Silver Sponsors (Layout: centered-single)
**BG:** BG2  
**Badge pill (gradient: Wonderland Dusk):** ✨ SILVER  
**Title:** Silver Sponsors  
**Two large logo placeholder boxes (glass cards, side by side):**  
[ 1Password logo ]  ·  [ Centre for Digital Media logo ]  
**Notes:** If logos are available, embed them as `<img>` tags.

---

### SLIDE 34 — Bronze Sponsors (Layout: three-col or two-col 3x)
**BG:** BG3  
**Badge pill:** 🥉 BRONZE  
**Six glass pill badges (logo + name each):**  
Communications Security Establishment (CSE)  
GitHub  
BCIT Student Association  
Smart Cohort  
Paraform  
UBC Student Alumni Council  

---

### SLIDE 35 — In-Kind Sponsors (Layout: full-card with wrapping pills)
**BG:** BG1  
**Badge pill:** 💫 IN-KIND  
**Title:** In-Kind Sponsors  
**Flowing layout of logo/name pills:**  
Toolhouse AI · Microsoft · ElevenLabs · Lovable · PCCA  
Steve's Poké Bar · Koerner's Pub · Barry's Vancouver  
Spin Society · Reviva Lounge · Bon Macaron  
Limegee · IdeaMatch · Minuteman Press  

---

### SLIDE 36 — Sponsor Prizes (Layout: list-card)
**BG:** BG2  
**Title:** 🏆 sponsor prizes — opt in on Devpost!  
**Four staggered-reveal cards:**  
🔐 **1Password** — Best Security Hack  
$100 Best Buy gift card + 1yr 1Password + recruiter chat (per member)  
🎙️ **ElevenLabs** — Best Use of ElevenLabs  
3 months Scale Tier ($990 value, per member)  
💜 **Lovable** — Best Use of Lovable  
3 months Pro — 100 credits/month per member  
🌿 **PCCA** — Best Wellness-Related Hack  
$325 for the winning team  

---

### SLIDE 37 — Reviva Lounge (Layout: callout)
**BG:** BG3  
**Giant emoji:** ✨  
**Title:** a word from Reviva Lounge  
**Body:** [ Reviva Lounge — 1 to 2 minute live pitch from rep ]  
Reviva is sponsoring in-kind prizes for our Gamification Raffle! 🌿  
Spa prizes up for grabs all weekend.  
**Notes:** Hand mic/stage to Reviva rep.

---

### SLIDE 38 — Keynote Intro (Layout: callout)
**BG:** BG1  
**Giant emoji:** 🎤  
**Title:** okay. now for the part you've actually been waiting for.  
**Body:**  
Please welcome our keynote panelists — people doing remarkable things in tech who took their weekend to be here and talk to YOU.  
**Time badge (gold):** 11:00 AM – 11:45 AM  

---

### SLIDE 39 — Meet the Panelists (Layout: stat-grid or panelist grid)
**BG:** BG2  
**Title:** Meet Our Panelists 🌟  
**Layout:** 3–5 panelist cards in a grid. Each card:  
- Circular photo placeholder (80–100px diameter, border: 3px solid rgba(white,0.5), glass bg)
- Name (20px bold navy)
- Title + Company (15px, navy 70% opacity)
- Fun fact / one-liner (14px italic)  
**NOTE:** Fill with real panelist names + photos before ceremony. Leave as placeholders if unknown.  

---

### SLIDE 40 — Let's Go (Layout: callout)
**BG:** BG3 (or BG1 for variety)  
**Giant emoji:** 🚀  
**Title:** alright. you know what time it is.  
**Body:**  
Hacking officially begins at 12:00 PM PST.  
Head to the East Atrium at LSI. Find your spot. Power up.  
You have 24 hours to build something you're proud of.  
We believe in you. Now go. 💻✨  
**Bottom quote (glass card, centered, italic, large):**  
"The best kind of magic is the kind you make yourself." 🪄  
**Animation:** On slide entry, the quote fades in last, with a golden shimmer sweep.

---

## PART 7: MOBILE RESPONSIVENESS

```css
@media (max-width: 768px) {
  /* Stack two-col and three-col layouts vertically */
  .layout-two-col, .layout-three-col { flex-direction: column; }
  /* Scale typography down */
  .headline { font-size: clamp(32px, 6vw, 64px); }
  .body-text { font-size: clamp(15px, 2.5vw, 22px); }
  /* Reduce glass card padding */
  .glass-card { padding: 20px; }
  /* Nav dots smaller */
  .dot { width: 4px; height: 4px; }
}
```

---

## PART 8: FULL HTML FILE STRUCTURE

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cmd-f 2026 — Opening Ceremony</title>
  <style>
    /* ── Reset ── */
    /* ── CSS Variables ── */
    :root {
      --sky: #C2E6FC;
      --cloud: #A9DEFD;
      --grass-top: #80CD7D;
      --grass-bottom: #67BF83;
      --navy: #1A3786;
      --crimson: #B4143C;
      --coral: #FF6B6B;
      --mint: #4ECDC4;
      --lavender: #A78BFA;
      --gold: #FFD93D;
      --glass-bg: rgba(255,255,255,0.18);
      --glass-border: rgba(255,255,255,0.45);
      --glass-shadow: 0 8px 32px rgba(26,55,134,0.12);
    }
    /* ── Slide system ── */
    /* ── Typography ── */
    /* ── Glass card variants ── */
    /* ── Layout types ── */
    /* ── Animations & transitions ── */
    /* ── UI Chrome ── */
    /* ── Mobile ── */
  </style>
</head>
<body>
  <!-- Background assets (base64 data URIs) -->
  <script>
    const IMG_BG1 = "data:image/png;base64,..."; // from bg_assets.js
    const IMG_BG2 = "data:image/png;base64,...";
    const IMG_BG3 = "data:image/png;base64,...";
    const IMG_OPENING = "data:image/png;base64,...";
  </script>

  <!-- Progress bar -->
  <div id="progress-bar"></div>
  
  <!-- Slide counter -->
  <div id="slide-counter">1 / 40</div>
  
  <!-- Nav dots -->
  <div id="nav-dots"></div>
  
  <!-- Speaker notes drawer -->
  <div id="notes-drawer"><div id="notes-content"></div></div>
  
  <!-- Help modal -->
  <div id="help-modal" class="hidden">...</div>
  
  <!-- All 40 slides -->
  <div id="slides-container">
    <div class="slide active" id="slide-1" data-bg="opening">...</div>
    <div class="slide" id="slide-2" data-bg="bg1">...</div>
    <!-- ... etc ... -->
  </div>

  <script>
    // ── State ──
    let current = 0;
    const total = 40;
    let notesVisible = false;
    let helpVisible = false;

    // ── Background assignment ──
    const bgMap = { 'bg1': IMG_BG1, 'bg2': IMG_BG2, 'bg3': IMG_BG3, 'opening': IMG_OPENING };
    
    // ── Navigation ──
    function goTo(n) { ... }
    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }
    
    // ── UI Chrome ──
    function updateCounter() { ... }
    function updateProgress() { ... }
    function updateDots() { ... }
    function toggleNotes() { ... }
    function toggleHelp() { ... }
    
    // ── Event Listeners ──
    // keyboard, click, touch
    
    // ── Init ──
    function init() {
      // Build nav dots
      // Set background images
      // Show first slide
      goTo(0);
    }
    init();
  </script>
</body>
</html>
```

---

## PART 9: ANIMATION DETAIL REFERENCE

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Slide enter | fadeUp (opacity 0→1, y 20→0) | 500ms | cubic-bezier(0.4,0,0.2,1) |
| Slide exit | fadeOut (opacity 1→0, y 0→-12) | 400ms | cubic-bezier(0.4,0,0.2,1) |
| Glass card reveal | staggered fadeUp, 100ms apart | 400ms each | ease |
| Floating emoji | continuous float loop | 4–6s | ease-in-out, infinite |
| Progress bar update | width transition | 400ms | ease |
| Notes drawer | translateY slide | 300ms | ease |
| List item stagger | each item 150ms apart | 350ms each | ease |
| Quote shimmer | diagonal highlight sweep | 1.2s | ease-in-out, once on entry |
| Slide 1 (title) | slow fade in only | 800ms | ease |
| Slide counter | instant (no transition) | — | — |

---

## PART 10: SPEAKER NOTES (all 40 slides)

```javascript
const speakerNotes = [
  /* 01 */ "Wait for the room to settle. Look up, smile, let the scene do the work.",
  /* 02 */ "Pause after 'rabbit hole' — let it land. Then: warm, genuine, you're so glad they're here.",
  /* 03 */ "Keep it snappy. The sponsors in the room need context. Hackers already know.",
  /* 04 */ "Read the quote directly. Pause. This one matters. Don't rush it.",
  /* 05 */ "Quick — 20 seconds max. Just a warm acknowledgement.",
  /* 06 */ "Don't rush CoC. Read both cards. Make eye contact.",
  /* 07 */ "Model it yourself — introduce your pronouns right before or after this slide.",
  /* 08 */ "Keep visible ~20 seconds. People are writing this down or screenshotting.",
  /* 09 */ "Pause here. Tell people to literally open Discord right now on their phones.",
  /* 10 */ "Tell people to get their QR code out while looking at this slide.",
  /* 11 */ "15 seconds. Move quickly.",
  /* 12 */ "Mention DST is coming on next slide.",
  /* 13 */ "Get a laugh on 'very Wonderland energy'. Move on.",
  /* 14 */ "Highlight that boothing is happening RIGHT NOW before this ceremony.",
  /* 15 */ "Say 'sleep is a power move' with full confidence.",
  /* 16 */ "Point out the 12PM deadline is in BOLD for a reason.",
  /* 17 */ "Get a laugh on the food names. These are genuinely good.",
  /* 18 */ "Quick. Remind people Info Desk is the place for dietary needs.",
  /* 19 */ "Light tone — sleeping overnight is optional, not expected.",
  /* 20 */ "Confirm safewalk is only for people who signed up on the RSVP form.",
  /* 21 */ "Firm but warm. 'Code before noon is a disqualification' — say it clearly.",
  /* 22 */ "Encourage people to go to team formation. Some people are nervous to ask.",
  /* 23 */ "Really emphasize the NO EXTENSIONS. You will get asked. The answer is no.",
  /* 24 */ "This is new this year — people may have questions. Keep it brief here.",
  /* 25 */ "The 'trust the process' line gets a knowing laugh usually.",
  /* 26 */ "These are genuine improvements. Say them with pride.",
  /* 27 */ "Raffle = incentive to attend workshops. Remind them stamps come from participation.",
  /* 28 */ "If you know who the first 75 are, you can name-check them.",
  /* 29 */ "Mentors are already in the building — wave to one if they're in the room.",
  /* 30 */ "Anna takes this slide — she's the POC for Toolhouse.",
  /* 31 */ "Hit play on Toolhouse video. Step back. Let it breathe.",
  /* 32 */ "Genuine gratitude here. Don't rush the sponsor section.",
  /* 33 */ "If logo images are ready, drop them in before ceremony.",
  /* 34 */ "Wave toward the sponsor booths direction if possible.",
  /* 35 */ "These are all in-kind — food, services, prizes. Thank them warmly.",
  /* 36 */ "Remind people to OPT IN on Devpost — it's not automatic.",
  /* 37 */ "Hand mic to Reviva rep. Step to the side.",
  /* 38 */ "Build genuine excitement here. You've been presenting for 30 min. Big energy finish.",
  /* 39 */ "Introduce each panelist briefly. Use their preferred intro if they sent one.",
  /* 40 */ "Last slide. Big energy. End on 'Now go.' — then silence. Let them feel it.",
];
```

---

## PART 11: KEY BUILD NOTES FOR DEVELOPER

1. **Single file** — everything (CSS, JS, all base64 images) in one `.html`. Must open and run locally in a browser with no internet required.

2. **Base64 images** — the 4 PNG files are in `bg_assets.js` alongside this spec. Copy the 4 data URI strings into the `<script>` block at the top of the HTML.

3. **Background illustration characters** — Cheshire cat, Queen of Hearts, White Rabbit, Alice, Caterpillar, butterflies etc. are all part of the PNG backgrounds. You do NOT need to recreate them in CSS/SVG. Just use the images correctly positioned.

4. **Font** — Load via `@import` from Google Fonts if internet is available: `'Inter'`. Fallback to system-ui. No SF Pro needed for web (it's system-only on Apple devices).

5. **backdrop-filter** — Requires `-webkit-backdrop-filter` prefix for Safari. Test in Safari before ceremony.

6. **Fullscreen** — Use `document.documentElement.requestFullscreen()` — map to F key.

7. **Closing ceremony** — Build as a separate file using identical design system. Swap `IMG_OPENING` for the closing ceremony background. Slide count is ~30.

8. **Panelist slide (39)** — Leave as photo placeholders. Brief person filling it in day-of can just edit the `<img src="">` tags.

9. **Toolhouse video slide (31)** — Needs the actual Google Drive video URL from Anna F. Embed as `<video controls>` or `<iframe>` in the glass card.

10. **Performance** — The 4 base64 PNGs total ~100KB. File size of final HTML should be under 600KB. Should load and run smoothly on any modern laptop.
