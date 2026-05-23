// ================================
// SEMA GLOBAL SCRIPT
// ================================

document.addEventListener("DOMContentLoaded", async () => {

  await loadPartials();

  initRevealAnimations();
  initCounters();
  initMagneticButtons();
  initProgramCardTilt();
  initMobileMenu();
  initPageFade();

});

// ================================
// LOAD COMPONENTS
// ================================

async function loadComponent(id, file) {

  try {

    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    const html = await response.text();

    const element = document.getElementById(id);

    if (element) {
      element.innerHTML = html;
    }

  } catch (error) {

    console.error(error);

  }

}

async function loadPartials() {

  await Promise.all([
    loadComponent("header", "header.html"),
    loadComponent("footer", "footer.html")
  ]);

}

// ================================
// REVEAL ANIMATIONS
// ================================

function initRevealAnimations() {

  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");
        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  });

  reveals.forEach((el) => observer.observe(el));

}

// ================================
// COUNTERS
// ================================

function initCounters() {

  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.dataset.target;

      let current = 0;

      const increment = target / 80;

      const updateCounter = () => {

        current += increment;

        if (current < target) {

          counter.innerText = Math.floor(current);

          requestAnimationFrame(updateCounter);

        } else {

          counter.innerText = target + (target > 100 ? "+" : "");

        }

      };

      updateCounter();

      counterObserver.unobserve(counter);

    });

  }, {
    threshold: 0.5
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

}

// ================================
// MAGNETIC BUTTONS
// ================================

function initMagneticButtons() {

  const buttons = document.querySelectorAll(".magnetic-btn");

  if (!buttons.length) return;

  buttons.forEach((button) => {

    button.addEventListener("mousemove", (e) => {

      const rect = button.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });

  });

}

// ================================
// PROGRAM CARD TILT
// ================================

function initProgramCardTilt() {

  const cards = document.querySelectorAll(".program-card");

  if (!cards.length) return;

  cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 6;
      const rotateX = ((y / rect.height) - 0.5) * -6;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
      `;

    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

  });

}

// ================================
// MOBILE MENU
// ================================

function initMobileMenu() {

  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("close-mobile-menu");
  const overlay = document.getElementById("mobile-menu-overlay");
  const panel = document.getElementById("mobile-menu-panel");

  if (!menuBtn || !closeBtn || !overlay || !panel) return;

  const openMenu = () => {

    overlay.classList.remove("hidden");

    requestAnimationFrame(() => {
      overlay.classList.remove("opacity-0");
      panel.classList.remove("translate-x-full");
    });

    document.body.classList.add("overflow-hidden");

  };

  const closeMenu = () => {

    overlay.classList.add("opacity-0");
    panel.classList.add("translate-x-full");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);

    document.body.classList.remove("overflow-hidden");

  };

  menuBtn.addEventListener("click", openMenu);

  closeBtn.addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);

}

// ================================
// PAGE FADE IN
// ================================

function initPageFade() {

  document.body.animate(
    [
      {
        opacity: 0,
        transform: "translateY(10px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 700,
      easing: "ease-out"
    }
  );

}
