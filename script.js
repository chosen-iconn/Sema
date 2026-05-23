document.addEventListener('DOMContentLoaded', () => {

    // Sticky Header
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

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');

    const openMobileMenu = () => {
        mobileMenuOverlay.classList.remove('hidden');

        setTimeout(() => {
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuPanel.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        }, 10);
    };

    const closeMobileMenu = () => {
        mobileMenuOverlay.classList.add('opacity-0');
        mobileMenuPanel.classList.add('translate-x-full');
        document.body.style.overflow = '';

        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300);
    };

    if (mobileMenuBtn && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

});
