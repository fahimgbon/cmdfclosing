const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function assetReference(...segments) {
  const relativePath = path.join(...segments);
  const assetPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(assetPath)) {
    throw new Error(`Missing background asset: ${relativePath}`);
  }
  return relativePath.split(path.sep).join('/');
}

const bgAssets = [
  ['IMG_BG1', assetReference('images', 'BG1.svg')],
  ['IMG_BG2', assetReference('images', 'BG2.svg')],
  ['IMG_BG3', assetReference('images', 'BG3.svg')],
  ['IMG_CLOSING', assetReference('images', 'closing.svg')],
]
  .map(([name, value]) => `const ${name} = ${JSON.stringify(value)};`)
  .join('\n');

function extractOpeningCss() {
  const openingPath = path.join(ROOT, 'cmdf2026_opening.html');
  if (!fs.existsSync(openingPath)) {
    throw new Error('cmdf2026_opening.html is required so the closing deck can inherit the shared design system.');
  }

  const openingHtml = fs.readFileSync(openingPath, 'utf8');
  const match = openingHtml.match(/<style>([\s\S]*?)<\/style>/);
  if (!match) {
    throw new Error('Could not extract shared CSS from cmdf2026_opening.html');
  }
  return match[1].trim();
}

const sharedCss = extractOpeningCss();

const speakerNotes = [
  "Before starting, test all mics. Judges should be in the front row, sponsors in the second row. Be fully ready to begin at 4:00 PM.",
  "Welcome everyone back and let the room settle. Keep the tone warm, brief, and confident.",
  "Pause long enough for attendees to grab the Closing Ceremony stamp before moving on.",
  "Introduce Joanne plus the two remaining judges from the non-hacker check-in sheet. Confirm names, titles, and pronunciation before ceremony.",
  "Explain the format cleanly: each finalist gets 5 minutes for the panel presentation, then a short transition into 2 minutes of Q&A.",
  "Build energy for the finalist block and remind the room to support all three teams.",
  "Introduce Finalist #1 by team and project name, then step aside.",
  "Repeat for Finalist #2.",
  "Repeat for Finalist #3. When they finish, clearly tell the audience the judges are now deliberating.",
  "Use this as the handoff: while judges deliberate, the ceremony continues with the raffle and side awards.",
  "Emphasize that the raffle is happening during deliberation and that all winners stay seated until end-of-ceremony pickup.",
  "Announce the Xbox controller winners live. No names on screen so you have flexibility.",
  "Announce the Govee TV Backlight Strip winners live.",
  "Announce the JBL Go Speaker winners live.",
  "Announce the Barry's 5-class pack winner live.",
  "Announce the Spin Society winner live and note that this prize is digital through their @cmdf email.",
  "Announce the Koerner's Pub giftcard winners live and note that this prize is digital through their @cmdf email.",
  "Announce the Progression Bouldering pass winners live and note that this is digital through their @cmdf email after the feedback-form check.",
  "Keep momentum high. This is the pivot from raffle into the side-award section while judging continues.",
  "Set up the Best Design award and fill in any final details from the 3:50 PM update.",
  "Announce Best Design and keep the winners seated for later photos.",
  "List all 8 UBC CS Project Hub shortlisted teams. Make clear they will be contacted after the fact.",
  "Set up the nwChoice award and confirm the correct project and presenter.",
  "Announce the nwChoice winner and keep them seated.",
  "Now pivot from side awards into sponsor awards.",
  "Invite the 1Password representative if needed, then announce the category.",
  "Announce the 1Password winner. Ask them to stay seated; prizes and photos happen at the end.",
  "Invite the ElevenLabs representative if needed.",
  "Announce the ElevenLabs winner and keep them seated.",
  "Invite the Lovable representative if needed.",
  "Announce the Lovable winner and keep them seated.",
  "Invite the PCCA representative if needed.",
  "Announce the PCCA winner and keep them seated.",
  "Tell the room we are now down to the Top 3. Announce placements in order: Third, Second, then First.",
  "Reveal Third Place, let the room react, and keep the team seated.",
  "Reveal Second Place, let the room react, and keep the team seated.",
  "This is the big finish. Hype First Place even though the room now knows what is coming.",
  "Call all winners, side-award recipients, sponsor-award recipients, and raffle winners to stay after ceremony for prize pickup and photos. Do not ask anyone to come up during announcements.",
  "Thank hackers, mentors, volunteers, and organizers with real warmth.",
  "Give a general thank-you to sponsors before the tier slide.",
  "Use this slide to shout out each sponsor tier and call out the logo wall.",
  "Close warmly and send people into pickup, photos, and goodbyes.",
];

function bgForSlide(id) {
  if (id === 1) return 'closing';
  return ['bg2', 'bg3', 'bg1'][(id - 2) % 3];
}

