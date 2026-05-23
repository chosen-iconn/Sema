// ===============================
// SEMA GLOBAL APP SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  initializeComponents();
  initializeRevealAnimations();
});

// ===============================
// LOAD HEADER & FOOTER
// ===============================

async function loadComponent(id, file) {
  try {
    const element = document.getElementById(id);

    if (!element) return;

    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    const html = await response.text();

    element.innerHTML = html;
  } catch (error) {
    console.error("Component loading error:", error);
  }
}

async function initializeComponents() {
  await Promise.all([
    loadComponent("header-container", "header.html"),
    loadComponent("footer-container", "footer.html"),
    loadComponent("header", "header.html"),
    loadComponent("footer", "footer.html"),
  ]);
}

// ===============================
// REVEAL ANIMATIONS
// ===============================

function initializeRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  reveals.forEach((element) => {
    observer.observe(element);
  });
}
