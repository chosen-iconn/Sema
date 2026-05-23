// ================================
// SEMA GLOBAL SCRIPT
// ================================

document.addEventListener("DOMContentLoaded", () => {

  loadPartials();

  initRevealAnimations();
  initCounters();
  initMagneticButtons();
  initProgramCardTilt();
  initPageTransitions();

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

function loadPartials() {

  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");

}

// ================================
// REVEAL ANIMATIONS
// ================================

function initRevealAnimations() {

  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        // Animate once
        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  });

  revealItems.forEach((item) => {
    observer.observe(item);
  });

}

// ================================
// COUNTER ANIMATIONS
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

          counter.innerText =
            target + (target > 100 ? "+" : "");

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

      const x =
        e.clientX - rect.left - rect.width / 2;

      const y =
        e.clientY - rect.top - rect.height / 2;

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

      const rotateY =
        ((x / rect.width) - 0.5) * 6;

      const rotateX =
        ((y / rect.height) - 0.5) * -6;

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
// PAGE TRANSITIONS
// ================================

function initPageTransitions() {

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
