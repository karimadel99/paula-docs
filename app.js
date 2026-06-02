// ============================================================
// Paula Operations Manual — interactivity
// ============================================================

// ---------- 1. Marker ↔ callout sync ----------
const markers = document.querySelectorAll('.marker');
const calloutItems = document.querySelectorAll('.callouts li');

function syncHighlight(id, on) {
  document.querySelectorAll(`[data-id="${id}"]`).forEach((el) => {
    el.classList.toggle('active', on);
  });
}

function bindHover(el) {
  el.addEventListener('mouseenter', () => syncHighlight(el.dataset.id, true));
  el.addEventListener('mouseleave', () => syncHighlight(el.dataset.id, false));
  el.addEventListener('focus', () => syncHighlight(el.dataset.id, true));
  el.addEventListener('blur', () => syncHighlight(el.dataset.id, false));
}

markers.forEach(bindHover);
calloutItems.forEach(bindHover);

// Make markers keyboard-focusable
markers.forEach((m) => {
  m.setAttribute('tabindex', '0');
  m.setAttribute('role', 'button');
  const callout = document.querySelector(`.callouts li[data-id="${m.dataset.id}"]`);
  if (callout) {
    const label = callout.querySelector('strong')?.textContent?.trim() ?? '';
    m.setAttribute('aria-label', `Marker ${m.textContent.trim()}: ${label}`);
  }
});

// ---------- 2. Click marker → scroll to callout (on narrow layouts) ----------
markers.forEach((m) => {
  m.addEventListener('click', (e) => {
    e.stopPropagation(); // don't bubble to screenshot (which would open lightbox)
    const callout = document.querySelector(`.callouts li[data-id="${m.dataset.id}"]`);
    if (callout) {
      callout.scrollIntoView({ behavior: 'smooth', block: 'center' });
      callout.classList.add('active');
      setTimeout(() => callout.classList.remove('active'), 1600);
    }
  });
  m.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      m.click();
    }
  });
});

// ---------- 3. Lightbox ----------
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.screenshot').forEach((shot) => {
  shot.addEventListener('click', (e) => {
    if (e.target.classList.contains('marker')) return; // marker handled above
    const img = shot.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    lightboxClose.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxClose.hidden = true;
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

// ---------- 4. Sidebar: active section highlight ----------
const sections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('.sidebar nav a');

const navObserver = new IntersectionObserver(
  (entries) => {
    // Pick the most-visible section
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
      const id = visible.target.id;
      navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  },
  { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
);

sections.forEach((s) => navObserver.observe(s));

// ---------- 5. Fade-in on scroll ----------
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));

// ---------- 6. Mobile menu toggle ----------
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar nav a').forEach((l) => {
  l.addEventListener('click', () => sidebar.classList.remove('open'));
});

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});
