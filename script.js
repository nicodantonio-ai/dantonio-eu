const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reliable Back to top / Torna su behavior on mobile browsers.
document.querySelectorAll('.back-to-top').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    // Keep the URL clean and avoid a stale #top fragment after scrolling.
    if (history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  });
});

// Visual profile lightbox.
const visualLightbox = document.querySelector('[data-visual-lightbox]');
const visualOpeners = document.querySelectorAll('[data-visual-open]');
const visualCloser = document.querySelector('[data-visual-close]');
let lastVisualTrigger = null;

function openVisualProfile(event) {
  if (!visualLightbox) return;
  lastVisualTrigger = event?.currentTarget || null;
  visualLightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  visualCloser?.focus();
}

function closeVisualProfile() {
  if (!visualLightbox) return;
  visualLightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
  lastVisualTrigger?.focus();
}

visualOpeners.forEach(button => button.addEventListener('click', openVisualProfile));
visualCloser?.addEventListener('click', closeVisualProfile);
visualLightbox?.addEventListener('click', event => {
  if (event.target === visualLightbox) closeVisualProfile();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && visualLightbox && !visualLightbox.hidden) closeVisualProfile();
});

// Remember an explicit language choice so automatic routing never overrides it.
document.querySelectorAll('[data-language-choice]').forEach(link => {
  link.addEventListener('click', () => {
    try { localStorage.setItem('dantonio-language', link.dataset.languageChoice); } catch (e) {}
  });
});
