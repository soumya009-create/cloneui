const starsRoot = document.querySelector("#stars");
const revealNodes = document.querySelectorAll("[data-reveal]");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const headerActions = document.querySelector(".header-actions");
const heroForm = document.querySelector(".hero-form");

function createStars() {
  if (!starsRoot) return;
  const starCount = window.innerWidth < 768 ? 60 : 115;
  const fragment = document.createDocumentFragment();
  starsRoot.innerHTML = "";
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    const size = Math.random() * 2.8 + 1;
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = `${Math.random() * 0.8 + 0.15}`;
    star.style.setProperty("--duration", `${Math.random() * 6 + 4}s`);
    star.style.setProperty("--delay", `${Math.random() * 4}s`);
    fragment.appendChild(star);
  }
  starsRoot.appendChild(fragment);
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealNodes.forEach((node) => observer.observe(node));
}

function handleHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function toggleMobileMenu() {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  const nextState = !expanded;
  navToggle.setAttribute("aria-expanded", String(nextState));
  siteNav.classList.toggle("is-open", nextState);
  headerActions.classList.toggle("is-open", nextState);
}

function closeMobileMenu() {
  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  headerActions.classList.remove("is-open");
}

if (navToggle && siteNav && headerActions) {
  navToggle.addEventListener("click", toggleMobileMenu);
  [...siteNav.querySelectorAll("a"), ...headerActions.querySelectorAll("a")].forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

if (heroForm) {
  heroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = heroForm.querySelector("button");
    if (!btn) return;
    btn.textContent = "✓ You're in!";
    btn.style.background = "linear-gradient(135deg, #1effaf, #13c98f)";
    btn.style.color = "#021810";
    setTimeout(() => {
      btn.textContent = "Start for free";
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
}

// Staggered reveal delays for grid children
document.querySelectorAll(".feature-grid, .stories__grid, .testimonials__grid, .enterprise__cards").forEach((grid) => {
  grid.querySelectorAll("[data-reveal]").forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});

window.addEventListener("scroll", handleHeaderState, { passive: true });
window.addEventListener("resize", createStars);

createStars();
revealOnScroll();
handleHeaderState();
