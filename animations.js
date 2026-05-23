/**
 * SEMA Platform - Core Animations & Interactions
 * Designed for smooth, premium, and calming user experiences.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. Scroll Reveal Animations (Intersection Observer)
    // ----------------------------------------------------
    // Elements fade in and slide up gently as they enter the viewport.
    
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the active class to trigger the CSS transition
                entry.target.classList.add('reveal-active');
                // Optional: Stop observing once revealed to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ----------------------------------------------------
    // 2. Dynamic Sticky Header Enhancement
    // ----------------------------------------------------
    // Adds a deeper shadow and changes background opacity when scrolling.
    
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md');
                header.classList.replace('bg-white/95', 'bg-white/100');
            } else {
                header.classList.remove('shadow-md');
                header.classList.replace('bg-white/100', 'bg-white/95');
            }
        });
    }

    // ----------------------------------------------------
    // 3. Mobile Navigation Toggle
    // ----------------------------------------------------
    
    const mobileMenuBtn = document.querySelector('.lg\\:hidden button');
    const desktopNav = document.querySelector('nav');
    
    // Create a mobile menu container if it doesn't exist in HTML
    let mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && desktopNav && !mobileMenu) {
        // Clone the desktop nav links for the mobile menu
        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex-col items-center justify-center space-y-8 text-lg font-semibold transform translate-x-full transition-transform duration-300 hidden';
        
        const navLinks = desktopNav.innerHTML;
        mobileMenu.innerHTML = `
            <button id="close-mobile-menu" class="absolute top-6 right-6 text-slate-600 hover:text-brand-600">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="flex flex-col items-center space-y-6 text-slate-800">
                ${navLinks.replace(/py-2/g, 'py-2 text-xl')}
            </div>
        `;
        
        document.body.appendChild(mobileMenu);

        // Toggle functions
        const toggleMenu = () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                // Small delay to allow display:block to apply before transforming
                setTimeout(() => {
                    mobileMenu.classList.remove('translate-x-full');
                    mobileMenu.classList.add('flex');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }, 10);
            } else {
                mobileMenu.classList.add('translate-x-full');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    document.body.style.overflow = '';
                }, 300);
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        document.getElementById('close-mobile-menu').addEventListener('click', toggleMenu);
        
        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // ----------------------------------------------------
    // 4. Smooth Anchor Scrolling
    // ----------------------------------------------------
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
