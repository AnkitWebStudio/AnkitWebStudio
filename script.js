/* ---- Slider ---- */
const dots      = document.querySelectorAll(".dot");
const slideImage = document.querySelector(".slide-image");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((item) => item.classList.remove("is-active"));
    dot.classList.add("is-active");
    slideImage.classList.add("is-changing");
    window.setTimeout(() => { slideImage.classList.remove("is-changing"); }, 180);
    dots.forEach((item, dotIndex) => {
      item.setAttribute("aria-selected", String(dotIndex === index));
    });
  });
});

/* ---- Sidebar Nav ---- */
const header     = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const overlay    = document.getElementById("nav-overlay");
const navLinks   = document.querySelectorAll(".main-nav a");

function openSidebar() {
  header.classList.add("nav-open");
  menuToggle.setAttribute("aria-expanded", "true");
  if (overlay) overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  header.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (overlay) overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

menuToggle?.addEventListener("click", () => {
  header.classList.contains("nav-open") ? closeSidebar() : openSidebar();
});

// Close when clicking the overlay backdrop
overlay?.addEventListener("click", closeSidebar);

// Close when a nav link is clicked (smooth UX on mobile)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) closeSidebar();
  });
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

/* ---- Fade-up on scroll ---- */
const revealSelectors = [
  ".hero .slider-panel",
  ".hero .hero-copy",
  ".mobile-choice",
  ".review-badge",
  ".review-heading",
  ".review-subheading",
  ".review-card",
  ".review-feature",
  ".process-header",
  ".process-card",
  ".locate-content > *",
  ".locate-map",
  ".site-footer"
];

const revealTargets = document.querySelectorAll(revealSelectors.join(","));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

revealTargets.forEach((item, index) => {
  item.classList.add("reveal-on-scroll");
  item.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
});

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });

  revealTargets.forEach((item) => revealObserver.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}


/* ---- Free Website Review form ---- */
function handleReviewSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("review-url-input");
  const btn   = document.getElementById("review-submit-btn");

  if (!input.value.trim()) return;

  const original = btn.innerHTML;
  btn.innerHTML = `✓ Submitted! We'll be in touch`;
  btn.style.background = "#22c55e";
  btn.disabled = true;
  input.disabled = true;

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = "";
    btn.disabled = false;
    input.disabled = false;
    input.value = "";
  }, 4000);
}
