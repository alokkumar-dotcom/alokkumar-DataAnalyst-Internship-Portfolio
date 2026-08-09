"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const year = $("#year");
const header = $(".project-header");
const topBtn = $("#topBtn");
const progressBar = $(".progress-bar");

if (year) year.textContent = new Date().getFullYear();

/* Scroll Reveal */
const revealElements = $$(".project-hero, .project-stats, .website-preview, .overview, .features, .technologies, .challenges, .gallery, .project-links, .project-footer");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
revealElements.forEach(el => { el.classList.add("hidden"); revealObserver.observe(el); });

/* Animated Counters */
const counters = $$(".counter");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 80));
    function updateCounter() {
      current += increment;
      if (current >= target) {
        counter.textContent = target === 100 ? target + "%" : target + "+";
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    }
    updateCounter();
    observer.unobserve(counter);
  });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

/* Scroll Progress Bar / Sticky Header / Back To Top visibility */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / documentHeight) * 100;

  if (progressBar) progressBar.style.width = progress + "%";
  if (header) header.classList.toggle("scrolled", scrollTop > 30);
  if (topBtn) topBtn.classList.toggle("show", scrollTop > 400);
});

/* Back To Top Click */
topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* Smooth Navigation */
$$(".project-nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

/* Hover lift helper — applies a translateY hover effect to a set of elements */
function addHoverLift(elements, lift) {
  elements.forEach(el => {
    el.addEventListener("mouseenter", () => { el.style.transform = `translateY(${lift})`; });
    el.addEventListener("mouseleave", () => { el.style.transform = "translateY(0)"; });
  });
}

addHoverLift($$(".gallery-item"), "-10px");
addHoverLift($$(".feature-card"), "-10px");
addHoverLift($$(".tech-card"), "-8px");
addHoverLift($$(".overview-card"), "-8px");

/* Button Hover */
$$(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => { btn.style.transform = "translateY(-6px) scale(1.03)"; });
  btn.addEventListener("mouseleave", () => { btn.style.transform = "translateY(0) scale(1)"; });
});

/* Browser Preview Hover */
const browserPreview = $(".browser-window img");
browserPreview?.addEventListener("mouseenter", () => { browserPreview.style.transform = "scale(1.03)"; });
browserPreview?.addEventListener("mouseleave", () => { browserPreview.style.transform = "scale(1)"; });