function floaties(items = []) {
  return items
    .map(
      (item, index) => `
        <span
          class="floaty ${item.className || ''}"
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

function sectionIntro(title, kicker = '', align = 'left') {
  return `
    <div class="section-intro section-intro--${align}">
      ${kicker ? `<div class="section-kicker">${kicker}</div>` : ''}
      <h2 class="section-title">${title}</h2>
    </div>
  `;
}

function confettiContainer() {
  return `<div class="confetti-container" aria-hidden="true"></div>`;
}

function statCard(icon, numberMarkup, label, note) {
  return card(
    `
      <div class="stat-icon">${icon}</div>
      <div class="closing-stat-number">${numberMarkup}</div>
      <h3 class="stat-title">${label}</h3>
      <p class="mini-copy">${note}</p>
    `,
    'glass-card--content stat-card closing-stat-card'
  );
}

function counterMarkup(target, suffix = '') {
  return `<span class="count-number" data-target="${target}" data-suffix="${suffix}">0${suffix}</span>`;
}

function sponsorPrizeCard({ badgeText, badgeClass, prizeTitle, prizeLines }) {
  return `
    <div class="single-shell single-shell--wide sponsor-center-shell">
      ${card(`
        <div class="single-header single-header--center">
          ${pill(badgeText, badgeClass)}
          <h2 class="slide-headline">${prizeTitle}</h2>
        </div>
        <div class="feature-stack">
          ${prizeLines.map((line) => `<div class="feature-panel revealable prize-panel prize-panel--center"><span>${line}</span></div>`).join('')}
        </div>
        <div class="prize-strip revealable">And the winner is...</div>
      `, 'glass-card--content single-card closing-prize-card')}
    </div>
  `;
}

function winnerReveal({
  title,
  team = '',
  project = '',
  body = '',
  titleClass = '',
  shellClass = '',
  confetti = false,
  eyebrow = '',
}) {
  return `
    <div class="winner-reveal-shell revealable ${shellClass}">
      ${eyebrow ? `<div class="winner-reveal__eyebrow">${eyebrow}</div>` : ''}
      <h1 class="winner-reveal__title ${titleClass}">${title}</h1>
      ${team ? `<div class="winner-reveal__team">${team}</div>` : ''}
      ${project ? `<div class="winner-reveal__project">${project}</div>` : ''}
      ${body ? `<div class="winner-reveal__body">${body}</div>` : ''}
    </div>
    ${confetti ? confettiContainer() : ''}
  `;
}

function finalistDemo(index, name, _unusedProject = '', _unusedDesc = '', bgGlowEmoji = '⭐') {
  return `
    <div class="finalist-demo-shell">
      ${card(`
        <div class="finalist-demo__badge">🌟 Finalist #${index}</div>
        <div class="finalist-demo__team">${name}</div>
        <div class="finalist-demo__rule"></div>
        <div class="finalist-demo__presenting">Presenting Now</div>
      `, 'glass-card--content finalist-demo__card')}
      <div class="finalist-demo__stage">
        <div class="finalist-demo__glow"></div>
        <div class="finalist-demo__star revealable">${bgGlowEmoji}</div>
      </div>
    </div>
  `;
}

const SPONSOR_LOGO_DIR = 'sponsor-logos';

function rafflePrizeSlide(title, note) {
  return winnerReveal({
    title,
    body: note,
    shellClass: 'winner-reveal-shell--soft raffle-prize-shell',
    eyebrow: 'Raffle Prize',
  });
}

function logoSlot(name, fileBase) {
  return `
    <div class="logo-slot revealable">
      <img
        src="${SPONSOR_LOGO_DIR}/${fileBase}.png"
        alt="${name} logo"
        loading="lazy"
        onload="this.closest('.logo-slot').classList.add('logo-slot--loaded')"
        onerror="this.remove()"
      >
      <div class="logo-slot__fallback">${name}</div>
      <div class="logo-slot__hint">${fileBase}.png</div>
    </div>
  `;
}

function sponsorTierRow(label, badgeClass, sponsors) {
  return `
    <div class="sponsor-tier-row">
      <div class="sponsor-tier-row__label">${pill(label, badgeClass)}</div>
      <div class="sponsor-tier-row__logos">
        ${sponsors.map((sponsor) => logoSlot(sponsor.name, sponsor.file)).join('')}
      </div>
    </div>
  `;
}

const legacySlides = [
  {
    id: 1,
    title: 'Closing Title',
    layout: 'title-hero',
    extras: [
      { emoji: '🎉', x: '10%', y: '11%', size: '34px' },
      { emoji: '✨', x: '84%', y: '10%', size: '28px', delay: '-1s' },
      { emoji: '🏆', x: '48%', y: '68%', size: '48px', delay: '-0.4s' },
    ],
    content: `
      <div class="closing-title-overlay revealable">
        <div class="closing-title-label">cmd-f 2026</div>
        <div class="closing-main-title">Closing Ceremony</div>
        <div class="closing-date-ribbon">March 8, 2026</div>
      </div>
    `,
  },
  {
    id: 2,
    title: 'You Made It',
    layout: 'callout',
    extras: [
      { emoji: '💙', x: '80%', y: '16%', size: '28px' },
      { emoji: '🌸', x: '16%', y: '59%', size: '30px', delay: '-1.2s' },
      { emoji: '🪄', x: '74%', y: '40%', size: '30px', delay: '-0.6s' },
    ],
    content: `
      <div class="callout-layout closing-callout">
        <div class="callout-emoji revealable">🥺</div>
        ${card(`
          ${pill('Act I · Reflection', 'pill--gradient-dusk')}
          <h1 class="callout-title">You Actually Did It.</h1>
          <p class="body-copy body-copy--center revealable">Whether you shipped a polished product, a chaotic prototype, or simply made it to Sunday, you showed up.</p>
          <p class="body-copy body-copy--center revealable">And that is genuinely the point.</p>
          <p class="body-copy body-copy--center revealable">Thank you for being in Wonderland with us this weekend. 💛</p>
        `, 'glass-card--hero callout-card')}
      </div>
    `,
  },
  {
    id: 3,
    title: 'By the Numbers',
    layout: 'stat-grid',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('cmd-f 2026, by the numbers 📊', 'Weekend Recap')}
        <div class="stat-grid closing-stat-grid">
          ${statCard('🐇', counterMarkup(170, '+'), 'Hackers', 'A full room of builders, thinkers, and first-timers.')}
          ${statCard('🍕', counterMarkup(5), 'Themed Meals', 'Five Wonderland meals kept everyone going.')}
          ${statCard('💻', '<span class="count-number count-number--placeholder">[N]</span>', 'Projects Submitted', 'Update with the final Devpost count before ceremony.')}
          ${statCard('🎓', counterMarkup(6, '+'), 'Workshops Hosted', 'Skill-building all weekend long.')}
          ${statCard('🧋', '<span class="count-number count-number--static">∞</span>', 'Midnight Bubble Teas', 'Approximately.')}
          ${statCard('🪄', counterMarkup(1), 'Unforgettable Weekend', 'One very memorable trip through Wonderland.')}
        </div>
      </div>
    `,
  },
  {
    id: 4,
    title: 'Weekend Recap',
    layout: 'three-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Things That Happened This Weekend 🎪', 'A Very Quick Recap')}
        <div class="grid-three">
          ${card(`
            <div class="mini-emoji">🍽️</div>
            <h3 class="mini-title">Ate Well</h3>
            <p class="mini-copy">Mad Hatter's Pizza Party · Queen of Hearts' Poké Garden · Unbirthday Tea Party · White Rabbit's Morning Dash · Looking Glass Luncheon</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">🎨</div>
            <h3 class="mini-title">Got Creative</h3>
            <p class="mini-copy">Tote Bag Painting · Doodle Pop-Up · Ping Pong · Late Night Activity</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">💬</div>
            <h3 class="mini-title">Learned a Lot</h3>
            <p class="mini-copy">Branding · Tea Party Networking · GitHub · Recruiting Panel · Deployment · AI Prototyping</p>
          `, 'glass-card--content mini-card')}
        </div>
      </div>
    `,
  },
  {
    id: 5,
    title: '24 Hours',
    layout: 'split-left',
    extras: [
      { emoji: '💻', x: '81%', y: '18%', size: '34px' },
      { emoji: '🐞', x: '76%', y: '33%', size: '30px', delay: '-0.7s' },
      { emoji: '☕', x: '84%', y: '48%', size: '30px', delay: '-1.2s' },
      { emoji: '🌙', x: '72%', y: '60%', size: '34px', delay: '-0.4s' },
    ],
    content: `
      <div class="split-shell split-shell--left">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('24 Hours. Well, Technically. ⏰', 'The Build Window')}
            <p class="body-copy">You started with an idea, or with no idea at all, and ended with something you built with your own hands.</p>
            <p class="body-copy">That is not nothing. That is everything.</p>
            <p class="body-copy">We watched you debug at 3 AM, search frantically at 4 AM, and present with confidence at 1 PM. You did that. 🫶</p>
          `, 'glass-card--content split-card')}
        </div>
      </div>
    `,
  },
  {
    id: 6,
    title: 'A Note from FG & Anna',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell">
        ${card(`
          ${sectionIntro('A Note from FG & Anna 💌', 'One Last Reflection', 'center')}
          <div class="closing-note-quote">"The best kind of magic is the kind you make yourself."</div>
          <p class="body-copy body-copy--center">Watching 170+ brilliant people spend their entire weekend building, learning, and lifting each other up — that is the magic.</p>
          <p class="body-copy body-copy--center">We're so proud to have been your Wonderland this year. 🪄</p>
          <div class="closing-note-attribution">— FG & Anna, cmd-f 2026</div>
          <div class="closing-note-shimmer" aria-hidden="true"></div>
        `, 'glass-card--hero single-card closing-note-card')}
      </div>
    `,
  },
  {
    id: 7,
    title: 'Raffle Setup',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable raffle-emoji">🎟️</div>
        ${card(`
          ${pill('Act II · Recognition', 'pill--gradient-gold')}
          <h2 class="callout-title">Raffle Time. Let's Go.</h2>
          <p class="body-copy body-copy--center">All of that stamp collecting has led to this exact moment.</p>
          <p class="body-copy body-copy--center">1 stamp = 1 raffle entry. More stamps = better odds.</p>
          <p class="body-copy body-copy--center">⚠️ You must be present to claim your prize. If we call your name and you're not here, we move on.</p>
          <div class="footer-pill-row footer-pill-row--center">
            ${pill('Xbox controllers · Speakers · More 👀', 'pill--gradient-gold')}
          </div>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 8,
    title: 'Raffle Drawing',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'and the winner is...',
      team: '[ Draw winner(s) here — announce live ]',
      body: 'Live draw in progress.',
      titleClass: 'winner-reveal__title--crimson',
      shellClass: 'winner-reveal-shell--soft',
      eyebrow: 'Raffle Draw',
    }),
  },
  {
    id: 9,
    title: 'Raffle Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: '🎉 CONGRATULATIONS!! 🎉',
      team: '[ Winner name(s) ]',
      body: 'Please come see an organizer to claim your prize! 🏆',
      titleClass: 'winner-reveal__title--gold',
      confetti: true,
      eyebrow: 'Raffle Winner',
    }),
  },
  {
    id: 10,
    title: 'Sponsor Prizes Intro',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🏆</div>
        ${card(`
          ${pill('Sponsor Recognition', 'pill--gradient-dusk')}
          <h2 class="callout-title">And Now — Sponsor Prizes.</h2>
          <p class="body-copy body-copy--center">This is the part where the hackers who went above and beyond get their flowers. 🌸</p>
          <p class="body-copy body-copy--center">Sponsor reps will now come up to announce their prize winners.</p>
          <p class="body-copy body-copy--center">Please give a massive round of applause for every single person who submitted a project. All of you. 💛</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 11,
    title: '1Password Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🔐 1Password',
      badgeClass: 'pill--gradient-rabbit',
      prizeTitle: 'Best Security Hack',
      prizeLines: [
        '$100 CAD Best Buy gift card',
        '+ 1 free year of 1Password',
        '+ recruiter chat opportunity',
        '(per team member)',
      ],
      presentedBy: 'Presented by 1Password',
    }),
  },
  {
    id: 12,
    title: '1Password Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: '🔐 1Password Winner',
      team: '[ Team Name ]',
      project: '[ Project Name ]',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 13,
    title: 'ElevenLabs Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🎙️ ElevenLabs',
      badgeClass: 'pill--gradient-dusk',
      prizeTitle: 'Best Use of ElevenLabs',
      prizeLines: [
        '3 months ElevenLabs Scale Tier',
        '($990 value, per team member)',
      ],
      presentedBy: 'Presented by ElevenLabs',
    }),
  },
  {
    id: 14,
    title: 'ElevenLabs Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: '🎙️ ElevenLabs Winner',
      team: '[ Team Name ]',
      project: '[ Project Name ]',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 15,
    title: 'Lovable Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '💜 Lovable',
      badgeClass: 'pill--gradient-bloom',
      prizeTitle: 'Best Use of Lovable',
      prizeLines: [
        '3 months Lovable Pro',
        '100 credits/month per team member',
      ],
      presentedBy: 'Presented by Lovable',
    }),
  },
  {
    id: 16,
    title: 'Lovable Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: '💜 Lovable Winner',
      team: '[ Team Name ]',
      project: '[ Project Name ]',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 17,
    title: 'PCCA Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🌿 PCCA',
      badgeClass: 'pill--gradient-gold',
      prizeTitle: 'Best Wellness-Related Hack',
      prizeLines: [
        '$325 for the winning team',
      ],
      presentedBy: 'Presented by PCCA',
    }),
  },
  {
    id: 18,
    title: 'PCCA Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: '🌿 PCCA Winner',
      team: '[ Team Name ]',
      project: '[ Project Name ]',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 19,
    title: 'Additional Sponsor Prizes',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '[ Sponsor Name ]',
      badgeClass: 'pill--soft',
      prizeTitle: '[ Prize Description ]',
      prizeLines: [
        'Update this slide day-of if additional sponsor prizes are added.',
        'Duplicate the 11–18 pattern as needed.',
      ],
      presentedBy: 'Presented by [ Sponsor ]',
    }),
  },
  {
    id: 20,
    title: 'Finalist Demo Intro',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🎤</div>
        ${card(`
          ${pill('Live Demos', 'pill--gradient-gold')}
          <h2 class="callout-title">Okay. Now for the Main Event.</h2>
          <p class="body-copy body-copy--center revealable">Our judges reviewed every project submitted this weekend.</p>
          <p class="body-copy body-copy--center revealable">Three teams were selected to demo live, right now, in front of all of you.</p>
          <p class="body-copy body-copy--center revealable">5-minute pitch. 2-minute Q&A each.</p>
          <p class="body-copy body-copy--center revealable">Please give all three finalist teams an enormous round of applause. 👏</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 21,
    title: 'Finalist #1 Demo',
    layout: 'finalist-demo',
    extras: [],
    content: finalistDemo(1, '[ Team Name ]', '[ Project Name ]', '[ One-line description ]'),
  },
  {
    id: 22,
    title: 'Finalist #2 Demo',
    layout: 'finalist-demo',
    extras: [],
    content: finalistDemo(2, '[ Team Name ]', '[ Project Name ]', '[ One-line description ]'),
  },
  {
    id: 23,
    title: 'Finalist #3 Demo',
    layout: 'finalist-demo',
    extras: [],
    content: finalistDemo(3, '[ Team Name ]', '[ Project Name ]', '[ One-line description ]'),
  },
  {
    id: 24,
    title: 'Deliberation',
    layout: 'centered-single',
    extras: [
      { emoji: '⏳', x: '82%', y: '16%', size: '36px', className: 'spin-float' },
    ],
    content: `
      <div class="single-shell">
        <div class="pulse-halo" aria-hidden="true"></div>
        ${card(`
          ${sectionIntro('⏳ Judges Are Deliberating...', 'Hold Tight', 'center')}
          <p class="body-copy body-copy--center">Our panel of judges are having a Very Serious Discussion right now.</p>
          <p class="body-copy body-copy--center">While we wait, one more enormous round of applause for all of our finalists?</p>
          <p class="body-copy body-copy--center">Building something real in 24 hours is genuinely hard. These teams did it. 👏</p>
        `, 'glass-card--content single-card deliberation-card')}
      </div>
    `,
  },
  {
    id: 25,
    title: 'Moment of Truth',
    layout: 'winner-reveal',
    extras: [],
    content: `
      <div class="winner-reveal-shell revealable winner-reveal-shell--dramatic">
        <h1 class="winner-reveal__title winner-reveal__title--navy dramatic-title">🥁 the moment of truth.</h1>
        <div class="winner-reveal__body dramatic-body">And the winner of cmd-f 2026 is...</div>
      </div>
    `,
  },
  {
    id: 26,
    title: 'Winner',
    layout: 'winner-reveal',
    extras: [],
    content: `
      <div class="winner-reveal-shell revealable winner-reveal-shell--grand">
        <div class="grand-trophy grand-trophy--left">🏆</div>
        <h1 class="winner-reveal__title winner-reveal__title--gold">WINNER!!</h1>
        <div class="grand-trophy grand-trophy--right">🏆</div>
        <div class="winner-reveal__team">[ Team Name ]</div>
        <div class="winner-reveal__project">[ Project Name ]</div>
        <div class="winner-reveal__body">Congratulations!!! 🎉🎉🎉<br>You built something incredible. Take a very deserved bow. 🙇</div>
      </div>
      ${confettiContainer()}
    `,
  },
  {
    id: 27,
    title: 'Honourable Mentions',
    layout: 'list-card',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          ${sectionIntro('🌟 Honourable Mentions', 'Judge Recognition', 'center')}
          <div class="feature-stack">
            <div class="feature-panel revealable"><strong>[ Team 1 ]</strong><span>[ Project Name ]</span></div>
            <div class="feature-panel revealable"><strong>[ Team 2 ]</strong><span>[ Project Name ]</span></div>
            <div class="feature-panel revealable"><strong>[ Team 3 ]</strong><span>[ Project Name ]</span></div>
          </div>
          <div class="footer-pill-row footer-pill-row--center">
            ${pill('Honourable mentions are a real achievement. The judges stopped and paid attention. That matters. 💛', 'pill--lavender pill--wide')}
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 28,
    title: 'Thank You',
    layout: 'three-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('thank you. genuinely. 🙏', 'Act III · Gratitude')}
        <div class="grid-three">
          ${card(`
            <div class="mini-emoji">🎩</div>
            <h3 class="mini-title">Mentors</h3>
            <p class="mini-copy">You debugged, encouraged, and answered questions at 2 AM without complaint. You made cmd-f possible in ways that do not always get enough credit. 💙</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">💛</div>
            <h3 class="mini-title">Volunteers</h3>
            <p class="mini-copy">You scanned QR codes, carried boxes at 6 AM, and hyped up hackers late into the night. You did not have to. You did it anyway. 🧡</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">🌹</div>
            <h3 class="mini-title">Sponsors</h3>
            <p class="mini-copy sponsor-list-compact">1Password · Centre for Digital Media · CSE · GitHub · BCIT SA · Smart Cohort · Paraform · UBC SAC · Toolhouse AI · Microsoft · ElevenLabs · Lovable · PCCA · Steve's Poké · Koerner's Pub · Barry's · Spin Society · Reviva · Bon Macaron · Limegee · IdeaMatch · Minuteman Press</p>
          `, 'glass-card--content mini-card')}
        </div>
      </div>
    `,
  },
  {
    id: 29,
    title: 'Stay Connected',
    layout: 'split-left',
    extras: [{ emoji: '📱', x: '11%', y: '18%', size: '48px' }],
    content: `
      <div class="split-shell split-shell--left">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('before you go 📱', 'Stay Connected')}
            <div class="feature-stack">
              <div class="feature-row revealable"><span class="feature-icon">📸</span><span>Tag your project and us: <strong>#cmdf2026</strong></span></div>
              <div class="feature-row revealable"><span class="feature-icon">📷</span><span>Instagram → <strong>@nwplusubc</strong></span></div>
              <div class="feature-row revealable"><span class="feature-icon">💼</span><span>LinkedIn → <strong>@nwplus</strong></span></div>
              <div class="feature-row revealable"><span class="feature-icon">📘</span><span>Facebook → <strong>nwplusubc</strong></span></div>
              <div class="feature-row revealable"><span class="feature-icon">▶</span><span>YouTube → <strong>@nwPlusUBC</strong></span></div>
              <div class="feature-row revealable"><span class="feature-icon">🔗</span><span><strong>linktr.ee/nwplusubc</strong></span></div>
            </div>
          `, 'glass-card--content split-card')}
        </div>
        <div class="split-column split-column--narrow">
          ${card(`
            <div class="card-badge">📝 Feedback Form</div>
            <p class="card-copy">Please fill out the feedback form.</p>
            <p class="card-copy">It genuinely helps us make next year better. 🙏</p>
            <p class="card-copy"><strong>Link in Discord</strong></p>
          `, 'glass-card--accent split-card feedback-card', 'mint')}
        </div>
      </div>
    `,
  },
  {
    id: 30,
    title: 'Goodbye',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout callout-layout--final farewell-shell">
        <div class="callout-emoji revealable farewell-rabbit">🐇</div>
        ${card(`
          ${pill('Until Next Time', 'pill--gradient-dusk')}
          <h2 class="callout-title farewell-title">until next time.</h2>
          <div class="quote-stack">
            <p class="body-copy body-copy--center">"The best kind of magic is the kind you make yourself."</p>
            <p class="body-copy body-copy--center">You made it. You built something. You belong here.</p>
            <p class="body-copy body-copy--center">See you in the rabbit hole again soon. 💛</p>
          </div>
          <div class="farewell-attribution">— cmd-f 2026 · nwPlus · #cmdf2026</div>
        `, 'glass-card--content callout-card farewell-card')}
        <div class="farewell-floaties revealable" aria-hidden="true">
          <span>🪄</span>
          <span>✨</span>
          <span>💛</span>
        </div>
      </div>
    `,
  },
];

const slides = [
  {
    id: 1,
    title: 'Closing Title',
    layout: 'title-hero',
    extras: [
      { emoji: '🎉', x: '10%', y: '11%', size: '34px' },
      { emoji: '✨', x: '84%', y: '10%', size: '28px', delay: '-1s' },
      { emoji: '🏆', x: '48%', y: '68%', size: '48px', delay: '-0.4s' },
    ],
    content: `
      <div class="closing-title-overlay revealable">
        <div class="closing-title-label">cmd-f 2026</div>
        <div class="closing-main-title">Closing Ceremony</div>
        <div class="closing-date-ribbon">March 8, 2026</div>
      </div>
    `,
  },
  {
    id: 2,
    title: 'Welcome Back',
    layout: 'callout',
    extras: [
      { emoji: '💙', x: '80%', y: '16%', size: '28px' },
      { emoji: '🌸', x: '16%', y: '59%', size: '30px', delay: '-1.2s' },
      { emoji: '🪄', x: '74%', y: '40%', size: '30px', delay: '-0.6s' },
    ],
    content: `
      <div class="callout-layout closing-callout">
        <div class="callout-emoji revealable">🥺</div>
        ${card(`
          ${pill('Act I · Welcome Back', 'pill--gradient-dusk')}
          <h1 class="callout-title">You Made It Back.</h1>
          <p class="body-copy body-copy--center revealable">Whether you shipped a polished product, a chaotic prototype, or simply made it to Sunday, you showed up.</p>
          <p class="body-copy body-copy--center revealable">That matters more than most people realize.</p>
          <p class="body-copy body-copy--center revealable">Thank you for spending this weekend in Wonderland with us. 💛</p>
        `, 'glass-card--hero callout-card')}
      </div>
    `,
  },
  {
    id: 3,
    title: 'Closing Ceremony Stamp',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        ${card(`
          ${pill('Engagement', 'pill--gradient-gold')}
          <h2 class="callout-title">Closing Ceremony Stamp Is Live.</h2>
          <div class="stamp-slide-grid">
            <div class="stamp-slide-copy">
              <p class="body-copy body-copy--center">If you're collecting stamps, this is your moment.</p>
              <p class="body-copy body-copy--center">Scan it now before we move into judge introductions and finalist demos.</p>
              <p class="body-copy body-copy--center">More stamps still means better raffle odds later in the ceremony. ✨</p>
            </div>
            <div class="stamp-qr-placeholder revealable" aria-label="Closing ceremony stamp QR code placeholder">
              <div class="stamp-qr-placeholder__box">QR</div>
              <div class="stamp-qr-placeholder__label">Closing Stamp QR Placeholder</div>
              <div class="stamp-qr-placeholder__hint">Replace with the live QR image before ceremony.</div>
            </div>
          </div>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 4,
    title: 'Meet the Judges',
    layout: 'stat-grid',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Meet the Closing Judges 👩‍⚖️', "Tonight's Panel")}
        <div class="panel-grid">
          <div class="panel-card revealable">
            <div class="panel-photo">J</div>
            <div class="panel-name">Joanne</div>
            <div class="panel-role">Closing Ceremony Judge</div>
            <div class="panel-fact">Add Joanne's title, company, and preferred intro here.</div>
          </div>
          <div class="panel-card revealable">
            <div class="panel-photo">2</div>
            <div class="panel-name">[ Judge Name ]</div>
            <div class="panel-role">From Non-Hacker Check-In Sheet</div>
            <div class="panel-fact">Add title, company, and one short note before ceremony.</div>
          </div>
          <div class="panel-card revealable">
            <div class="panel-photo">3</div>
            <div class="panel-name">[ Judge Name ]</div>
            <div class="panel-role">From Non-Hacker Check-In Sheet</div>
            <div class="panel-fact">Add title, company, and one short note before ceremony.</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 5,
    title: 'How Closing Judging Works',
    layout: 'centered-single',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          ${sectionIntro('How Closing Judging Works 🎤', 'What Happens Next', 'center')}
          <div class="feature-stack">
            <div class="feature-panel revealable"><strong>Step 1</strong><span>Each finalist gives a 5-minute live panel presentation.</span></div>
            <div class="feature-panel revealable"><strong>Step 2</strong><span>We transition directly into a 2-minute Q&amp;A with the judges.</span></div>
            <div class="feature-panel revealable"><strong>Step 3</strong><span>After all finalist demos, the judges deliberate while we run the raffle and side awards.</span></div>
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 6,
    title: 'Finalist Demos',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🌟</div>
        ${card(`
          ${pill('Dedicated Finalist Section', 'pill--gradient-gold')}
          <h2 class="callout-title">Finalist Demos Start Now.</h2>
          <p class="body-copy body-copy--center">Our judges reviewed every submitted project and selected three finalist teams to present live.</p>
          <p class="body-copy body-copy--center">Please give all three teams a huge round of applause before we begin. 👏</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 7,
    title: 'Finalist #1 Demo',
    layout: 'finalist-demo',
    extras: [],
    content: finalistDemo(1, '[ Project Name ]'),
  },
  {
    id: 8,
    title: 'Finalist #2 Demo',
    layout: 'finalist-demo',
    extras: [],
    content: finalistDemo(2, '[ Project Name ]'),
  },
  {
    id: 9,
    title: 'Finalist #3 Demo',
    layout: 'finalist-demo',
    extras: [],
    content: finalistDemo(3, '[ Project Name ]'),
  },
  {
    id: 10,
    title: 'Judges Deliberating',
    layout: 'centered-single',
    extras: [
      { emoji: '⏳', x: '82%', y: '16%', size: '36px', className: 'spin-float' },
    ],
    content: `
      <div class="single-shell">
        <div class="pulse-halo" aria-hidden="true"></div>
        ${card(`
          ${sectionIntro('Judges Are Deliberating ⏳', 'Hold Tight', 'center')}
          <p class="body-copy body-copy--center">Our panel is now discussing the finalist projects.</p>
          <p class="body-copy body-copy--center">While they deliberate, we are moving straight into the raffle and side awards.</p>
          <p class="body-copy body-copy--center">Please keep the energy up for everyone who built and presented this weekend. 💛</p>
        `, 'glass-card--content single-card deliberation-card')}
      </div>
    `,
  },
  {
    id: 11,
    title: 'Raffle During Deliberation',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable raffle-emoji">🎟️</div>
        ${card(`
          ${pill('Raffle During Deliberation', 'pill--gradient-gold')}
          <h2 class="callout-title">Raffle and Prize Pickup.</h2>
          <p class="body-copy body-copy--center">We are running the raffle now while judges deliberate on the main placements.</p>
          <p class="body-copy body-copy--center">All prize winners should stay seated during announcements.</p>
          <p class="body-copy body-copy--center">Prize pickup and photos happen after the ceremony.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 12,
    title: '2 Xbox Controllers',
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide('2 Xbox Controllers', 'Winners Announced Live.'),
  },
  {
    id: 13,
    title: '2 Govee TV Backlight Strips',
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide('2 Govee TV Backlight Strips', 'Winners Announced Live.'),
  },
  {
    id: 14,
    title: '2 JBL Go Speakers',
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide('2 JBL Go Speakers', 'Winners Announced Live.'),
  },
  {
    id: 15,
    title: "1 Barry's 5-Class Pack",
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide("1 Barry's 5-Class Pack", 'Winner Announced Live.'),
  },
  {
    id: 16,
    title: '1 Spin Society Online Prize',
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide('1 Spin Society Online Prize', 'Digital Prize. Winner Will Be Notified Through Their @cmdf Email.'),
  },
  {
    id: 17,
    title: "2 Koerner's Pub Giftcards",
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide("2 Koerner's Pub Giftcards", 'Digital Prize. Winners Will Be Notified Through Their @cmdf Email.'),
  },
  {
    id: 18,
    title: '4 Progression Bouldering Passes',
    layout: 'winner-reveal',
    extras: [],
    content: rafflePrizeSlide('4 Progression Bouldering Passes', 'Digital Prize. Winners Will Be Notified Through Their @cmdf Email After the Feedback Form Check.'),
  },
  {
    id: 19,
    title: 'Side Awards Intro',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🏆</div>
        ${card(`
          ${pill('Side Awards During Deliberation', 'pill--gradient-dusk')}
          <h2 class="callout-title">Side Awards Are Up Next.</h2>
          <p class="body-copy body-copy--center">While the judges finish deliberating, we are recognizing outstanding projects and special prize winners.</p>
          <p class="body-copy body-copy--center">Please celebrate every team we call. None of this was easy. 🌸</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 20,
    title: 'Best Design Award',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🎨 Best Design',
      badgeClass: 'pill--coral',
      prizeTitle: 'Best Design Award',
      prizeLines: [
        'Recognizing outstanding visual polish, clarity, and overall user experience.',
      ],
    }),
  },
  {
    id: 21,
    title: 'Best Design Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'Best Design Winner',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Side Award',
    }),
  },
  {
    id: 22,
    title: 'UBC CS Project Hub Shortlist',
    layout: 'list-card',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide">
        ${card(`
          ${sectionIntro('Shortlisted for UBC CS Project Hub', 'Special Recognition', 'center')}
          <div class="grid-two ubc-shortlist-grid">
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 1 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 2 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 3 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 4 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 5 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 6 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 7 ]</strong></div>
            <div class="feature-panel revealable shortlist-panel"><strong>[ Shortlisted Project 8 ]</strong></div>
          </div>
          <div class="footer-pill-row footer-pill-row--center">
            ${pill('These eight teams will be contacted after the fact by UBC CS Project Hub.', 'pill--mint pill--wide')}
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 23,
    title: 'nwChoice Award',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '💛 nwChoice',
      badgeClass: 'pill--gradient-bloom',
      prizeTitle: 'nwChoice Award',
      prizeLines: [
        'Recognizing a project that stood out to the nwPlus team.',
      ],
    }),
  },
  {
    id: 24,
    title: 'nwChoice Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'nwChoice Winner',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Side Award',
    }),
  },
  {
    id: 25,
    title: 'Sponsor Prize Transition',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🏅</div>
        ${card(`
          ${pill('Sponsor Prize Spotlight', 'pill--gradient-gold')}
          <h2 class="callout-title">Now for the Sponsor Awards.</h2>
          <p class="body-copy body-copy--center">These awards recognize standout projects across specific tools, categories, and challenge themes.</p>
          <p class="body-copy body-copy--center">As each winner is announced, please stay seated. Prize pickup and photos happen at the end.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 26,
    title: '1Password Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🔐 1Password',
      badgeClass: 'pill--gradient-rabbit',
      prizeTitle: 'Best Security Hack',
      prizeLines: [
        '$100 CAD Best Buy Gift Card',
        '+ 1 Free Year of 1Password',
        '+ Recruiter Chat Opportunity',
        '(Per Team Member)',
      ],
    }),
  },
  {
    id: 27,
    title: '1Password Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: '1Password Winner',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 28,
    title: 'ElevenLabs Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🎙️ ElevenLabs',
      badgeClass: 'pill--gradient-dusk',
      prizeTitle: 'Best Use of ElevenLabs',
      prizeLines: [
        '3 Months of ElevenLabs Scale Tier',
        '($990 Value, Per Team Member)',
      ],
    }),
  },
  {
    id: 29,
    title: 'ElevenLabs Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'ElevenLabs Winner',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 30,
    title: 'Lovable Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '💜 Lovable',
      badgeClass: 'pill--gradient-bloom',
      prizeTitle: 'Best Use of Lovable',
      prizeLines: [
        '3 Months of Lovable Pro',
        '100 Credits per Month per Team Member',
      ],
    }),
  },
  {
    id: 31,
    title: 'Lovable Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'Lovable Winner',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 32,
    title: 'PCCA Prize',
    layout: 'split-right',
    extras: [],
    content: sponsorPrizeCard({
      badgeText: '🌿 PCCA',
      badgeClass: 'pill--gradient-gold',
      prizeTitle: 'Best Wellness-Related Hack',
      prizeLines: [
        '$325 for the Winning Team',
      ],
    }),
  },
  {
    id: 33,
    title: 'PCCA Winner',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'PCCA Winner',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Sponsor Prize',
    }),
  },
  {
    id: 34,
    title: 'Top Three',
    layout: 'winner-reveal',
    extras: [],
    content: `
      <div class="winner-reveal-shell revealable winner-reveal-shell--dramatic winner-reveal-shell--soft">
        <div class="winner-reveal__eyebrow">Main Awards</div>
        <h1 class="winner-reveal__title winner-reveal__title--navy dramatic-title">The Top Three Teams</h1>
        <div class="winner-reveal__body dramatic-body">We will announce Third Place, then Second Place, and finally First Place.</div>
      </div>
    `,
  },
  {
    id: 35,
    title: 'Third Place',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'Third Place',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Top Three',
    }),
  },
  {
    id: 36,
    title: 'Second Place',
    layout: 'winner-reveal',
    extras: [],
    content: winnerReveal({
      title: 'Second Place',
      team: '[ Project Name ]',
      body: 'Please stay seated. Prize pickup and photos happen at the end.',
      confetti: true,
      eyebrow: 'Top Three',
    }),
  },
  {
    id: 37,
    title: 'First Place',
    layout: 'winner-reveal',
    extras: [],
    content: `
      <div class="winner-reveal-shell revealable winner-reveal-shell--grand">
        <div class="grand-trophy grand-trophy--left">🏆</div>
        <h1 class="winner-reveal__title">First Place</h1>
        <div class="grand-trophy grand-trophy--right">🏆</div>
        <div class="winner-reveal__team">[ Project Name ]</div>
        <div class="winner-reveal__body">Your cmd-f 2026 winner. Please stay seated for prize pickup and photos at the end.</div>
      </div>
      ${confettiContainer()}
    `,
  },
  {
    id: 38,
    title: 'Quick Prize Reminder',
    layout: 'split-left',
    extras: [{ emoji: '📸', x: '12%', y: '18%', size: '48px' }],
    content: `
      <div class="split-shell split-shell--left">
        <div class="split-column split-column--wide">
          ${card(`
            ${sectionIntro('Quick Prize Reminder', 'Before We Wrap')}
            <div class="feature-stack">
              <div class="feature-row revealable"><span class="feature-icon">🏆</span><span>Raffle winners, side-award winners, sponsor-award winners, and the Top 3 should stay after the ceremony.</span></div>
              <div class="feature-row revealable"><span class="feature-icon">📸</span><span>Prize pickup and official photos happen at the end, not during the announcements.</span></div>
              <div class="feature-row revealable"><span class="feature-icon">🎤</span><span>Please stay in place until an organizer calls your section forward.</span></div>
            </div>
          `, 'glass-card--content split-card')}
        </div>
        <div class="split-column split-column--narrow">
          ${card(`
            <div class="card-badge">Stage Flow</div>
            <p class="card-copy">Keep aisles clear.</p>
            <p class="card-copy">Sponsors remain seated until called.</p>
            <p class="card-copy">Organizers will manage photo order.</p>
          `, 'glass-card--accent split-card feedback-card', 'mint')}
        </div>
      </div>
    `,
  },
  {
    id: 39,
    title: 'Thank You',
    layout: 'three-col',
    extras: [],
    content: `
      <div class="wide-shell">
        ${sectionIntro('Thank You. Genuinely. 🙏', 'Act III · Gratitude')}
        <div class="grid-three">
          ${card(`
            <div class="mini-emoji">💻</div>
            <h3 class="mini-title">Hackers</h3>
            <p class="mini-copy">You took an idea from zero to real in a single weekend. That takes courage, skill, and a lot of trust in yourselves.</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">🎩</div>
            <h3 class="mini-title">Mentors and Volunteers</h3>
            <p class="mini-copy">You answered questions, solved problems, moved furniture, tested gear, and helped the whole event keep running.</p>
          `, 'glass-card--content mini-card')}
          ${card(`
            <div class="mini-emoji">🫶</div>
            <h3 class="mini-title">Organizers</h3>
            <p class="mini-copy">Thank you for planning, coordinating, and carrying this event from first idea to final photo.</p>
          `, 'glass-card--content mini-card')}
        </div>
      </div>
    `,
  },
  {
    id: 40,
    title: 'Sponsor Shoutout',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout">
        <div class="callout-emoji revealable">🤝</div>
        ${card(`
          ${pill('Sponsor Gratitude', 'pill--gradient-dusk')}
          <h2 class="callout-title">Thank You to Our Sponsors.</h2>
          <p class="body-copy body-copy--center">cmd-f 2026 happened because our sponsors believed in this community, this room, and your ideas.</p>
          <p class="body-copy body-copy--center">Please help us thank every partner who invested in the weekend and in everyone building here today.</p>
        `, 'glass-card--content callout-card')}
      </div>
    `,
  },
  {
    id: 41,
    title: 'Sponsor Tiers',
    layout: 'list-card',
    extras: [],
    content: `
      <div class="single-shell single-shell--wide sponsor-tier-shell">
        ${card(`
          ${sectionIntro('Sponsor Tiers', 'Add Logos to sponsor-logos/name.png', 'center')}
          <div class="sponsor-tier-stack">
            ${sponsorTierRow('Silver Sponsors', 'pill--gradient-dusk', [
              { name: '1Password', file: '1password' },
              { name: 'Centre for Digital Media', file: 'centre-for-digital-media' },
            ])}
            ${sponsorTierRow('Bronze Sponsors', 'pill--bronze', [
              { name: 'BCIT SA', file: 'bcit-sa' },
              { name: 'UBC SAC', file: 'ubc-sac' },
              { name: 'GitHub', file: 'github' },
              { name: 'CSE', file: 'cse' },
              { name: 'Smart Cohort', file: 'smart-cohort' },
              { name: 'Paraform', file: 'paraform' },
            ])}
            ${sponsorTierRow('In-Kind Sponsors', 'pill--mint', [
              { name: 'Toolhouse AI', file: 'toolhouse-ai' },
              { name: 'Microsoft', file: 'microsoft' },
              { name: 'ElevenLabs', file: 'elevenlabs' },
              { name: 'Lovable', file: 'lovable' },
              { name: 'PCCA', file: 'pcca' },
              { name: "Steve's Poké Bar", file: 'steves-poke-bar' },
              { name: "Koerner's Pub", file: 'koerners-pub' },
              { name: "Barry's Vancouver", file: 'barrys-vancouver' },
              { name: 'Spin Society', file: 'spin-society' },
              { name: 'Reviva Lounge', file: 'reviva-lounge' },
              { name: 'Bon Macaron', file: 'bon-macaron' },
              { name: 'Limegee', file: 'limegee' },
              { name: 'IdeaMatch', file: 'ideamatch' },
              { name: 'Minuteman Press', file: 'minuteman-press' },
            ])}
          </div>
        `, 'glass-card--content single-card')}
      </div>
    `,
  },
  {
    id: 42,
    title: 'Goodbye',
    layout: 'callout',
    extras: [],
    content: `
      <div class="callout-layout callout-layout--final farewell-shell">
        <div class="callout-emoji revealable farewell-rabbit">🐇</div>
        ${card(`
          ${pill('Until Next Time', 'pill--gradient-dusk')}
          <h2 class="callout-title farewell-title">Until Next Time.</h2>
          <div class="quote-stack">
            <p class="body-copy body-copy--center">"The best kind of magic is the kind you make yourself."</p>
            <p class="body-copy body-copy--center">You made it. You built something. You belong here.</p>
            <p class="body-copy body-copy--center">See you in the rabbit hole again soon. 💛</p>
          </div>
          <div class="farewell-attribution">— cmd-f 2026 · nwPlus · #cmdf2026</div>
        `, 'glass-card--content callout-card farewell-card')}
        <div class="farewell-floaties revealable" aria-hidden="true">
          <span>🪄</span>
          <span>✨</span>
          <span>💛</span>
        </div>
      </div>
    `,
  },
];

if (slides.length !== 42) {
  throw new Error(`Expected 42 slides, found ${slides.length}`);
}

if (speakerNotes.length !== 42) {
  throw new Error(`Expected 42 speaker notes, found ${speakerNotes.length}`);
}

slides.forEach((slide, index) => {
  if (slide.id !== index + 1) {
    throw new Error(`Slide IDs must be sequential. Expected ${index + 1}, found ${slide.id}`);
  }
  slide.bg = bgForSlide(slide.id);
  if (!slide.bg) {
    throw new Error(`Missing background assignment for slide ${slide.id}`);
  }
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

const extraCss = `
/* Closing-only additions */
html,
body,
button,
input,
textarea,
select {
  font-family: "Bree Serif", serif;
}

.slide-content {
  padding-inline: clamp(24px, 3vw, 56px);
}

.layout-callout .slide-content {
  width: min(95vw, 1640px);
}

.layout-list-card .slide-content {
  width: min(97vw, 1760px);
}

.layout-winner-reveal .slide-content {
  width: min(94vw, 1580px);
  height: min(72vh, 780px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-finalist-demo .slide-content {
  width: min(94vw, 1650px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.callout-card,
.single-card,
.split-card,
.finalist-demo__card,
.closing-prize-card,
.panel-card {
  padding: clamp(30px, 3.2vw, 54px);
}

.callout-title {
  font-size: clamp(48px, 5vw, 74px);
}

.section-title,
.slide-headline {
  font-size: clamp(40px, 3.8vw, 58px);
}

.body-copy {
  font-size: clamp(21px, 1.65vw, 27px);
}

.mini-copy,
.panel-role,
.panel-fact,
.feature-panel span,
.feature-row span,
.card-copy {
  font-size: clamp(18px, 1.3vw, 23px);
}

.body-copy,
.mini-copy,
.panel-role,
.panel-fact,
.feature-panel span,
.feature-row span,
.card-copy,
.winner-reveal__body {
  line-height: 1.65;
  text-wrap: pretty;
}

.callout-title,
.section-title,
.slide-headline,
.mini-title,
.panel-name,
.winner-reveal__title,
.winner-reveal__team,
.winner-reveal__project {
  text-wrap: balance;
}

#section-nav {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  width: min(95vw, 1280px);
  padding: 10px 14px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.24);
  box-shadow: 0 18px 32px rgba(26, 55, 134, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.section-nav__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(26, 55, 134, 0.72);
  white-space: nowrap;
}

#section-nav-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: auto;
  scrollbar-width: none;
  max-width: 100%;
  padding-bottom: 2px;
}

#section-nav-buttons::-webkit-scrollbar {
  display: none;
}

.section-tab {
  border: 0;
  border-radius: 999px;
  min-width: 38px;
  padding: 8px 12px;
  background: rgba(26, 55, 134, 0.08);
  color: rgba(26, 55, 134, 0.82);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  flex: 0 0 auto;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.section-tab:hover,
.section-tab:focus-visible {
  background: rgba(26, 55, 134, 0.16);
  transform: translateY(-1px);
}

.section-tab.active {
  background: linear-gradient(135deg, rgba(26, 55, 134, 0.9), rgba(180, 20, 60, 0.85));
  color: white;
}

.slide[data-bg="closing"] .slide-bg {
  background-position: center center;
}

.closing-title-overlay {
  text-align: center;
  padding: clamp(28px, 3vw, 48px) clamp(36px, 4vw, 72px);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 18px 48px rgba(26, 55, 134, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.closing-title-label {
  font-size: 22px;
  font-weight: 600;
  color: var(--navy);
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.closing-main-title {
  font-size: clamp(68px, 7vw, 104px);
  font-weight: 800;
  color: var(--crimson);
  line-height: 1.05;
  text-wrap: balance;
}

.closing-date-ribbon {
  display: inline-block;
  background: rgba(222, 234, 250, 0.9);
  border-radius: 100px;
  padding: 10px 32px;
  font-size: 26px;
  font-weight: 700;
  color: var(--navy);
  margin-top: 20px;
}

.closing-callout .body-copy {
  max-width: 46ch;
}

.stamp-slide-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 320px);
  align-items: center;
  gap: clamp(24px, 3vw, 42px);
}

.stamp-slide-copy {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stamp-qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.38);
}

.stamp-qr-placeholder__box {
  width: min(260px, 24vw);
  aspect-ratio: 1 / 1;
  border-radius: 22px;
  border: 2px dashed rgba(26, 55, 134, 0.34);
  display: grid;
  place-items: center;
  background:
    linear-gradient(90deg, rgba(26, 55, 134, 0.06) 49%, transparent 49%, transparent 51%, rgba(26, 55, 134, 0.06) 51%),
    linear-gradient(rgba(26, 55, 134, 0.06) 49%, transparent 49%, transparent 51%, rgba(26, 55, 134, 0.06) 51%);
  background-size: 18px 18px;
  color: rgba(26, 55, 134, 0.72);
  font-size: clamp(34px, 3vw, 42px);
  font-weight: 700;
}

.stamp-qr-placeholder__label {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
  text-align: center;
}

.stamp-qr-placeholder__hint {
  font-size: 15px;
  line-height: 1.45;
  color: rgba(26, 55, 134, 0.68);
  text-align: center;
}

.closing-stat-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.closing-stat-card {
  text-align: center;
  align-items: center;
}

.closing-stat-number {
  font-size: clamp(42px, 4.6vw, 68px);
  font-weight: 800;
  line-height: 1;
  color: var(--crimson);
  margin-bottom: 10px;
}

.count-number {
  display: inline-block;
  min-width: 2ch;
}

.count-number--placeholder,
.count-number--static {
  color: var(--crimson);
}

.closing-note-card {
  position: relative;
  overflow: hidden;
}

.closing-note-quote {
  font-size: clamp(26px, 2.6vw, 34px);
  line-height: 1.5;
  text-align: center;
  color: var(--navy);
  font-style: italic;
  max-width: 34ch;
  margin: 0 auto;
}

.closing-note-attribution {
  text-align: center;
  font-size: 16px;
  font-weight: 650;
  color: rgba(26, 55, 134, 0.7);
}

.closing-note-shimmer {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 217, 61, 0.75) 50%, transparent 100%);
  background-size: 240% 100%;
  animation: shimmer 3s ease-in-out infinite;
  opacity: 0.9;
}

.raffle-emoji {
  animation: raffleBounce 0.6s ease 1;
}

@keyframes raffleBounce {
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  45% { transform: scale(0.9); }
  70% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.winner-reveal-shell {
  width: min(1120px, 100%);
  min-height: min(62vh, 720px);
  padding: clamp(40px, 4vw, 72px);
  border-radius: 34px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 24px 64px rgba(26, 55, 134, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.winner-reveal-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(26, 55, 134, 0.1), rgba(255, 255, 255, 0.04));
  pointer-events: none;
}

.winner-reveal-shell > * {
  position: relative;
  z-index: 1;
}

.winner-reveal-shell--soft {
  background: rgba(255, 255, 255, 0.14);
}

.winner-reveal-shell--dramatic {
  background: rgba(255, 255, 255, 0.16);
}

.winner-reveal-shell--grand {
  background: rgba(255, 255, 255, 0.24);
}

.winner-reveal__eyebrow {
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(26, 55, 134, 0.74);
}

.winner-reveal__title {
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 800;
  line-height: 1.08;
  background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 18px;
  text-wrap: balance;
}

.winner-reveal__title--crimson {
  background: none;
  -webkit-text-fill-color: var(--crimson);
  color: var(--crimson);
}

.winner-reveal__title--navy {
  background: none;
  -webkit-text-fill-color: var(--navy);
  color: var(--navy);
}

.winner-reveal__team {
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  color: var(--crimson);
  margin-bottom: 12px;
  text-wrap: balance;
}

.winner-reveal__project {
  font-size: clamp(22px, 3.5vw, 40px);
  font-weight: 600;
  color: var(--navy);
  opacity: 0.82;
  margin-bottom: 24px;
  text-wrap: balance;
}

.winner-reveal__body {
  font-size: clamp(24px, 2.1vw, 30px);
  color: rgba(26, 55, 134, 0.86);
  line-height: 1.55;
  max-width: 34ch;
}

.raffle-prize-shell .winner-reveal__body {
  max-width: 32ch;
}

.grand-trophy {
  position: absolute;
  top: 44px;
  font-size: clamp(46px, 5vw, 72px);
  transform: scale(0) rotate(-15deg);
}

.grand-trophy--left {
  left: 44px;
}

.grand-trophy--right {
  right: 44px;
}

.slide.active .grand-trophy {
  animation: trophyReveal 0.7s ease forwards;
}

.slide.active .grand-trophy--right {
  animation-delay: 0.06s;
}

@keyframes trophyReveal {
  0%   { transform: scale(0) rotate(-15deg); }
  60%  { transform: scale(1.2) rotate(5deg); }
  80%  { transform: scale(0.95) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 4;
}

.slide:not(.active) .confetti-container {
  display: none;
}

@keyframes confettiFall {
  0%   { transform: translateY(-10vh) rotate(var(--rot-start)); opacity: 1; }
  100% { transform: translateY(110vh) rotate(var(--rot-end)); opacity: 0; }
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

.closing-prize-shell {
  align-items: stretch;
}

.closing-prize-card {
  min-height: 420px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}

.slide-headline--left {
  text-align: left;
}

.sponsor-center-shell {
  align-items: center;
  justify-content: center;
}

.prize-panel {
  background: rgba(255, 255, 255, 0.18);
}

.prize-panel--center {
  text-align: center;
}

.prize-panel span {
  font-size: clamp(22px, 1.7vw, 28px);
  line-height: 1.55;
}

.prize-strip {
  margin-top: 10px;
  font-size: 32px;
  font-style: italic;
  color: rgba(26, 55, 134, 0.8);
}

.finalist-demo-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(32px, 3vw, 48px);
  width: 100%;
  height: 100%;
  position: relative;
}

.finalist-demo__card {
  flex: 0 0 min(960px, 100%);
  padding: clamp(36px, 3vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.finalist-demo__badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 8px 20px;
  border-radius: 100px;
  background: linear-gradient(135deg, #FFD93D, #FF6B6B);
  color: #1A3786;
  margin-inline: auto;
  margin-bottom: 24px;
}

.finalist-demo__team {
  font-size: clamp(42px, 4.4vw, 58px);
  font-weight: 800;
  color: #1A3786;
  margin-bottom: 18px;
}

.finalist-demo__rule {
  width: min(380px, 100%);
  height: 1px;
  background: rgba(26, 55, 134, 0.16);
  margin-bottom: 20px;
}

.finalist-demo__presenting {
  font-size: 18px;
  font-style: italic;
  color: #9f7c00;
}

.finalist-demo__stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  pointer-events: none;
}

.finalist-demo__glow {
  width: min(320px, 40vw);
  height: min(320px, 40vw);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 36%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

.finalist-demo__star {
  position: absolute;
  top: 18%;
  font-size: 34px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.08); opacity: 1; }
}

.pulse-halo {
  position: absolute;
  width: min(520px, 78vw);
  height: min(520px, 78vw);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255,255,255,0.06) 34%, transparent 72%);
  animation: pulse 2s ease-in-out infinite;
  z-index: 0;
}

.deliberation-card {
  position: relative;
  z-index: 1;
}

.spin-float {
  animation: slowSpin 8s linear infinite;
}

@keyframes slowSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.dramatic-title {
  animation: momentDrop 0.45s ease forwards;
}

.dramatic-body {
  opacity: 0;
}

.slide.active .dramatic-body {
  animation: bodyFadeIn 0.45s ease 0.6s forwards;
}

@keyframes momentDrop {
  from { opacity: 0; transform: translateY(-24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bodyFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.sponsor-list-compact {
  font-size: 16px;
  line-height: 1.7;
}

.sponsor-tier-grid {
  align-items: stretch;
}

.sponsor-tier-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sponsor-tier-row {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 16px;
  align-items: start;
}

.sponsor-tier-row__label {
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;
}

.sponsor-tier-row__logos {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.logo-slot {
  width: 132px;
  min-height: 92px;
  padding: 10px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 14px 28px rgba(26, 55, 134, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
}

.logo-slot img {
  max-width: 100%;
  max-height: 46px;
  object-fit: contain;
}

.logo-slot__fallback {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  color: rgba(26, 55, 134, 0.9);
}

.logo-slot__hint {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(26, 55, 134, 0.56);
}

.logo-slot--loaded .logo-slot__fallback,
.logo-slot--loaded .logo-slot__hint {
  display: none;
}

.ubc-shortlist-grid {
  margin-top: 8px;
}

.ubc-shortlist-grid .feature-panel {
  min-height: 110px;
  justify-content: center;
  text-align: center;
}

.shortlist-panel strong {
  font-size: clamp(21px, 1.55vw, 26px);
  line-height: 1.4;
}

.sponsor-tier-shell {
  width: min(98vw, 1820px);
}

.sponsor-tier-shell .single-card {
  width: 100%;
}

.feedback-card {
  min-height: 280px;
  justify-content: center;
}

.farewell-shell {
  gap: 18px;
}

.farewell-rabbit {
  animation: rabbitDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
}

.farewell-title {
  color: var(--crimson);
}

.farewell-card .quote-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.farewell-attribution {
  font-size: 20px;
  font-style: italic;
  color: rgba(26, 55, 134, 0.6);
}

.farewell-floaties {
  display: flex;
  gap: 18px;
  font-size: 30px;
}

@keyframes rabbitDrop {
  from { opacity: 0; transform: translateY(-28px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1200px) {
  .closing-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .finalist-demo-shell {
    flex-direction: column;
    justify-content: center;
  }

  .finalist-demo__card {
    flex-basis: auto;
    width: min(920px, 100%);
  }

  .finalist-demo__stage {
    min-height: 260px;
    width: 100%;
  }

  #section-nav {
    width: min(94vw, 980px);
  }

  .sponsor-tier-row {
    grid-template-columns: 1fr;
  }

  .sponsor-tier-row__label,
  .sponsor-tier-row__logos {
    justify-content: center;
  }

  .stamp-slide-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .closing-stat-grid {
    grid-template-columns: 1fr;
  }

  .winner-reveal-shell {
    min-height: auto;
    padding: 28px 22px;
  }

  .grand-trophy {
    position: static;
    margin-bottom: 8px;
  }

  .closing-title-overlay {
    width: min(92vw, 680px);
  }

  #section-nav {
    top: 10px;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 22px;
  }

  .section-nav__label {
    display: none;
  }

  #section-nav-buttons {
    gap: 6px;
  }

  .section-tab {
    padding: 7px 11px;
    font-size: 12px;
  }

  .ubc-shortlist-grid {
    grid-template-columns: 1fr;
  }

  .logo-slot {
    width: min(42vw, 170px);
  }
}
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cmd-f 2026 — Closing Ceremony</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">
  <style>
${sharedCss}

${extraCss}
  </style>
</head>
<body>
  <script>
${bgAssets}
  </script>

  <div id="progress-bar"></div>
  <nav id="section-nav" aria-label="Presentation sections">
    <div class="section-nav__label">Slides</div>
    <div id="section-nav-buttons"></div>
  </nav>
  <div id="slide-counter">1 / 42</div>
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

    const CLOSING_BG = typeof IMG_CLOSING !== 'undefined' ? IMG_CLOSING : IMG_BG1;
    const bgMap = {
      bg1: IMG_BG1,
      bg2: IMG_BG2,
      bg3: IMG_BG3,
      closing: CLOSING_BG,
    };

    const winnerSlides = new Set([21, 24, 27, 29, 31, 33, 35, 36, 37]);
    const slideEls = Array.from(document.querySelectorAll('.slide'));
    const dotsContainer = document.getElementById('nav-dots');
    const sectionNavButtons = document.getElementById('section-nav-buttons');
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

    function buildSectionNav() {
      sectionNavButtons.innerHTML = '';
      slideEls.forEach((_, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'section-tab';
        button.textContent = String(index + 1);
        button.title = 'Slide ' + (index + 1) + ' — ' + slideTitles[index];
        button.setAttribute('aria-label', 'Go to slide ' + (index + 1) + ' — ' + slideTitles[index]);
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          goTo(index);
        });
        sectionNavButtons.appendChild(button);
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

    function updateSectionNav() {
      Array.from(sectionNavButtons.children).forEach((button, index) => {
        const isActive = index === current;
        button.classList.toggle('active', isActive);
        if (isActive) {
          button.setAttribute('aria-current', 'page');
          button.scrollIntoView({ block: 'nearest', inline: 'center' });
        } else {
          button.removeAttribute('aria-current');
        }
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
      updateSectionNav();
      updateNotes();
    }

    function cleanupSlide(slide) {
      slide.classList.remove('active', 'entering', 'exiting');
    }

    function createConfetti(container) {
      container.innerHTML = '';
      const colors = ['#FFD93D','#FF6B6B','#4ECDC4','#A78BFA','#B4143C','#1A3786','#80CD7D'];
      const shapes = [
        { w: '8px',  h: '16px', r: '2px' },
        { w: '10px', h: '10px', r: '50%' },
        { w: '12px', h: '6px',  r: '1px' },
        { w: '6px',  h: '18px', r: '3px' },
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
        el.style.setProperty('--rot-end', ((Math.floor(Math.random() * 4) + 2) * 360) + 'deg');
        el.style.left = Math.random() * 100 + 'vw';
        container.appendChild(el);
      }
    }

    function animateCount(el) {
      const target = Number(el.dataset.target);
      if (!Number.isFinite(target)) return;
      const suffix = el.dataset.suffix || '';
      const startTime = performance.now();
      const duration = 800;
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = String(value) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = String(target) + suffix;
        }
      }
      requestAnimationFrame(tick);
    }

    function runSlideEffects(slide) {
      const slideNumber = Number(slide.dataset.slideId);
      slide.querySelectorAll('.count-number[data-target]').forEach((el) => animateCount(el));
      if (winnerSlides.has(slideNumber)) {
        slide.querySelectorAll('.confetti-container').forEach((container) => createConfetti(container));
      }
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
        runSlideEffects(incoming);
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
        target.closest('#section-nav') ||
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
    buildSectionNav();
    slideEls[0].classList.add('active');
    requestAnimationFrame(() => {
      slideEls[0].classList.add('entering');
      runSlideEffects(slideEls[0]);
    });
    syncChrome();
  </script>
</body>
</html>
`;

const outputPath = path.join(ROOT, 'cmdf2026_closing.html');
fs.writeFileSync(outputPath, html);
console.log(`Wrote ${outputPath}`);
console.log(`Slides: ${slides.length}`);
console.log(`Speaker notes: ${speakerNotes.length}`);
