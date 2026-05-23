/*
|--------------------------------------------------------------------------
| SEMA Shared Common Script
|--------------------------------------------------------------------------
| Shared globally across all pages:
| - Header/Footer partial loading
| - Reveal animations
| - Active navigation highlighting
| - Smooth scrolling
| - Mobile nav helpers
|--------------------------------------------------------------------------
*/

class SEMAApp {

  static async loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }

      const html = await response.text();

      element.innerHTML = html;

    } catch (error) {

      console.error(error);

      element.innerHTML = `
        <div class="p-4 text-sm text-red-500">
          Failed to load component.
        </div>
      `;
    }
  }

  static initRevealAnimations() {

    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.1
    });

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  static initSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

      anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      });

    });

  }

  static highlightCurrentNav() {

    const currentPath = window.location.pathname.split('/').pop();

    const navLinks = document.querySelectorAll('[data-nav-link]');

    navLinks.forEach(link => {

      const href = link.getAttribute('href');

      if (!href) return;

      if (href === currentPath) {

        link.classList.add(
          'text-brand-600',
          'font-semibold'
        );

      }

    });

  }

  static async init() {

    await Promise.all([
      this.loadComponent('header-container', 'header.html'),
      this.loadComponent('footer-container', 'footer.html'),
      this.loadComponent('header', 'header.html'),
      this.loadComponent('footer', 'footer.html')
    ]);

    this.initRevealAnimations();

    this.initSmoothScrolling();

    this.highlightCurrentNav();

  }

}

document.addEventListener('DOMContentLoaded', () => {
  SEMAApp.init();
});
