"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const header = $(".header");
const menuBtn = $("#menu-btn");
const navLinks = $(".nav-links");
const navItems = $$(".nav-link");
const typing = $("#typing");
const topBtn = $("#topBtn");
const year = $("#year");
const sections = $$("section");
const heroSlider = document.getElementById("heroSlider");

const roles = [
  "Aspiring Data Analyst",
  "Python Developer",
  "SQL Developer",
  "Tableau Developer",
  "Business Intelligence Enthusiast",
];

const heroImages = ["assets/images/task2.png", "assets/images/task3.png"];

let roleIndex = 0, charIndex = 0, deleting = false;

// ===== TYPING EFFECT (+ hero image swap per role) =====
(function typeEffect() {
  if (!typing) return;

  if (!deleting && charIndex === 0 && heroSlider) {
    heroSlider.style.opacity = "0";
    setTimeout(() => {
      heroSlider.src = heroImages[roleIndex % heroImages.length];
      heroSlider.style.opacity = "1";
    }, 200);
  }

  const currentRole = roles[roleIndex];
  typing.textContent = deleting ? currentRole.slice(0, charIndex--) : currentRole.slice(0, charIndex++);

  if (!deleting && charIndex > currentRole.length) {
    deleting = true;
    return setTimeout(typeEffect, 1800);
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
})();

// ===== MOBILE NAV =====
menuBtn?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.firstElementChild.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

document.addEventListener("click", (e) => {
  if (navLinks?.classList.contains("open") && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.firstElementChild.className = "fa-solid fa-bars";
  }
});

navItems.forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.firstElementChild.className = "fa-solid fa-bars";
}));

// ===== SCROLL-REVEAL + COUNTERS =====
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains("counter")) {
      const target = Number(el.dataset.target);
      const step = Math.max(1, Math.ceil(target / 120));
      let value = 0;
      (function updateCounter() {
        value += step;
        if (value >= target) return (el.textContent = target.toLocaleString());
        el.textContent = value.toLocaleString();
        requestAnimationFrame(updateCounter);
      })();
    } else {
      el.classList.add("show");
    }
    obs.unobserve(el);
  });
}, { threshold: 0.2 });

$$(".counter,.timeline-item,.project-card").forEach((el) => {
  if (!el.classList.contains("counter")) el.classList.add("hidden");
  observer.observe(el);
});

// ===== SCROLL: header state, back-to-top, active nav link =====
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  header?.classList.toggle("scrolled", scroll > 20);
  topBtn?.classList.toggle("show", scroll > 400);

  let currentSection = "";
  sections.forEach((section) => {
    if (scroll >= section.offsetTop - 120) currentSection = section.id;
  });

  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
});

topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

year && (year.textContent = new Date().getFullYear());