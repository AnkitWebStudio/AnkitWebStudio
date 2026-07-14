/* ── Mobile Menu ──────────────────────────────────────── */
const mobileMenu = document.getElementById('mobileMenu');
const menuToggle = document.getElementById('menuToggle');
const menuClose  = document.getElementById('menuClose');

if (menuToggle) menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
if (menuClose)  menuClose.addEventListener('click',  () => mobileMenu.classList.remove('open'));

/* ── Scroll Animations ────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.anim').forEach(el => observer.observe(el));

/* ── Active Nav Link ──────────────────────────────────── */
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu nav a');
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
navLinks.forEach(a => {
  const href = a.getAttribute('href').split('#')[0].replace(/\/$/, '') || '/';
  if (href === currentPath || (currentPath === '/' && href === '')) {
    a.classList.add('active');
  }
});

/* ── Custom Price Calculator (Services page) ──────────── */
const calcItems = document.querySelectorAll('.calc-item[data-price]');
const calcPriceEl = document.getElementById('calcPrice');
const calcBtn = document.getElementById('calcBtn');

function updateCalcPrice() {
  if (!calcPriceEl) return;
  let total = 10000;
  calcItems.forEach(item => {
    const cb = item.querySelector('.calc-checkbox');
    if (!cb.classList.contains('unchecked')) {
      total += parseInt(item.dataset.price || 0, 10);
    }
  });
  calcPriceEl.textContent = '₹' + total.toLocaleString('en-IN');
  if (calcBtn) {
    const features = [];
    calcItems.forEach(item => {
      const cb = item.querySelector('.calc-checkbox');
      if (!cb.classList.contains('unchecked')) features.push(item.dataset.feature);
    });
    const featStr = features.length ? ', ' + features.join(', ') : '';
    const msg = encodeURIComponent(`Hi Ankit! I'm interested in a custom website plan (approx ${calcPriceEl.textContent}). Features: Responsive Design, CMS, Contact Forms${featStr}.`);
    calcBtn.href = `https://wa.me/918360267122?text=${msg}`;
  }
}

calcItems.forEach(item => {
  item.addEventListener('click', () => {
    const cb = item.querySelector('.calc-checkbox');
    const icon = cb.querySelector('.material-symbols-outlined');
    if (cb.classList.contains('unchecked')) {
      cb.classList.remove('unchecked');
      if (icon) icon.style.display = '';
    } else {
      cb.classList.add('unchecked');
      if (icon) icon.style.display = 'none';
    }
    updateCalcPrice();
  });
});

updateCalcPrice();
