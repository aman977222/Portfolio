document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navBackdrop = document.getElementById("navBackdrop");
    const navLinks = document.querySelectorAll(".nav-link, .btn-cv");

    function openMenu() {
        if (menuToggle && navMenu) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
            navMenu.classList.add("active");
            if (navBackdrop) navBackdrop.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }
    }

    function closeMenu() {
        if (menuToggle && navMenu) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            navMenu.classList.remove("active");
            if (navBackdrop) navBackdrop.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("active");
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener("click", closeMenu);
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Close on resize if screen becomes larger than 768px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Highlight current page active link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });
});
