<script>
document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("main-header");

    // Scroll effect (safe)
    window.addEventListener("scroll", () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }
    });

    // Mobile menu
    const btn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("close-mobile-menu");
    const panel = document.getElementById("mobile-menu-panel");
    const overlay = document.getElementById("mobile-menu-overlay");

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
        setTimeout(() => overlay.classList.add("hidden"), 250);
    };

    btn?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);
    overlay?.addEventListener("click", close);

});
</script>
