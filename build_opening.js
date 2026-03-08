const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const bgAssets = fs.readFileSync(path.join(ROOT, 'bg_assets.js'), 'utf8').trim();

const speakerNotes = [
  "Wait for the room to settle. Look up, smile, let the scene do the work.",
  "Pause after 'rabbit hole' — let it land. Then: warm, genuine, you're so glad they're here.",
  "Keep it snappy. The sponsors in the room need context. Hackers already know.",
  "Read the quote directly. Pause. This one matters. Don't rush it.",
  "Quick — 20 seconds max. Just a warm acknowledgement.",
  "Don't rush CoC. Read both cards. Make eye contact.",
  "Model it yourself — introduce your pronouns right before or after this slide.",
  "Keep visible ~20 seconds. People are writing this down or screenshotting.",
  "Pause here. Tell people to literally open Discord right now on their phones.",
  "Tell people to get their QR code out while looking at this slide.",
  "15 seconds. Move quickly.",
  "Mention DST is coming on next slide.",
  "Get a laugh on 'very Wonderland energy'. Move on.",
  "Highlight that boothing is happening RIGHT NOW before this ceremony.",
  "Say 'sleep is a power move' with full confidence.",
  "Point out the 12PM deadline is in BOLD for a reason.",
  "Get a laugh on the food names. These are genuinely good.",
  "Quick. Remind people Info Desk is the place for dietary needs.",
  "Light tone — sleeping overnight is optional, not expected.",
  "Confirm safewalk is only for people who signed up on the RSVP form.",
  "Firm but warm. 'Code before noon is a disqualification' — say it clearly.",
  "Encourage people to go to team formation. Some people are nervous to ask.",
  "Really emphasize the NO EXTENSIONS. You will get asked. The answer is no.",
  "This is new this year — people may have questions. Keep it brief here.",
  "The 'trust the process' line gets a knowing laugh usually.",
  "These are genuine improvements. Say them with pride.",
  "Raffle = incentive to attend workshops. Remind them stamps come from participation.",
  "If you know who the first 75 are, you can name-check them.",
  "Mentors are already in the building — wave to one if they're in the room.",
  "Anna takes this slide — she's the POC for Toolhouse.",
  "Hit play on Toolhouse video. Step back. Let it breathe.",
  "Genuine gratitude here. Don't rush the sponsor section.",
  "If logo images are ready, drop them in before ceremony.",
  "Wave toward the sponsor booths direction if possible.",
  "These are all in-kind — food, services, prizes. Thank them warmly.",
  "Remind people to OPT IN on Devpost — it's not automatic.",
  "Hand mic to Reviva rep. Step to the side.",
  "Build genuine excitement here. You've been presenting for 30 min. Big energy finish.",
  "Introduce each panelist briefly. Use their preferred intro if they sent one.",
  "Last slide. Big energy. End on 'Now go.' — then silence. Let them feel it.",
];

function bgForSlide(id) {
  if (id === 1) return 'opening';
  if (id >= 2 && id <= 14) return ['bg1', 'bg2', 'bg3'][(id - 2) % 3];
  if (id >= 15 && id <= 27) return ['bg2', 'bg3', 'bg1'][(id - 15) % 3];
  return ['bg3', 'bg1', 'bg2'][(id - 28) % 3];
}

function floaties(items = []) {
  return items
    .map(
      (item, index) => `
        <span
          class="floaty"
          style="
            --x:${item.x};
            --y:${item.y};
            --size:${item.size || '34px'};
            --delay:${item.delay || `${index * -0.45}s`};
            --dur:${item.dur || `${4.6 + (index % 3) * 0.55}s`};
            --alpha:${item.alpha || 1};
          "
        >${item.emoji}</span>
      `
    )
    .join('');
}

function pill(text, classes = '') {
  return `<span class="pill ${classes}">${text}</span>`;
}

function card(inner, classes = '', accent = '') {
  const accentClass = accent ? ` accent-${accent}` : '';
  return `<article class="glass-card revealable ${classes}${accentClass}">${inner}</article>`;
}

function timelineItem(time, title, note = '', classes = '', badge = '') {
  return `
    <div class="timeline-item revealable ${classes}">
      <div class="timeline-time">${time}</div>
      <div class="timeline-rail"><span class="timeline-dot"></span></div>
      <div class="timeline-detail">
        <div class="timeline-title">${title}</div>
        ${note ? `<div class="timeline-note">${note}</div>` : ''}
        ${badge}
      </div>
    </div>
  `;
}

function sectionIntro(title, kicker = '', align = 'left') {
  return `
    <div class="section-intro section-intro--${align}">
      ${kicker ? `<div class="section-kicker">${kicker}</div>` : ''}
      <h2 class="section-title">${title}</h2>
    </div>
  `;
}

function sponsorPill(name) {
  return `<span class="sponsor-pill revealable">${name}</span>`;
}

