// ================================
// SEMA GLOBAL SCRIPT
// ================================

document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
  initRevealAnimations();
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

  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }

    });

  }, {
    threshold: 0.12
  });

  reveals.forEach((el) => {
    observer.observe(el);
  });
}
