const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll(".reveal");
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const page = document.body.dataset.page;

if (page === "home") {
  const homeLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const homeSections = homeLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (homeSections.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = `#${entry.target.id}`;
          homeLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === sectionId);
          });
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-15% 0px -45% 0px"
      }
    );

    homeSections.forEach((section) => sectionObserver.observe(section));
  }

  const modeLinks = Array.from(document.querySelectorAll("[data-mode-link]"));
  const modeSections = modeLinks
    .map((link) => document.getElementById(link.dataset.modeLink))
    .filter(Boolean);

  if (modeSections.length && "IntersectionObserver" in window) {
    const modeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id = entry.target.id;
          modeLinks.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.modeLink === id);
          });
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-12% 0px -35% 0px"
      }
    );

    modeSections.forEach((section) => modeObserver.observe(section));
  }
} else {
  const currentPage = `${page}.html`;
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === currentPage);
  });
}
