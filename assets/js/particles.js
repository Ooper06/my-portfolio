const snippets = [
  'const x = () => {}', 'git commit -m "fix"', 'npm install',
  'SELECT * FROM',      'docker compose up',   'export default',
  'async / await',      '.then().catch()',      'import React',
  'php artisan',        'localhost:3000',       '{ padding: 0 }',
  'git push origin',    'npm run dev',          'console.log(42)',
];

const emojiSet = ['🏕️','🎬','⭐','🏔️','🎭','📸','🌟','🎪','🌈','🎨','🔭','🎯','🎶','🌿','🏊'];

const container = document.getElementById('particles');
let pInterval, pList = [], eList = [];

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
  container.appendChild(el);
  pList.push(el);
  setTimeout(() => { el.remove(); pList = pList.filter(p => p !== el); }, dur * 1000);
}

export function startParticles() {
  addParticle();
  pInterval = setInterval(() => { if (pList.length < 14) addParticle(); }, 1800);
}

export function stopParticles() {
  clearInterval(pInterval);
  pList.forEach(p => { p.style.transition = 'opacity 0.4s'; p.style.opacity = '0'; });
  setTimeout(() => { pList.forEach(p => p.remove()); pList = []; }, 450);
}

function addEmoji() {
  const el = document.createElement('div');
  el.className = 'emoji-particle';
  el.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
  const dur = 3 + Math.random() * 4;
  Object.assign(el.style, {
    left:              (4  + Math.random() * 90) + 'vw',
    top:               (8  + Math.random() * 76) + 'vh',
    animationDuration: dur + 's',
    animationDelay:    (Math.random() * 1.5) + 's',
    opacity:           (0.1 + Math.random() * 0.18).toString(),
    fontSize:          (1   + Math.random() * 1.2) + 'rem',
  });
  container.appendChild(el);
  eList.push(el);
}

export function startEmojis() {
  for (let i = 0; i < 14; i++) addEmoji();
}

export function stopEmojis() {
  eList.forEach(e => { e.style.transition = 'opacity 0.35s'; e.style.opacity = '0'; });
  setTimeout(() => { eList.forEach(e => e.remove()); eList = []; }, 400);
}
