(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const cursorGlow = document.getElementById("cursorGlow");

  // Sticky header
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Cursor glow (pointer devices only)
  if (window.matchMedia("(pointer: fine)").matches && cursorGlow) {
    document.body.classList.add("has-cursor");
    let x = 0;
    let y = 0;
    let gx = 0;
    let gy = 0;

    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
    });

    function animateGlow() {
      gx += (x - gx) * 0.08;
      gy += (y - gy) * 0.08;
      cursorGlow.style.left = gx + "px";
      cursorGlow.style.top = gy + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(
    ".section-header, .service-card, .project-card, .about-grid, .contact-card"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
