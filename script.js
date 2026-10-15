const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
}

const progress = document.querySelector('.progress');
let ticking = false;
function updateProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress);
    ticking = true;
  }
}, { passive: true });
updateProgress();

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
}
menuToggle.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.hidden = !opening;
  document.body.classList.toggle('menu-open', opening);
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value.trim();
  if (!message) return;
  const text = `Hola, consulto por ${interest}: ${message}`;
  window.open(`https://wa.me/56994389822?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});

// Change complete groups of logos with a short fade. No card is clipped or overlaid.
if (!prefersReducedMotion) {
  document.querySelectorAll('.brand-lane').forEach((lane, laneIndex) => {
    const viewport = lane.querySelector('.brand-viewport');
    const track = lane.querySelector('.brand-track');
    const group = lane.querySelector('.brand-group');
    const cards = [...group.querySelectorAll('.brand-logo-tile')];
    if (!viewport || !track || !cards.length) return;

    let index = 0;
    let paused = false;
    let visible = false;
    let count = 1;
    let changing = false;
    const stage = document.createElement('div');
    stage.className = 'brand-stage';
    stage.setAttribute('aria-hidden', 'true');
    const slide = document.createElement('div');
    slide.className = 'brand-slide';
    stage.append(slide);
    track.style.display = 'none';
    viewport.append(stage);

    function fillSlide(slide, start) {
      slide.replaceChildren(...Array.from({ length: count }, (_, position) => {
        const card = cards[(start + position) % cards.length].cloneNode(true);
        const image = card.querySelector('img');
        image.alt = '';
        image.removeAttribute('loading');
        return card;
      }));
    }

    function sizeStrip() {
      viewport.style.width = '100%';
      const available = viewport.clientWidth;
      const gap = parseFloat(getComputedStyle(group).columnGap) || 0;
      const cardWidth = parseFloat(getComputedStyle(cards[0]).width);
      count = Math.max(1, Math.min(cards.length, Math.floor((available + gap) / (cardWidth + gap))));
      viewport.style.width = `${count * cardWidth + (count - 1) * gap}px`;
      stage.style.height = getComputedStyle(cards[0]).height;
      index = 0;
      stage.classList.remove('is-changing');
      fillSlide(slide, 0);
    }

    lane.addEventListener('mouseenter', () => { paused = true; });
    lane.addEventListener('mouseleave', () => { paused = false; });
    lane.addEventListener('focusin', () => { paused = true; });
    lane.addEventListener('focusout', () => { paused = false; });
    sizeStrip();
    if ('ResizeObserver' in window) new ResizeObserver(sizeStrip).observe(lane);
    else window.addEventListener('resize', sizeStrip);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold: 0.1 }).observe(lane);
    } else visible = true;

    window.setInterval(() => {
      if (!visible || paused || document.hidden || changing) return;
      changing = true;
      stage.classList.add('is-changing');
      window.setTimeout(() => {
        index = (index + 1) % cards.length;
        fillSlide(slide, index);
        stage.classList.remove('is-changing');
        changing = false;
      }, 210);
    }, laneIndex ? 3800 : 3200);
  });
}
