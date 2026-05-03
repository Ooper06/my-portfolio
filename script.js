const toggle    = document.getElementById('modeSwitch');
const body      = document.body;
const ripple    = document.getElementById('ripple');
const thumbIcon = document.getElementById('thumbIcon');
const navLogo   = document.getElementById('navLogo');
const ageValue  = document.getElementById('ageValue');
const birthDate = new Date('1997-08-26');

function getAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }
  return age;
}

function updateAge() {
  if (ageValue) {
    ageValue.textContent = getAge(birthDate);
  }
}

updateAge();

/* ---------- RIPPLE ---------- */
function fireRipple(isAnim, fromEl) {
  const rect = fromEl.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  const maxR = Math.sqrt(
    Math.max(cx, window.innerWidth  - cx) ** 2 +
    Math.max(cy, window.innerHeight - cy) ** 2
  ) * 2.2;

  const bg = isAnim ? '#fff3e8' : '#080b12';

  Object.assign(ripple.style, {
    width:      maxR + 'px',
    height:     maxR + 'px',
    left:       (cx - maxR / 2) + 'px',
    top:        (cy - maxR / 2) + 'px',
    background: bg,
    transition: 'none',
    transform:  'scale(0)',
    opacity:    '1',
  });

  // Force reflow
  ripple.getBoundingClientRect();

  ripple.style.transition = 'transform 0.75s cubic-bezier(0.4,0,0.2,1)';
  ripple.style.transform  = 'scale(1)';

  // Swap mode au milieu de l'animation
  setTimeout(() => {
    if (isAnim) {
      body.classList.replace('dev-mode', 'anim-mode');
      thumbIcon.textContent = '🎬';
      navLogo.textContent   = 'MR✨';
      stopParticles(); startEmojis();
    } else {
      body.classList.replace('anim-mode', 'dev-mode');
      thumbIcon.textContent = '⌨️';
      navLogo.textContent   = 'MR/';
      stopEmojis(); startParticles();
    }
  }, 340);

  // Fade out
  setTimeout(() => {
    ripple.style.transition = 'opacity 0.35s ease';
    ripple.style.opacity    = '0';
  }, 680);

  // Cleanup
  setTimeout(() => {
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity   = '0';
  }, 1060);
}

toggle.addEventListener('change', function () {
  fireRipple(this.checked, this.closest('label'));
});

/* ---------- PARTICLES (dev) ---------- */
const snippets = [
  'const x = () => {}', 'git commit -m "fix"', 'npm install',
  'SELECT * FROM', 'docker compose up', 'export default',
  'async / await', '.then().catch()', 'import React',
  'php artisan', 'localhost:3000', '{ padding: 0 }',
  'git push origin', 'npm run dev', 'console.log(42)',
];
const pContainer = document.getElementById('particles');
let pInterval, pList = [];

function addParticle() {
  const el = document.createElement('div');
  el.className = 'code-particle';
  el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
  const dur = 14 + Math.random() * 16;
  Object.assign(el.style, {
    left:              Math.random() * 96 + 'vw',
    animationDuration: dur + 's',
    opacity:           (0.07 + Math.random() * 0.13).toString(),
    fontSize:          (0.58 + Math.random() * 0.14) + 'rem',
  });
  pContainer.appendChild(el);
  pList.push(el);
  setTimeout(() => { el.remove(); pList = pList.filter(p => p !== el); }, dur * 1000);
}

function startParticles() {
  addParticle();
  pInterval = setInterval(() => { if (pList.length < 14) addParticle(); }, 1800);
}
function stopParticles() {
  clearInterval(pInterval);
  pList.forEach(p => { p.style.transition = 'opacity 0.4s'; p.style.opacity = '0'; });
  setTimeout(() => { pList.forEach(p => p.remove()); pList = []; }, 450);
}

/* ---------- EMOJIS (anim) ---------- */
const emojiSet = ['🏕️','🎬','⭐','🏔️','🎭','📸','🌟','🎪','🌈','🎨','🔭','🎯','🎶','🌿','🏊'];
let eList = [];

function addEmoji() {
  const el = document.createElement('div');
  el.className = 'emoji-particle';
  el.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
  const dur = 3 + Math.random() * 4;
  Object.assign(el.style, {
    left:              (4 + Math.random() * 90) + 'vw',
    top:               (8 + Math.random() * 76) + 'vh',
    animationDuration: dur + 's',
    animationDelay:    (Math.random() * 1.5) + 's',
    opacity:           (0.1 + Math.random() * 0.18).toString(),
    fontSize:          (1 + Math.random() * 1.2) + 'rem',
  });
  pContainer.appendChild(el);
  eList.push(el);
}
function startEmojis() { for (let i = 0; i < 14; i++) addEmoji(); }
function stopEmojis() {
  eList.forEach(e => { e.style.transition = 'opacity 0.35s'; e.style.opacity = '0'; });
  setTimeout(() => { eList.forEach(e => e.remove()); eList = []; }, 400);
}

// Démarrage
startParticles();

/* ---------- SCROLL REVEAL ---------- */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
