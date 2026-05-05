import { startParticles, stopParticles, startEmojis, stopEmojis } from './particles.js';

const toggle    = document.getElementById('modeSwitch');
const body      = document.body;
const ripple    = document.getElementById('ripple');
const thumbIcon = document.getElementById('thumbIcon');
const navLogo   = document.getElementById('navLogo');

function fireRipple(isAnim, fromEl) {
  const rect = fromEl.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  const maxR = Math.sqrt(
    Math.max(cx, window.innerWidth  - cx) ** 2 +
    Math.max(cy, window.innerHeight - cy) ** 2
  ) * 2.2;

  Object.assign(ripple.style, {
    width:      maxR + 'px',
    height:     maxR + 'px',
    left:       (cx - maxR / 2) + 'px',
    top:        (cy - maxR / 2) + 'px',
    background: isAnim ? '#fff3e8' : '#080b12',
    transition: 'none',
    transform:  'scale(0)',
    opacity:    '1',
  });

  ripple.getBoundingClientRect(); // force reflow

  ripple.style.transition = 'transform 0.75s cubic-bezier(0.4,0,0.2,1)';
  ripple.style.transform  = 'scale(1)';

  setTimeout(() => {
    if (isAnim) {
      body.classList.replace('dev-mode', 'anim-mode');
      thumbIcon.textContent = '🎬';
      navLogo.textContent   = 'MR✨';
      toggle.setAttribute('aria-checked', 'true');
      stopParticles(); startEmojis();
    } else {
      body.classList.replace('anim-mode', 'dev-mode');
      thumbIcon.textContent = '⌨️';
      navLogo.textContent   = 'MR/';
      toggle.setAttribute('aria-checked', 'false');
      stopEmojis(); startParticles();
    }
  }, 340);

  setTimeout(() => {
    ripple.style.transition = 'opacity 0.35s ease';
    ripple.style.opacity    = '0';
  }, 680);

  setTimeout(() => {
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity   = '0';
  }, 1060);
}

export function initToggle() {
  toggle.addEventListener('change', function () {
    fireRipple(this.checked, this.closest('label'));
  });
}