const slides = [
  {
    id: 1,
    title: 'Title',
    layout: 'title-hero',
    extras: [],
    content: `<div class="hero-blank"></div>`,
  },
  {
    id: 2,
    title: 'Welcome',
    layout: 'callout',
    extras: [
      { emoji: '🍄', x: '7%', y: '58%', size: '34px' },
      { emoji: '✨', x: '83%', y: '13%', size: '28px', delay: '-1.1s' },
      { emoji: '🦋', x: '79%', y: '39%', size: '30px', delay: '-0.35s' },
    ],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🐇</div>
        ${card(`
          ${pill('Opening Ceremony', 'pill--gradient-dusk')}
          <h1 class="callout-title">You Fell Down the Rabbit Hole.</h1>
          <p class="callout-subtitle">We're very glad you did.</p>
          <p class="body-copy body-copy--center">Welcome to cmd-f 2026: 24 hours for people who have been told they do not belong in tech to build, learn, and take up space.</p>
        `, 'glass-card--hero callout-card')}
      </div>
    `,
  },
  {
    id: 3,
    title: 'What is cmd-f?',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          <div class="single-header">
            ${pill('Since 2016', 'pill--crimson')}
            <h2 class="slide-headline">What Is cmd-f?</h2>
          </div>
          <div class="feature-list feature-list--large">
            <div class="feature-row revealable"><span class="feature-icon">🖥️</span><span>A 24-hour hackathon at UBC</span></div>
            <div class="feature-row revealable"><span class="feature-icon">🌱</span><span>Focused on gender inequality in tech</span></div>
            <div class="feature-row revealable"><span class="feature-icon">🔒</span><span>A dedicated, safe space for historically excluded genders</span></div>
            <div class="feature-row revealable"><span class="feature-icon">🪄</span><span>Where you connect, build, and take up space</span></div>
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 4,
    title: "Who's in the Room",
    layout: 'split-left',
    extras: [
      { emoji: '💛', x: '78%', y: '22%', size: '32px' },
      { emoji: '🫶', x: '84%', y: '35%', size: '36px', delay: '-1.2s' },
      { emoji: '🌸', x: '74%', y: '48%', size: '28px', delay: '-0.6s' },
    ],
    content: `
      <div class="split-shell split-shell--left">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro("Who's in the Room? 🌱", 'Who Belongs Here')}
            <p class="body-copy">cmd-f is open to people who identify as an underrepresented gender in tech, including women, trans, non-binary, and two-spirit participants.</p>
            <blockquote class="quote-block">“We use the term 'underrepresented genders' to reflect who has historically faced — and still faces — systemic barriers in the field.”</blockquote>
            <div class="footer-pill-row">
              ${pill('We ask that everyone trust that the people here are meant to be here.', 'pill--soft pill--wide')}
            </div>
          `, 'glass-card--content split-card')}
        </div>
      </div>
    `,
  },
  {
    id: 5,
    title: 'Allies',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🫶</div>
        ${card(`
          ${pill('Community Care', 'pill--mint')}
          <h2 class="callout-title">Allies, We See You Too.</h2>
          <p class="body-copy body-copy--center">Allyship matters, and we appreciate you being here in the right way.</p>
          <p class="body-copy body-copy--center">Allies are here as volunteers and mentors: to support, not to compete.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 6,
    title: 'Code of Conduct',
    layout: 'two-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Code of Conduct', 'Read This Part')}
        <div class="grid-two">
          ${card(`
            <div class="card-badge">🚫 No Exceptions</div>
            <p class="card-copy">No harassment. No discrimination.</p>
            <p class="card-copy">All participants follow the MLH Code of Conduct at all times.</p>
          `, 'glass-card--content tall-card', 'coral')}
          ${card(`
            <div class="card-badge">🆘 If Something Is Wrong</div>
            <ul class="plain-list">
              <li>Find an organizer in a <strong>navy nwPlus hoodie</strong></li>
              <li><strong>#anonymous-reporting</strong> on Discord</li>
              <li>Email <strong>cmd-f@nwplus.io</strong></li>
            </ul>
          `, 'glass-card--content tall-card', 'mint')}
        </div>
      </div>
    `,
  },
  {
    id: 7,
    title: 'Pronouns & Names',
    layout: 'list-card',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          ${sectionIntro('Names + Pronouns 🏷️', 'Set the Tone', 'center')}
          <div class="do-dont-grid">
            <div class="do-dont-column">
              <div class="column-label">Do</div>
              <div class="list-chip revealable">✅ Use the name on someone's nametag</div>
              <div class="list-chip revealable">✅ Share your pronouns when you introduce yourself</div>
              <div class="list-chip revealable">✅ Use “hackers,” “everyone,” or “folks” instead of “guys”</div>
              <div class="list-chip revealable">✅ Ask politely if you're unsure</div>
            </div>
            <div class="do-dont-column">
              <div class="column-label">Don't</div>
              <div class="list-chip revealable list-chip--warning">❌ Do not assume pronouns based on appearance</div>
              <div class="list-chip revealable list-chip--warning">❌ No deadnaming</div>
            </div>
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 8,
    title: 'Where Things Are',
    layout: 'three-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('📍 Where Things Are Happening', 'Campus Map')}
        <div class="grid-three">
          ${card(`
            <div class="mini-emoji">🎤</div>
            <h3 class="mini-title">Ceremonies</h3>
            <p class="mini-copy">IRC 2 — P.A. Woodward IRC<br>2194 Health Sciences Mall</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">💻</div>
            <h3 class="mini-title">Hacking</h3>
            <p class="mini-copy">LSI East Atrium<br>2350 Health Sciences Mall</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">📚</div>
            <h3 class="mini-title">Everything Else</h3>
            <p class="mini-copy"><strong>Workshops</strong> — LSC 1003</p>
            <p class="mini-copy"><strong>Sponsor + Mentor HQ</strong> — LSC 1416</p>
            <p class="mini-copy"><strong>Sleeping Rooms</strong> — LSC 1423 + 1535</p>
          `, 'glass-card--content mini-card')}
        </div>
      </div>
    `,
  },
  {
    id: 9,
    title: 'Get Connected',
    layout: 'split-right',
    extras: [{ emoji: '📱', x: '13%', y: '28%', size: '72px', delay: '-0.8s' }],
    content: `
      <div class="split-shell split-shell--right">
        <div class="split-column split-column--narrow split-column--ghost">
          <div class="ghost-caption revealable">Open These Now</div>
        </div>
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('📡 Get Connected', 'Do This Before We Move On')}
            <div class="info-grid">
              <div class="info-label">Wi-Fi</div><div class="info-value">cmd-f 2026</div>
              <div class="info-label">Password</div><div class="info-value">nwplus_cmd-f</div>
              <div class="info-label">Discord</div><div class="info-value"><a href="https://cmd-f.nwplus.io/discord" class="hot-link">cmd-f.nwplus.io/discord</a></div>
              <div class="info-label">Schedule</div><div class="info-value"><a href="https://portal.nwplus.io/cmd-f/schedule" class="hot-link">portal.nwplus.io/cmd-f/schedule</a></div>
              <div class="info-label">Devpost</div><div class="info-value"><a href="https://cmd-f-2026.devpost.com" class="hot-link">cmd-f-2026.devpost.com</a></div>
            </div>
          `, 'glass-card--content split-card split-card--navy')}
        </div>
      </div>
    `,
  },
  {
    id: 10,
    title: 'QR Code',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          ${sectionIntro('Your QR Code Is Your Golden Ticket 🎟️', 'Portal Check', 'center')}
          <p class="body-copy body-copy--center"><strong>Log in</strong> → <a href="https://portal.nwplus.io/cmd-f" class="inline-link">portal.nwplus.io/cmd-f</a> → <strong>My Ticket</strong></p>
          <div class="icon-row icon-row--center">
            <span>🍕 Meal verification</span>
            <span>🎟️ Raffle stamps</span>
            <span>🤝 Hacker networking</span>
          </div>
          <div class="footer-pill-row">
            ${pill('Add it to your digital wallet. Future you will thank you.', 'pill--gold pill--wide')}
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 11,
    title: 'ID',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🆔</div>
        ${card(`
          ${pill('Security Check', 'pill--gradient-rabbit')}
          <h2 class="callout-title">Have Your ID Ready</h2>
          <p class="body-copy body-copy--center">Driver's license · Passport · Gov photo ID card · Health card</p>
          <p class="body-copy body-copy--center">Wear your nametag lanyard at all times. Lost it? Info Desk has extras.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 12,
    title: 'Key Times',
    layout: 'full-card',
    extras: [],
    content: `
      <div class="wide-shell">
        ${card(`
          ${sectionIntro('⏰ Key Times to Know', 'Pin These')}
          <div class="day-columns">
            <div class="day-column">
              <div class="day-heading">Saturday March 7</div>
              <div class="day-row"><span>8:30 AM</span><span>Check-in opens (East Entrance, LSI)</span></div>
              <div class="day-row"><span>10:30 AM</span><span>Opening Ceremony <em>You Are Here</em></span></div>
              <div class="day-row day-row--featured"><span>12:00 PM</span><span>🚀 Hacking Begins ${pill('Sky Bloom', 'pill--gradient-bloom')}</span></div>
            </div>
            <div class="day-column">
              <div class="day-heading">Sunday March 8</div>
              <div class="day-row day-row--alert"><span>12:00 PM</span><span>Submissions close on Devpost ${pill('No extensions', 'pill--coral')}</span></div>
              <div class="day-row"><span>1:00 PM</span><span>Panel Judging</span></div>
              <div class="day-row"><span>4:00 PM</span><span>Closing Ceremony 🏆</span></div>
            </div>
          </div>
        `, 'glass-card--content full-card')}
      </div>
    `,
  },
  {
    id: 13,
    title: 'Daylight Saving',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🕰️</div>
        ${card(`
          ${pill('PSA', 'pill--lavender')}
          <h2 class="callout-title">Clocks Jump Forward Tonight</h2>
          <p class="body-copy body-copy--center">2:00 AM → Sunday March 8 → lose 1 hour</p>
          <p class="body-copy body-copy--center">(Very Wonderland energy, honestly. 🐇)</p>
          <p class="body-copy body-copy--center body-copy--strong">March 7 @ 12:00 PM PST → March 8 @ 12:00 PM PDT</p>
          <p class="body-copy body-copy--center">Still exactly 24 hours.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 14,
    title: 'Saturday Schedule',
    layout: 'timeline',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Saturday Schedule ☀️', 'Day One')}
        ${card(`
          <div class="timeline-list">
            ${timelineItem('8:30 AM', 'Check-in + Boothing')}
            ${timelineItem('9:00 AM', 'Team Formation #1', 'LSI 1013')}
            ${timelineItem('10:30 AM', 'Opening Ceremony', 'You are here!', 'timeline-item--active')}
            ${timelineItem('12:00 PM', '🚀 Hacking + Pizza lunch')}
            ${timelineItem('12:00 PM', 'Team Formation #2')}
            ${timelineItem('1:20 PM', 'Workshop: Branding')}
            ${timelineItem('2:40 PM', 'Workshop: Tea Party Networking 🍵')}
            ${timelineItem('4:00 PM', 'Workshop: GitHub')}
            ${timelineItem('5:00 PM', 'Workshop: Recruiting Panel')}
            ${timelineItem('6:00 PM', 'Workshop: Deployment')}
            ${timelineItem('7:15 PM', 'Dinner 🥗')}
          </div>
        `, 'glass-card--content timeline-card')}
      </div>
    `,
  },
  {
    id: 15,
    title: 'Saturday Night',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          ${sectionIntro('Saturday Night Schedule 🌙', 'After Dark', 'center')}
          <div class="night-grid">
            <div class="night-row revealable"><span>8:00 PM</span><span>Workshop: AI Prototyping</span></div>
            <div class="night-row revealable"><span>9:00 PM</span><span>Ping Pong 🏓 + Doodle Pop-Up 🖍️</span></div>
            <div class="night-row revealable"><span>10:30 PM</span><span>Late Night Activity ✨</span></div>
            <div class="night-row revealable"><span>11:00 PM</span><span>SafeWalk Round 1 💛</span></div>
            <div class="night-divider">⸻</div>
            <div class="night-row revealable"><span>12:00 AM</span><span>Sleeping rooms open (LSI 1423 + 1535)</span></div>
            <div class="night-row revealable"><span>12:10 AM</span><span>Midnight Snack 🧋🍩</span></div>
          </div>
          <p class="italic-footer">Sleep is a power move.</p>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 16,
    title: 'Sunday Schedule',
    layout: 'timeline',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Sunday Schedule ☀️', 'Deadline Day')}
        ${card(`
          <div class="timeline-list timeline-list--compact">
            ${timelineItem('8:00 AM', 'Breakfast 🥐')}
            ${timelineItem('9:00 AM', 'MLH Hardware Lab open 🔧')}
            ${timelineItem('12:00 PM', 'SUBMISSIONS DUE', '', 'timeline-item--alert')}
            ${timelineItem('12:20 PM', 'Lunch 🥖')}
            ${timelineItem('1:00 PM', 'Panel Judging')}
            ${timelineItem('3:00 PM', 'Deliberation')}
            ${timelineItem('4:00 PM', 'Closing Ceremony 🏆')}
          </div>
        `, 'glass-card--content timeline-card')}
      </div>
    `,
  },
  {
    id: 17,
    title: 'Meals',
    layout: 'three-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Meal Schedule 🍽️', 'Food + Snacks')}
        <div class="grid-meals">
          ${card(`<div class="mini-emoji">🍕</div><h3 class="mini-title">Sat Lunch</h3><p class="mini-copy">The Mad Hatter's Pizza Party</p>`, 'glass-card--content mini-card')}
          ${card(`<div class="mini-emoji">🥗</div><h3 class="mini-title">Sat Dinner</h3><p class="mini-copy">The Queen of Hearts' Poké Garden<br>(Steve's Poké)</p>`, 'glass-card--content mini-card')}
          ${card(`<div class="mini-emoji">🧋</div><h3 class="mini-title">Midnight</h3><p class="mini-copy">Unbirthday Tea Party<br>Bubble Tea + Donuts + Macarons</p>`, 'glass-card--content mini-card')}
          ${card(`<div class="mini-emoji">🥐</div><h3 class="mini-title">Sun Breakfast</h3><p class="mini-copy">White Rabbit's Morning Dash</p>`, 'glass-card--content mini-card')}
          ${card(`<div class="mini-emoji">🥖</div><h3 class="mini-title">Sun Lunch</h3><p class="mini-copy">Looking Glass Luncheon<br>Sandwiches + Bánh Mì</p>`, 'glass-card--content mini-card')}
        </div>
        <div class="footer-pill-row footer-pill-row--center">
          ${pill("We're all mad here... and a little hungry. 🐱", 'pill--soft pill--wide')}
        </div>
      </div>
    `,
  },
  {
    id: 18,
    title: 'Dietary',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🌿</div>
        ${card(`
          ${pill('Dining Notes', 'pill--mint')}
          <h2 class="callout-title">Dietary Information</h2>
          <p class="body-copy body-copy--center">✅ Vegetarian &nbsp; ✅ Vegan &nbsp; ✅ Halal &nbsp; ✅ Gluten-free options are available at every meal.</p>
          <p class="body-copy body-copy--center">Allergy-friendly snacks are available at the Info Desk.</p>
          <p class="body-copy body-copy--center">⚠️ No food or drinks in ceremony or lecture rooms.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 19,
    title: 'Sleeping',
    layout: 'split-left',
    extras: [{ emoji: '🌙', x: '80%', y: '21%', size: '62px' }],
    content: `
      <div class="split-shell split-shell--left">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('Sleeping at cmd-f 😴', 'Rest Mode')}
            <p class="body-copy">Sleeping rooms open at midnight: <strong>LSI 1423 + 1535</strong></p>
            <div class="bring-list">
              <span class="bring-chip revealable">Sleeping Bag</span>
              <span class="bring-chip revealable">Blanket</span>
              <span class="bring-chip revealable">Pillow</span>
              <span class="bring-chip revealable">Eye Mask</span>
              <span class="bring-chip revealable">Earplugs</span>
            </div>
            <p class="body-copy">Limited blankets at Info Desk (first come, first served)</p>
            <div class="footer-pill-row">
              ${pill('You are not required to stay overnight. Going home is completely valid.', 'pill--soft pill--wide')}
            </div>
          `, 'glass-card--content split-card')}
        </div>
      </div>
    `,
  },
  {
    id: 20,
    title: 'SafeWalk',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🦺</div>
        ${card(`
          ${pill('Late Night Support', 'pill--gold')}
          <h2 class="callout-title">SafeWalk Is Available</h2>
          <p class="body-copy body-copy--center">Two rounds are available for participants staying on campus: ⏰ 11:00 PM &nbsp; / &nbsp; ⏰ 12:00 AM</p>
          <p class="body-copy body-copy--center">Drop by the Info Desk 5 min before.</p>
          <p class="body-copy body-copy--center">(You must have signed up on the RSVP form, so please check that you're on the list.)</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 21,
    title: 'Hacking Rules',
    layout: 'full-card',
    extras: [],
    content: `
      <div class="wide-shell">
        ${card(`
          ${sectionIntro('💻 Hacking Rules', 'Ground Rules')}
          <div class="rules-stack">
            <p class="body-copy">Hacking starts at <strong>12:00 PM PST today.</strong></p>
            <div class="time-banner revealable">March 7 @ 12:00 PM PST → March 8 @ 12:00 PM PDT</div>
            <p class="body-copy">All code, design, and boilerplate must be created during that window.</p>
            <div class="rules-row">
              <span class="rules-chip revealable">Ideas are fine to brainstorm in advance.</span>
              <span class="rules-chip revealable rules-chip--warning">Code written before noon will lead to disqualification.</span>
              <span class="rules-chip revealable">Hardware projects are welcome. The MLH Hardware Lab is open throughout the event.</span>
            </div>
          </div>
        `, 'glass-card--content full-card')}
      </div>
    `,
  },
  {
    id: 22,
    title: 'Teams',
    layout: 'split-right',
    extras: [{ emoji: '👥', x: '13%', y: '27%', size: '72px' }],
    content: `
      <div class="split-shell split-shell--right">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('Teams 👥', 'Build Your Team')}
            <p class="body-copy">Teams can have 1-4 people. Working solo is welcome, but we encourage you to meet people if you can.</p>
            <div class="feature-list">
              <div class="feature-row revealable"><span class="feature-icon">🔍</span><span>Team Formation: 9:00 AM and 12:00 PM in LSI 1013 / 1003</span></div>
              <div class="feature-row revealable"><span class="feature-icon">💬</span><span><strong>#team-formation</strong> on Discord</span></div>
              <div class="feature-row revealable"><span class="feature-icon">🧩</span><span>No team registration needed — add teammates on Devpost when you submit.</span></div>
            </div>
          `, 'glass-card--content split-card')}
        </div>
      </div>
    `,
  },
  {
    id: 23,
    title: 'Submission',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          ${sectionIntro('📬 Submitting Your Project', 'Devpost', 'center')}
          <a href="https://cmd-f-2026.devpost.com" class="mega-link">cmd-f-2026.devpost.com</a>
          <div class="footer-pill-row footer-pill-row--center">
            ${pill('⚠️ March 8 @ 12:00 PM PDT — NO EXTENSIONS.', 'pill--coral pill--large')}
          </div>
          <p class="body-copy body-copy--center">Video demos are optional, but sponsors may use your Devpost to shortlist projects.</p>
          <p class="body-copy body-copy--center">Write a clear description and make sure every teammate is listed before you submit.</p>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 24,
    title: 'Judging',
    layout: 'two-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('🪷 Judging Has Changed This Year', 'New Flow')}
        <div class="grid-two">
          ${card(`
            <div class="card-badge">Round 1</div>
            <p class="card-copy"><strong>1–3 PM</strong></p>
            <p class="card-copy">Every submitted project</p>
            <p class="card-copy">4-min pitch + 2-min Q&amp;A</p>
            <p class="card-copy">Score → finalist eligibility</p>
          `, 'glass-card--content tall-card')}
          ${card(`
            <div class="card-badge">Round 2</div>
            <p class="card-copy"><strong>4–4:40 PM</strong></p>
            <p class="card-copy">Finalists only</p>
            <p class="card-copy">5-min pitch + 2-min Q&amp;A</p>
            <p class="card-copy">Top 3 demo LIVE at Closing</p>
          `, 'glass-card--content tall-card')}
        </div>
        <div class="footer-pill-row footer-pill-row--center">
          ${pill('Finalists will be notified on Discord around 3:45 PM. Keep your ringer on. 🔔', 'pill--soft pill--wide')}
        </div>
      </div>
    `,
  },
  {
    id: 25,
    title: 'Rubric',
    layout: 'stat-grid',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('📋 What Judges Are Looking For', 'Scorecard')}
        <div class="stat-grid">
          ${card(`<div class="stat-icon">⚙️</div><h3 class="stat-title">Technology</h3><p class="mini-copy">Are you using the tools? Using them well?</p>`, 'glass-card--content stat-card')}
          ${card(`<div class="stat-icon">✅</div><h3 class="stat-title">Completion</h3><p class="mini-copy">Does the thing... work?</p>`, 'glass-card--content stat-card')}
          ${card(`<div class="stat-icon">🎨</div><h3 class="stat-title">Design</h3><p class="mini-copy">Is it usable? Accessible? Intentional?</p>`, 'glass-card--content stat-card')}
          ${card(`<div class="stat-icon">🎤</div><h3 class="stat-title">Pitch + Originality</h3><p class="mini-copy">Can you sell it? Is it interesting?</p>`, 'glass-card--content stat-card')}
        </div>
        <p class="body-copy body-copy--center bottom-note">No additional rubric details will be shared by judges or staff. Trust the process. 🌙</p>
      </div>
    `,
  },
  {
    id: 26,
    title: 'New This Year',
    layout: 'list-card',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          ${sectionIntro('New This Year ✨', 'What Changed', 'center')}
          <div class="feature-stack">
            <div class="feature-panel revealable"><strong>🎩 Dedicated Mentor Zones</strong><span>Mentors are assigned to quadrants throughout LSI.</span></div>
            <div class="feature-panel revealable"><strong>🪷 Panel Judging</strong><span>You pitch once to a panel instead of moving through a judging carousel.</span></div>
            <div class="feature-panel revealable"><strong>📱 Hacker Networking</strong><span>Scan each other's QR codes to connect throughout the weekend.</span></div>
            <div class="feature-panel revealable"><strong>🎟️ Digital Stampbook Raffle</strong><span>Attend events, collect stamps, and enter to win prizes.</span></div>
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 27,
    title: 'Raffle',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          ${sectionIntro('🎟️ How the Raffle Works', 'Gamification', 'center')}
          <p class="body-copy body-copy--center">Collect stamps by attending workshops, activities, and key event moments.</p>
          <div class="metric-burst revealable">1 stamp = 1 raffle entry.</div>
          <p class="body-copy body-copy--center">More stamps = better odds 📈</p>
          <p class="body-copy body-copy--center">Track yours: <a href="https://portal.nwplus.io/cmd-f/stampbook" class="inline-link">portal.nwplus.io/cmd-f/stampbook</a></p>
          <p class="body-copy body-copy--center">⚠️ You must be present at Closing Ceremony to claim a prize.</p>
          <div class="footer-pill-row footer-pill-row--center">
            ${pill('Xbox controllers · Speakers · More 👀', 'pill--gradient-gold')}
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 28,
    title: 'First 75',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🌟</div>
        ${card(`
          ${pill('Check-in Bonus', 'pill--gradient-gold')}
          <h2 class="callout-title">First 75 to Check In</h2>
          <p class="body-copy body-copy--center">If you were among the first 75 hackers to arrive this morning:</p>
          <div class="icon-row icon-row--center">
            <span>🍄 Exclusive bonus merch</span>
            <span>🍄 Extra raffle stamps</span>
          </div>
          <p class="body-copy body-copy--center">Already in? You know if you made the cut. 😌</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 29,
    title: 'Mentor Zones',
    layout: 'split-left',
    extras: [{ emoji: '🎩', x: '79%', y: '22%', size: '70px' }],
    content: `
      <div class="split-shell split-shell--left">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('🎩 Mentor Zones', 'Support Is Nearby')}
            <p class="body-copy">Need help? Want a second opinion? Just want to talk through your idea?</p>
            <p class="body-copy">Mentors are stationed in dedicated zones throughout LSI, so support is always nearby.</p>
            <p class="body-copy">Request a ticket in <strong>#request-mentor-ticket</strong> on Discord (opens when hacking starts!)</p>
            <div class="footer-pill-row">
              ${pill("Mentors can help you debug and advise, but they cannot write code or create design assets for you.", 'pill--soft pill--wide')}
            </div>
          `, 'glass-card--content split-card')}
        </div>
      </div>
    `,
  },
  {
    id: 30,
    title: 'Toolhouse Credits',
    layout: 'split-right',
    extras: [{ emoji: '🔥', x: '13%', y: '24%', size: '70px' }],
    content: `
      <div class="split-shell split-shell--right">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('Free AI Credits', 'Toolhouse AI')}
            <p class="body-copy">Toolhouse AI is providing free credits to cmd-f hackers who want to build and deploy AI agents.</p>
            <div class="step-stack">
              <div class="step-card revealable"><span class="step-num">1</span><span>Create a Toolhouse account at <strong>toolhouse.ai</strong> using your cmd-f email</span></div>
              <div class="step-card revealable"><span class="step-num">2</span><span>Fill out the Hacker Credit Request Form linked in Discord</span></div>
              <div class="step-card revealable"><span class="step-num">3</span><span>Credits will be added directly to your account ✨</span></div>
            </div>
            <p class="body-copy">Questions? DM <strong>Anna F (nwPlus)</strong> on Discord.</p>
          `, 'glass-card--content split-card')}
        </div>
      </div>
    `,
  },
  {
    id: 31,
    title: 'Toolhouse Video',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          ${sectionIntro('📹 A Word from Toolhouse AI', 'Video Break', 'center')}
          <div class="video-stage revealable">
            <div class="video-play">▶</div>
            <div class="video-text">[ Video plays here ]</div>
            <div class="video-subtext">Replace this placeholder with the full Google Drive embed URL from Anna F before the ceremony.</div>
          </div>
        `, 'glass-card--content single-card video-card')}
      </div>
    `,
  },
  {
    id: 32,
    title: 'Sponsor Intro',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🌹</div>
        ${card(`
          ${pill('Gratitude Section', 'pill--gradient-dusk')}
          <h2 class="callout-title">This Event Is Made Possible by Our Sponsors.</h2>
          <p class="body-copy body-copy--center">cmd-f 2026 is supported by sponsors who believe in the community we are building here.</p>
          <p class="body-copy body-copy--center">Please visit their booths in the East Atrium. Many are hiring interns and new grads. 👀</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 33,
    title: 'Silver Sponsors',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          <div class="single-header single-header--center">
            ${pill('✨ Silver', 'pill--gradient-dusk')}
            <h2 class="slide-headline">Silver Sponsors</h2>
          </div>
          <div class="logo-grid logo-grid--two">
            <div class="logo-box revealable">1Password logo</div>
            <div class="logo-box revealable">Centre for Digital Media logo</div>
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 34,
    title: 'Bronze Sponsors',
    layout: 'three-col',
    extras: [],
    content: `
      <div class="wide-shell">
        <div class="single-header single-header--center">
          ${pill('🥉 Bronze', 'pill--bronze')}
          <h2 class="slide-headline">Bronze Sponsors</h2>
        </div>
        <div class="sponsor-grid sponsor-grid--six">
          <div class="sponsor-box revealable">Communications Security Establishment (CSE)</div>
          <div class="sponsor-box revealable">GitHub</div>
          <div class="sponsor-box revealable">BCIT Student Association</div>
          <div class="sponsor-box revealable">Smart Cohort</div>
          <div class="sponsor-box revealable">Paraform</div>
          <div class="sponsor-box revealable">UBC Student Alumni Council</div>
        </div>
      </div>
    `,
  },
  {
    id: 35,
    title: 'In-Kind Sponsors',
    layout: 'full-card',
    extras: [],
    content: `
      <div class="wide-shell">
        ${card(`
          <div class="single-header">
            ${pill('💫 In-Kind', 'pill--mint')}
            <h2 class="slide-headline">In-Kind Sponsors</h2>
          </div>
          <div class="pill-cloud">
            ${[
              'Toolhouse AI',
              'Microsoft',
              'ElevenLabs',
              'Lovable',
              'PCCA',
              "Steve's Poké Bar",
              "Koerner's Pub",
              "Barry's Vancouver",
              'Spin Society',
              'Reviva Lounge',
              'Bon Macaron',
              'Limegee',
              'IdeaMatch',
              'Minuteman Press',
            ]
              .map(sponsorPill)
              .join('')}
          </div>
        `, 'glass-card--content full-card')}
      </div>
    `,
  },
  {
    id: 36,
    title: 'Sponsor Prizes',
    layout: 'list-card',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          ${sectionIntro('🏆 Sponsor Prizes: Opt In on Devpost', 'Prize Tracks', 'center')}
          <div class="prize-grid">
            <div class="prize-card revealable"><strong>🔐 1Password — Best Security Hack</strong><span>$100 Best Buy gift card + 1yr 1Password + recruiter chat (per member)</span></div>
            <div class="prize-card revealable"><strong>🎙️ ElevenLabs — Best Use of ElevenLabs</strong><span>3 months Scale Tier ($990 value, per member)</span></div>
            <div class="prize-card revealable"><strong>💜 Lovable — Best Use of Lovable</strong><span>3 months Pro — 100 credits/month per member</span></div>
            <div class="prize-card revealable"><strong>🌿 PCCA — Best Wellness-Related Hack</strong><span>$325 for the winning team</span></div>
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 37,
    title: 'Reviva Lounge',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">✨</div>
        ${card(`
          ${pill('Live Sponsor Moment', 'pill--mint')}
          <h2 class="callout-title">A Word from Reviva Lounge</h2>
          <p class="body-copy body-copy--center">[ Reviva Lounge — 1 to 2 minute live pitch from rep ]</p>
          <p class="body-copy body-copy--center">Reviva Lounge is sponsoring in-kind prizes for our Gamification Raffle. 🌿</p>
          <p class="body-copy body-copy--center">Spa prizes will be available all weekend.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 38,
    title: 'Keynote Intro',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🎤</div>
        ${card(`
          ${pill('11:00 AM – 11:45 AM', 'pill--gradient-gold')}
          <h2 class="callout-title">Please Welcome Our Keynote Panelists.</h2>
          <p class="body-copy body-copy--center">Please welcome our keynote panelists, who have taken time out of their weekend to share their experience with you.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 39,
    title: 'Meet the Panelists',
    layout: 'stat-grid',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Meet Our Panelists 🌟', 'Update Before Stage Time')}
        <div class="panel-grid">
          <div class="panel-card revealable">
            <div class="panel-photo">?</div>
            <div class="panel-name">Panelist Name</div>
            <div class="panel-role">Title · Company</div>
            <div class="panel-fact">Fun fact or short introduction goes here.</div>
          </div>
          <div class="panel-card revealable">
            <div class="panel-photo">?</div>
            <div class="panel-name">Panelist Name</div>
            <div class="panel-role">Title · Company</div>
            <div class="panel-fact">Fun fact or short introduction goes here.</div>
          </div>
          <div class="panel-card revealable">
            <div class="panel-photo">?</div>
            <div class="panel-name">Panelist Name</div>
            <div class="panel-role">Title · Company</div>
            <div class="panel-fact">Fun fact or short introduction goes here.</div>
          </div>
          <div class="panel-card revealable">
            <div class="panel-photo">?</div>
            <div class="panel-name">Panelist Name</div>
            <div class="panel-role">Title · Company</div>
            <div class="panel-fact">Fun fact or short introduction goes here.</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 40,
    title: "Let's Go",
    layout: 'callout',
    extras: [
      { emoji: '💻', x: '10%', y: '58%', size: '32px' },
      { emoji: '✨', x: '84%', y: '18%', size: '28px', delay: '-0.9s' },
    ],
    content: `
      <div class="callout-layout callout-layout--final">
        <div class="callout-emoji revealable">🚀</div>
        ${card(`
          ${pill('Hacking Begins at Noon', 'pill--gradient-bloom')}
          <h2 class="callout-title">You Know What Time It Is.</h2>
          <p class="body-copy body-copy--center">Hacking officially begins at 12:00 PM PST.</p>
          <p class="body-copy body-copy--center">Head to the East Atrium in LSI. Find your spot and get set up.</p>
          <p class="body-copy body-copy--center">You have 24 hours to build something you are proud of.</p>
          <p class="body-copy body-copy--center">We believe in you. Now go build. 💻✨</p>
        `, 'glass-card--content callout-card')}
        ${card(`
          <p class="closing-quote">"The best kind of magic is the kind you make yourself." 🪄</p>
        `, 'glass-card--accent quote-card')}
      </div>
    `,
  },
];

if (slides.length !== 40) {
  throw new Error(`Expected 40 slides, found ${slides.length}`);
}

if (speakerNotes.length !== 40) {
  throw new Error(`Expected 40 speaker notes, found ${speakerNotes.length}`);
}

slides.forEach((slide, index) => {
  if (slide.id !== index + 1) {
    throw new Error(`Slide IDs must be sequential. Expected ${index + 1}, found ${slide.id}`);
  }
  slide.bg = bgForSlide(slide.id);
});

const slideMarkup = slides
  .map(
    (slide) => `
      <section class="slide layout-${slide.layout}" id="slide-${slide.id}" data-bg="${slide.bg}" data-slide-id="${slide.id}">
        <div class="slide-bg"></div>
        <div class="slide-wash"></div>
        <div class="slide-decor">${floaties(slide.extras)}</div>
        <div class="slide-content">${slide.content}</div>
      </section>
    `
  )
  .join('\n');

const slideTitles = slides.map((slide) => slide.title);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cmd-f 2026 — Opening Ceremony</title>
  <style>
    :root {
      --sky: #C2E6FC;
      --cloud: #A9DEFD;
      --grass-top: #80CD7D;
      --grass-mid: #79CA7E;
      --grass-bottom: #67BF83;
      --navy: #1A3786;
      --crimson: #B4143C;
      --coral: #FF6B6B;
      --mint: #4ECDC4;
      --lavender: #A78BFA;
      --gold: #FFD93D;
      --soft-ribbon: #DEEAFA;
      --glass-bg: rgba(255, 255, 255, 0.18);
      --glass-border: rgba(255, 255, 255, 0.45);
      --glass-shadow:
        0 8px 32px rgba(26, 55, 134, 0.12),
        0 2px 8px rgba(26, 55, 134, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
      --safe-width: min(88vw, 1720px);
      --content-height: min(70vh, 760px);
      --card-padding: clamp(28px, 2.6vw, 48px);
      --card-padding-sm: clamp(22px, 2vw, 32px);
      --stack-gap: clamp(16px, 1.5vw, 24px);
      --card-radius: 26px;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--sky);
      color: var(--navy);
      font-family: "SF Pro Display", "Inter", "Helvetica Neue", system-ui, sans-serif;
    }

    body {
      position: relative;
      letter-spacing: -0.02em;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    a:focus-visible,
    button:focus-visible {
      outline: 3px solid rgba(255, 217, 61, 0.95);
      outline-offset: 4px;
    }

    strong {
      font-weight: 700;
    }

    .slide {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .slide.active {
      opacity: 1;
      pointer-events: auto;
      z-index: 2;
    }

    .slide.entering {
      animation: slideEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .slide[data-slide-id="1"].entering {
      animation-duration: 0.8s;
    }

    .slide.exiting {
      animation: slideExit 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      z-index: 1;
    }

    .slide-bg,
    .slide-wash,
    .slide-decor {
      position: absolute;
      inset: 0;
    }

    .slide-bg {
      inset: -16px;
      background-size: cover;
      background-position: center;
      transform: translate(0, 0) scale(1.03);
      transition: transform 0.25s ease-out;
      will-change: transform;
    }

    .slide-wash {
      background:
        radial-gradient(circle at 20% 16%, rgba(255, 255, 255, 0.14), transparent 36%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 36%, rgba(255, 255, 255, 0.08) 100%);
      pointer-events: none;
      z-index: 1;
    }

    .layout-title-hero .slide-wash {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04));
    }

    .slide-decor {
      z-index: 2;
      pointer-events: none;
    }

    .slide-content {
      position: relative;
      z-index: 3;
      width: var(--safe-width);
      height: var(--content-height);
      margin: 8.5vh auto 19.5vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 clamp(8px, 0.8vw, 18px);
    }

    .layout-title-hero .slide-content {
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
    }

    .glass-card {
      position: relative;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.45);
      border-radius: var(--card-radius);
      box-shadow: var(--glass-shadow);
      backdrop-filter: blur(16px) saturate(1.4);
      -webkit-backdrop-filter: blur(16px) saturate(1.4);
      overflow: hidden;
    }

    .glass-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 24%, rgba(255, 255, 255, 0.26) 50%, transparent 76%);
      background-size: 240% 240%;
      opacity: 0.22;
      mix-blend-mode: screen;
      animation: shimmer 6s ease-in-out infinite;
      pointer-events: none;
    }

    .glass-card--hero {
      background: rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(20px) saturate(1.45);
      -webkit-backdrop-filter: blur(20px) saturate(1.45);
    }

    .glass-card--accent {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(26, 55, 134, 0.2);
      backdrop-filter: blur(12px) saturate(1.3);
      -webkit-backdrop-filter: blur(12px) saturate(1.3);
    }

    .accent-coral {
      border-color: rgba(255, 107, 107, 0.55);
      box-shadow:
        0 14px 32px rgba(255, 107, 107, 0.18),
        0 2px 8px rgba(26, 55, 134, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

    .accent-mint {
      border-color: rgba(78, 205, 196, 0.55);
      box-shadow:
        0 14px 32px rgba(78, 205, 196, 0.16),
        0 2px 8px rgba(26, 55, 134, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

    .revealable {
      opacity: 0;
      transform: translateY(16px);
    }

    .slide.entering .revealable {
      animation: cardReveal 0.4s ease forwards;
    }

    .slide.entering .revealable:nth-of-type(1) { animation-delay: 0.1s; }
    .slide.entering .revealable:nth-of-type(2) { animation-delay: 0.2s; }
    .slide.entering .revealable:nth-of-type(3) { animation-delay: 0.3s; }
    .slide.entering .revealable:nth-of-type(4) { animation-delay: 0.4s; }
    .slide.entering .revealable:nth-of-type(5) { animation-delay: 0.5s; }
    .slide.entering .revealable:nth-of-type(6) { animation-delay: 0.6s; }
    .slide.entering .revealable:nth-of-type(7) { animation-delay: 0.7s; }
    .slide.entering .revealable:nth-of-type(8) { animation-delay: 0.8s; }
    .slide.entering .revealable:nth-of-type(9) { animation-delay: 0.9s; }
    .slide.entering .revealable:nth-of-type(10) { animation-delay: 1s; }

    .floaty {
      position: absolute;
      left: var(--x);
      top: var(--y);
      font-size: var(--size);
      opacity: var(--alpha);
      animation: float var(--dur) ease-in-out infinite;
      animation-delay: var(--delay);
      filter: drop-shadow(0 10px 20px rgba(26, 55, 134, 0.12));
      transform-origin: center center;
    }

    .section-intro {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 26px;
    }

    .section-intro--center {
      align-items: center;
      text-align: center;
    }

    .section-kicker {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(26, 55, 134, 0.72);
    }

    .section-title,
    .slide-headline,
    .callout-title {
      margin: 0;
      line-height: 0.96;
      font-weight: 780;
      color: var(--navy);
      text-wrap: balance;
    }

    .section-title {
      font-size: clamp(48px, 4.8vw, 80px);
    }

    .slide-headline {
      font-size: clamp(46px, 4.2vw, 64px);
      text-align: center;
    }

    .callout-title {
      font-size: clamp(50px, 5vw, 74px);
      text-align: center;
      max-width: 15ch;
    }

    .callout-subtitle {
      margin: 0;
      font-size: clamp(24px, 2.2vw, 30px);
      line-height: 1.3;
      text-align: center;
      color: rgba(26, 55, 134, 0.85);
    }

    .body-copy {
      margin: 0;
      font-size: clamp(19px, 1.65vw, 24px);
      line-height: 1.68;
      color: rgba(26, 55, 134, 0.9);
      max-width: 60ch;
      text-wrap: pretty;
    }

    .body-copy--center {
      text-align: center;
      margin-inline: auto;
      max-width: 48ch;
    }

    .body-copy--strong {
      font-weight: 700;
      color: var(--navy);
    }

    .single-shell,
    .callout-layout,
    .wide-shell,
    .split-shell {
      width: 100%;
    }

    .single-shell {
      display: flex;
      justify-content: center;
    }

    .single-shell--wide .single-card {
      width: min(1180px, 100%);
    }

    .single-card {
      width: min(1040px, 100%);
      padding: var(--card-padding);
      display: flex;
      flex-direction: column;
      gap: var(--stack-gap);
    }

    .single-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    .single-header--center {
      align-items: center;
    }

    .callout-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .callout-layout--final {
      gap: 18px;
    }

    .callout-emoji {
      font-size: clamp(58px, 6vw, 90px);
      line-height: 1;
      filter: drop-shadow(0 12px 24px rgba(26, 55, 134, 0.15));
    }

    .callout-card {
      width: min(1120px, 100%);
      padding: var(--card-padding);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--stack-gap);
    }

    .split-shell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 36px;
    }

    .split-shell--right {
      flex-direction: row;
    }

    .split-column {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .split-column--wide {
      width: min(840px, 66vw);
    }

    .split-column--narrow {
      width: min(300px, 24vw);
    }

    .split-column--ghost {
      align-items: center;
      justify-content: center;
    }

    .ghost-caption {
      padding: 12px 22px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.45);
      background: rgba(255, 255, 255, 0.18);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(26, 55, 134, 0.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .split-card,
    .full-card,
    .timeline-card {
      padding: var(--card-padding);
    }

    .split-card--navy {
      background: rgba(26, 55, 134, 0.86);
      color: white;
      border-color: rgba(255, 255, 255, 0.24);
    }

    .split-card--navy .section-title,
    .split-card--navy .section-kicker,
    .split-card--navy .body-copy,
    .split-card--navy .info-label,
    .split-card--navy .info-value {
      color: white;
    }

    .grid-two,
    .grid-three,
    .stat-grid,
    .logo-grid,
    .sponsor-grid,
    .panel-grid,
    .grid-meals {
      display: grid;
      gap: 24px;
    }

    .grid-two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .grid-three {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .grid-meals {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-bottom: 24px;
    }

    .stat-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .logo-grid--two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .sponsor-grid--six,
    .panel-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .mini-card,
    .stat-card,
    .tall-card {
      padding: var(--card-padding-sm);
    }

    .tall-card {
      min-height: 290px;
    }

    .mini-emoji,
    .stat-icon {
      font-size: 38px;
      margin-bottom: 14px;
    }

    .mini-title,
    .stat-title,
    .panel-name {
      margin: 0 0 10px;
      font-size: 24px;
      font-weight: 750;
      color: var(--navy);
    }

    .mini-copy,
    .panel-role,
    .panel-fact,
    .card-copy {
      margin: 0;
      font-size: 18px;
      line-height: 1.62;
      color: rgba(26, 55, 134, 0.86);
      text-wrap: pretty;
    }

    .card-badge,
    .column-label {
      margin-bottom: 14px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(26, 55, 134, 0.68);
    }

    .feature-list,
    .feature-stack,
    .step-stack,
    .rules-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .feature-list--large {
      gap: 18px;
    }

    .feature-row,
    .feature-panel,
    .step-card,
    .prize-card,
    .rules-chip,
    .list-chip,
    .bring-chip {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 20px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.24);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: rgba(26, 55, 134, 0.88);
      line-height: 1.5;
    }

    .feature-icon {
      font-size: 26px;
      line-height: 1;
    }

    .feature-panel,
    .prize-card {
      flex-direction: column;
      align-items: flex-start;
    }

    .feature-panel strong,
    .prize-card strong {
      font-size: 21px;
      color: var(--navy);
    }

    .feature-panel span,
    .prize-card span {
      font-size: 17px;
    }

    .step-card {
      align-items: flex-start;
      font-size: 18px;
    }

    .step-num {
      width: 34px;
      height: 34px;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: linear-gradient(135deg, #1A3786 0%, #A78BFA 100%);
      color: white;
      font-weight: 800;
    }

    .rules-row,
    .bring-list,
    .icon-row,
    .pill-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }

    .icon-row--center {
      justify-content: center;
    }

    .rules-chip--warning,
    .list-chip--warning {
      border-color: rgba(255, 107, 107, 0.48);
      background: rgba(255, 107, 107, 0.15);
    }

    .do-dont-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .do-dont-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-pill-row {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-pill-row--center {
      justify-content: center;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45em;
      padding: 10px 16px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.45);
      background: rgba(255, 255, 255, 0.25);
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--navy);
      box-shadow: 0 10px 22px rgba(26, 55, 134, 0.1);
    }

    .pill--wide {
      padding-inline: 18px;
      text-transform: none;
      letter-spacing: 0;
      font-size: 17px;
      line-height: 1.35;
      font-weight: 650;
    }

    .pill--large {
      font-size: 18px;
      padding: 14px 22px;
    }

    .pill--soft {
      background: rgba(255, 255, 255, 0.2);
    }

    .pill--gold {
      background: rgba(255, 217, 61, 0.24);
      border-color: rgba(255, 217, 61, 0.56);
    }

    .pill--bronze {
      background: linear-gradient(135deg, #b36a35 0%, #ffd0a0 100%);
      border-color: transparent;
      color: white;
    }

    .pill--coral,
    .pill--crimson {
      background: rgba(180, 20, 60, 0.18);
      border-color: rgba(180, 20, 60, 0.45);
      color: var(--crimson);
    }

    .pill--coral {
      background: rgba(255, 107, 107, 0.18);
      border-color: rgba(255, 107, 107, 0.52);
      color: #b33d3d;
    }

    .pill--mint {
      background: rgba(78, 205, 196, 0.18);
      border-color: rgba(78, 205, 196, 0.5);
      color: #0b7c78;
    }

    .pill--lavender {
      background: rgba(167, 139, 250, 0.18);
      border-color: rgba(167, 139, 250, 0.5);
      color: #5b43b6;
    }

    .pill--gradient-dusk {
      background: linear-gradient(135deg, #B4143C 0%, #A78BFA 100%);
      color: white;
      border-color: transparent;
    }

    .pill--gradient-bloom {
      background: linear-gradient(135deg, #4ECDC4 0%, #A9DEFD 100%);
      border-color: transparent;
      color: var(--navy);
    }

    .pill--gradient-gold {
      background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);
      border-color: transparent;
      color: var(--navy);
    }

    .pill--gradient-rabbit {
      background: linear-gradient(135deg, #1A3786 0%, #A78BFA 100%);
      border-color: transparent;
      color: white;
    }

    .quote-block {
      margin: 0;
      padding: 22px 24px;
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.26);
      border: 1px solid rgba(255, 255, 255, 0.42);
      font-size: 24px;
      line-height: 1.5;
      color: rgba(26, 55, 134, 0.88);
    }

    .plain-list {
      margin: 0;
      padding-left: 1.15em;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-size: 20px;
      line-height: 1.6;
      color: rgba(26, 55, 134, 0.88);
    }

    .info-grid {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 20px 18px;
      font-size: 22px;
      align-items: center;
    }

    .info-label {
      font-weight: 700;
      color: rgba(26, 55, 134, 0.72);
    }

    .info-value {
      font-weight: 650;
      color: var(--navy);
      word-break: break-word;
    }

    .hot-link {
      color: #FFD93D;
      font-weight: 750;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 0.18em;
    }

    .inline-link,
    .mega-link {
      color: var(--crimson);
      font-weight: 750;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 0.18em;
    }

    .mega-link {
      display: block;
      font-size: clamp(28px, 3vw, 44px);
      text-align: center;
    }

    .metric-burst,
    .time-banner {
      padding: 18px 22px;
      border-radius: 22px;
      background: linear-gradient(135deg, rgba(26, 55, 134, 0.92) 0%, rgba(167, 139, 250, 0.92) 100%);
      color: white;
      font-size: clamp(28px, 3vw, 40px);
      font-weight: 800;
      text-align: center;
      box-shadow: 0 14px 36px rgba(26, 55, 134, 0.18);
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 130px 28px 1fr;
      align-items: flex-start;
      gap: 16px;
      padding: 18px 10px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.28);
    }

    .timeline-item--active {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 217, 61, 0.7);
      box-shadow: 0 0 0 1px rgba(255, 217, 61, 0.45), 0 14px 28px rgba(26, 55, 134, 0.1);
    }

    .timeline-item--alert {
      border-color: rgba(255, 107, 107, 0.58);
      background: rgba(255, 107, 107, 0.14);
    }

    .timeline-time {
      font-size: 18px;
      font-weight: 800;
      color: var(--navy);
      text-align: right;
      padding-top: 2px;
    }

    .timeline-rail {
      position: relative;
      min-height: 32px;
      display: flex;
      justify-content: center;
    }

    .timeline-rail::before {
      content: "";
      position: absolute;
      top: 6px;
      bottom: -22px;
      width: 2px;
      background: rgba(26, 55, 134, 0.22);
    }

    .timeline-item:last-child .timeline-rail::before {
      display: none;
    }

    .timeline-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--navy);
      margin-top: 6px;
      box-shadow: 0 0 0 6px rgba(26, 55, 134, 0.08);
    }

    .timeline-item--active .timeline-dot {
      background: var(--gold);
      box-shadow: 0 0 0 6px rgba(255, 217, 61, 0.18);
    }

    .timeline-title {
      font-size: 21px;
      font-weight: 740;
      color: var(--navy);
      text-wrap: pretty;
    }

    .timeline-note {
      margin-top: 4px;
      font-size: 16px;
      color: rgba(26, 55, 134, 0.7);
    }

    .night-grid,
    .day-columns,
    .prize-grid {
      display: grid;
      gap: 16px;
    }

    .day-columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
    }

    .day-column {
      padding: var(--card-padding-sm);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.34);
    }

    .day-heading {
      margin-bottom: 14px;
      font-size: 22px;
      font-weight: 760;
      color: var(--navy);
    }

    .day-row,
    .night-row {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      padding: 14px 0;
      border-bottom: 1px solid rgba(26, 55, 134, 0.1);
      font-size: 19px;
      line-height: 1.5;
      color: rgba(26, 55, 134, 0.88);
    }

    .day-row:last-child,
    .night-row:last-child {
      border-bottom: none;
    }

    .day-row span:first-child,
    .night-row span:first-child {
      font-weight: 760;
      color: var(--navy);
      flex: none;
    }

    .day-row--featured,
    .day-row--alert {
      color: var(--navy);
    }

    .night-divider {
      text-align: center;
      color: rgba(26, 55, 134, 0.44);
      letter-spacing: 0.2em;
    }

    .italic-footer {
      margin: 0;
      text-align: center;
      font-size: 20px;
      font-style: italic;
      color: rgba(26, 55, 134, 0.72);
    }

    .bottom-note {
      margin-top: 18px;
    }

    .logo-box,
    .sponsor-box,
    .video-stage {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      padding: var(--card-padding-sm);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.22);
      border: 1px dashed rgba(26, 55, 134, 0.26);
      font-size: 24px;
      font-weight: 720;
      color: rgba(26, 55, 134, 0.7);
      text-align: center;
    }

    .sponsor-box {
      min-height: 120px;
      font-size: 20px;
      font-weight: 680;
    }

    .video-card {
      gap: 26px;
    }

    .video-stage {
      flex-direction: column;
      gap: 12px;
      min-height: 320px;
    }

    .video-play {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);
      color: var(--navy);
      font-size: 34px;
      font-weight: 800;
    }

    .video-text {
      font-size: 28px;
      font-weight: 760;
      color: var(--navy);
    }

    .video-subtext {
      max-width: 48ch;
      font-size: 17px;
      line-height: 1.5;
      color: rgba(26, 55, 134, 0.7);
    }

    .sponsor-pill {
      display: inline-flex;
      align-items: center;
      padding: 14px 18px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.42);
      font-size: 17px;
      font-weight: 700;
      color: rgba(26, 55, 134, 0.82);
    }

    .prize-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .panel-card {
      padding: var(--card-padding-sm);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: var(--glass-shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      text-align: center;
    }

    .panel-photo {
      width: 92px;
      height: 92px;
      margin: 0 auto 18px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 36px;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.94);
      background: linear-gradient(135deg, rgba(26, 55, 134, 0.8), rgba(167, 139, 250, 0.76));
      border: 3px solid rgba(255, 255, 255, 0.5);
    }

    .panel-role {
      margin-bottom: 10px;
    }

    .panel-fact {
      font-style: italic;
    }

    .closing-quote {
      margin: 0;
      font-size: clamp(24px, 2.2vw, 34px);
      line-height: 1.45;
      text-align: center;
      color: var(--navy);
      font-style: italic;
    }

    .quote-card {
      width: min(860px, 100%);
      padding: 26px 30px;
    }

    .quote-card::after {
      content: "";
      position: absolute;
      inset: -40%;
      background: linear-gradient(120deg, transparent 30%, rgba(255, 217, 61, 0.34) 50%, transparent 70%);
      transform: translateX(-55%) rotate(8deg);
      animation: quoteSweep 1.2s ease-in-out 0.9s 1 forwards;
      pointer-events: none;
    }

    .hero-blank {
      width: 100%;
      height: 100%;
    }

    #progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #B4143C, #A78BFA);
      transition: width 0.4s ease;
      z-index: 1001;
    }

    #slide-counter,
    #nav-dots {
      position: fixed;
      z-index: 1000;
    }

    #slide-counter {
      right: 32px;
      bottom: 24px;
      padding: 6px 16px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--navy);
    }

    #nav-dots {
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: min(80vw, 560px);
      flex-wrap: wrap;
      justify-content: center;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 0;
      padding: 0;
      cursor: pointer;
      background: rgba(26, 55, 134, 0.25);
      transition: transform 0.2s ease, background 0.2s ease;
    }

    .dot.active {
      background: var(--navy);
      transform: scale(1.4);
    }

    #notes-drawer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      z-index: 2000;
      padding: 22px 36px 26px;
      max-height: 220px;
      overflow-y: auto;
      background: rgba(26, 55, 134, 0.92);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: white;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    #notes-drawer.visible {
      transform: translateY(0);
    }

    #notes-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 16px;
      line-height: 1.55;
    }

    .notes-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
    }

    .notes-title {
      font-size: 20px;
      font-weight: 750;
    }

    #help-modal {
      position: fixed;
      inset: 0;
      z-index: 2200;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(10, 21, 59, 0.26);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }

    #help-modal.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .help-card {
      width: min(520px, calc(100vw - 32px));
      padding: 28px 32px;
      border-radius: 26px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.42);
      box-shadow: 0 22px 60px rgba(26, 55, 134, 0.2);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      color: var(--navy);
    }

    .help-card h3 {
      margin: 0 0 18px;
      font-size: 28px;
    }

    .help-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 14px 18px;
      font-size: 18px;
      line-height: 1.45;
    }

    .help-key {
      font-weight: 800;
    }

    .hidden {
      display: none;
    }

    @keyframes slideEnter {
      from { opacity: 0; transform: translateY(20px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes slideExit {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(-12px); }
    }

    @keyframes cardReveal {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33% { transform: translateY(-12px) rotate(3deg); }
      66% { transform: translateY(-6px) rotate(-2deg); }
    }

    @keyframes shimmer {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
    }

    @keyframes quoteSweep {
      from { transform: translateX(-55%) rotate(8deg); opacity: 0; }
      40% { opacity: 0.55; }
      to { transform: translateX(55%) rotate(8deg); opacity: 0; }
    }

    @media (max-width: 1200px) {
      .split-column--wide {
        width: min(920px, 100%);
      }

      .split-shell {
        flex-direction: column;
        align-items: stretch;
      }

      .split-column--narrow {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .slide-content {
        width: min(94vw, 920px);
        height: min(72vh, 760px);
        margin: 9vh auto 19vh;
      }

      .grid-two,
      .grid-three,
      .stat-grid,
      .logo-grid--two,
      .sponsor-grid--six,
      .panel-grid,
      .grid-meals,
      .day-columns,
      .do-dont-grid,
      .prize-grid {
        grid-template-columns: 1fr;
      }

      .single-card,
      .split-card,
      .full-card,
      .timeline-card,
      .callout-card {
        padding: 24px 22px;
      }

      .headline,
      .section-title,
      .slide-headline,
      .callout-title {
        font-size: clamp(32px, 7vw, 64px);
      }

      .body-copy,
      .plain-list,
      .mini-copy,
      .card-copy,
      .feature-panel span,
      .prize-card span {
        font-size: clamp(15px, 2.6vw, 22px);
      }

      .info-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .timeline-item {
        grid-template-columns: 92px 20px 1fr;
        gap: 12px;
      }

      .timeline-time {
        font-size: 15px;
      }

      .timeline-title {
        font-size: 17px;
      }

      #slide-counter {
        right: 18px;
        bottom: 18px;
      }

      #nav-dots {
        bottom: 18px;
        gap: 5px;
      }

      .dot {
        width: 4px;
        height: 4px;
      }

      #notes-drawer {
        padding: 18px 18px 22px;
      }
    }
  </style>
</head>
<body>
  <script>
${bgAssets}
  </script>

  <div id="progress-bar"></div>
  <div id="slide-counter">1 / 40</div>
  <div id="nav-dots" aria-label="Slide navigation"></div>

  <div id="notes-drawer" aria-live="polite">
    <div id="notes-content"></div>
  </div>

  <div id="help-modal" aria-hidden="true">
    <div class="help-card">
      <h3>Keyboard Shortcuts</h3>
      <div class="help-grid">
        <div class="help-key">→ / Space</div><div>Next slide</div>
        <div class="help-key">←</div><div>Previous slide</div>
        <div class="help-key">N</div><div>Toggle speaker notes</div>
        <div class="help-key">F</div><div>Fullscreen</div>
        <div class="help-key">?</div><div>This help menu</div>
        <div class="help-key">Esc</div><div>Close this menu</div>
      </div>
    </div>
  </div>

  <div id="slides-container">
${slideMarkup}
  </div>

  <script>
    const speakerNotes = ${JSON.stringify(speakerNotes)};
    const slideTitles = ${JSON.stringify(slideTitles)};

    const bgMap = {
      bg1: IMG_BG1,
      bg2: IMG_BG2,
      bg3: IMG_BG3,
      opening: IMG_OPENING,
    };

    const slideEls = Array.from(document.querySelectorAll('.slide'));
    const dotsContainer = document.getElementById('nav-dots');
    const counterEl = document.getElementById('slide-counter');
    const progressEl = document.getElementById('progress-bar');
    const notesDrawer = document.getElementById('notes-drawer');
    const notesContent = document.getElementById('notes-content');
    const helpModal = document.getElementById('help-modal');

    let current = 0;
    let notesVisible = false;
    let helpVisible = false;
    let touchStartX = 0;

    slideEls.forEach((slide) => {
      const bg = slide.dataset.bg;
      slide.querySelector('.slide-bg').style.backgroundImage = 'url(' + bgMap[bg] + ')';
    });

    function buildDots() {
      dotsContainer.innerHTML = '';
      slideEls.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
        dot.addEventListener('click', (event) => {
          event.stopPropagation();
          goTo(index);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateCounter() {
      counterEl.textContent = String(current + 1) + ' / ' + String(slideEls.length);
    }

    function updateProgress() {
      progressEl.style.width = ((current + 1) / slideEls.length) * 100 + '%';
    }

    function updateDots() {
      Array.from(dotsContainer.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === current);
      });
    }

    function updateNotes() {
      notesContent.innerHTML = '<div class="notes-label">Speaker Notes</div>' +
        '<div class="notes-title">Slide ' + (current + 1) + ' — ' + slideTitles[current] + '</div>' +
        '<div>' + speakerNotes[current] + '</div>';
    }

    function syncChrome() {
      updateCounter();
      updateProgress();
      updateDots();
      updateNotes();
    }

    function activateSlide(index, initial = false) {
      const slide = slideEls[index];
      slide.classList.add('active');
      if (initial) {
        requestAnimationFrame(() => slide.classList.add('entering'));
      } else {
        slide.classList.add('entering');
      }
    }

    function cleanupSlide(slide) {
      slide.classList.remove('active', 'entering', 'exiting');
    }

    function goTo(index) {
      if (index < 0 || index >= slideEls.length || index === current) return;

      const outgoing = slideEls[current];
      const incoming = slideEls[index];

      outgoing.classList.remove('entering');
      outgoing.classList.add('exiting');
      incoming.classList.add('active');

      requestAnimationFrame(() => {
        incoming.classList.add('entering');
      });

      const oldIndex = current;
      current = index;
      syncChrome();

      window.setTimeout(() => {
        if (slideEls[oldIndex] === outgoing && oldIndex !== current) {
          cleanupSlide(outgoing);
        }
      }, 420);
    }

    function nextSlide() {
      goTo(current + 1);
    }

    function prevSlide() {
      goTo(current - 1);
    }

    function toggleNotes(force) {
      notesVisible = typeof force === 'boolean' ? force : !notesVisible;
      notesDrawer.classList.toggle('visible', notesVisible);
      updateNotes();
    }

    function toggleHelp(force) {
      helpVisible = typeof force === 'boolean' ? force : !helpVisible;
      helpModal.classList.toggle('visible', helpVisible);
      helpModal.setAttribute('aria-hidden', String(!helpVisible));
    }

    function closeOverlays() {
      toggleHelp(false);
      toggleNotes(false);
    }

    function toggleFullscreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    }

    function isInteractive(target) {
      return Boolean(
        target.closest('#nav-dots') ||
        target.closest('#notes-drawer') ||
        target.closest('#help-modal') ||
        target.closest('a') ||
        target.closest('button')
      );
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      }
      if (event.key === 'n' || event.key === 'N') {
        toggleNotes();
      }
      if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
      }
      if (event.key === '?' || (event.shiftKey && event.key === '/')) {
        event.preventDefault();
        toggleHelp();
      }
      if (event.key === 'Escape') {
        closeOverlays();
      }
    });

    document.addEventListener('click', (event) => {
      if (isInteractive(event.target)) return;
      const x = event.clientX;
      if (x > window.innerWidth * 0.55) nextSlide();
      if (x < window.innerWidth * 0.45) prevSlide();
    });

    helpModal.addEventListener('click', (event) => {
      if (event.target === helpModal) toggleHelp(false);
    });

    document.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) < 40) return;
      if (deltaX < 0) nextSlide();
      if (deltaX > 0) prevSlide();
    }, { passive: true });

    window.addEventListener('mousemove', (event) => {
      const activeBg = slideEls[current] && slideEls[current].querySelector('.slide-bg');
      if (!activeBg) return;
      const offsetX = ((event.clientX / window.innerWidth) - 0.5) * 16;
      const offsetY = ((event.clientY / window.innerHeight) - 0.5) * 16;
      activeBg.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px) scale(1.03)';
    });

    buildDots();
    activateSlide(0, true);
    syncChrome();
  </script>
</body>
</html>
`;

const outputPath = path.join(ROOT, 'cmdf2026_opening.html');
fs.writeFileSync(outputPath, html);
console.log(`Wrote ${outputPath}`);
console.log(`Slides: ${slides.length}`);
console.log(`Speaker notes: ${speakerNotes.length}`);
