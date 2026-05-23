/* =========================
   SEMA GLOBAL APP SCRIPT
   Shared across all pages
========================= */

(function () {
  "use strict";

  /**
   * COMPONENT LOADER (HEADER + FOOTER)
   */
  async function loadComponent(id, file, callback) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;

      if (typeof callback === "function") callback();
    } catch (err) {
      console.error("Component load failed:", file, err);
    }
  }

  /**
   * INTERSECTION REVEAL SYSTEM
   */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /**
   * MOBILE MENU (ROBUST + REUSABLE)
   */
  function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("close-mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    const panel = document.getElementById("mobile-menu-panel");

    if (!btn || !closeBtn || !overlay || !panel) return;

    const open = () => {
      overlay.classList.remove("hidden");
      setTimeout(() => {
        overlay.classList.remove("opacity-0");
        panel.classList.remove("translate-x-full");
        document.body.style.overflow = "hidden";
      }, 10);
    };

    const close = () => {
      overlay.classList.add("opacity-0");
      panel.classList.add("translate-x-full");
      document.body.style.overflow = "";

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 250);
    };

    btn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);
  }

  /**
   * FIX DROPDOWN HOVER ISSUE (IMPORTANT)
   * Ensures hover works even after fetch injection
   */
  function initDropdownFix() {
    const groups = document.querySelectorAll(".group");

    groups.forEach((group) => {
      const menu = group.querySelector(".dropdown-menu");
      if (!menu) return;

      group.addEventListener("mouseenter", () => {
        menu.classList.add("opacity-100", "visible", "translate-y-0");
      });

      group.addEventListener("mouseleave", () => {
        menu.classList.remove("opacity-100", "visible", "translate-y-0");
      });
    });
  }

  /**
   * HEADER INITIALIZATION (RUN AFTER LOAD)
   */
  function initHeaderBehaviors() {
    const header = document.querySelector("header");

    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("shadow-md");
        } else {
          header.classList.remove("shadow-md");
        }
      });
    }

    initMobileMenu();
    initDropdownFix();
  }

  /**
   * BOOTSTRAP APP
   */
  function initApp() {
    initReveal();
  }

  /**
   * GLOBAL INIT (CALL THIS FROM PAGES)
   */
  window.SEMA_APP = {
    loadComponent,
    initApp,
    initHeaderBehaviors,
  };
})();
