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

    // Certificate Lightbox Modal Handling
    const certModal = document.getElementById("certModal");
    const certModalImg = document.getElementById("certModalImg");
    const certModalTitle = document.getElementById("certModalTitle");
    const certModalDownload = document.getElementById("certModalDownload");
    const certModalClose = document.getElementById("certModalClose");

    window.openCertificateModal = function(imageSrc, title, pdfSrc) {
        if (certModal && certModalImg) {
            certModalImg.src = imageSrc;
            certModalImg.alt = title;
            if (certModalTitle) certModalTitle.textContent = title;
            if (certModalDownload) {
                certModalDownload.href = pdfSrc;
                certModalDownload.setAttribute("download", title.replace(/[^a-zA-Z0-9_-]/g, "_") + ".pdf");
            }
            certModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    };

    window.closeCertificateModal = function() {
        if (certModal) {
            certModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    if (certModalClose) {
        certModalClose.addEventListener("click", closeCertificateModal);
    }

    if (certModal) {
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) {
                closeCertificateModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
            closeCertificateModal();
        }
    });
});

