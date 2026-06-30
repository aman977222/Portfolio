const WEB3FORMS_ACCESS_KEY = "29901146-535f-47f2-b0e4-da240df2e2c3";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusDiv = document.getElementById("form-status");
    const accessKeyInput = document.getElementById("accessKeyInput");

    // Set the access key value in the hidden input
    if (accessKeyInput) {
        accessKeyInput.value = WEB3FORMS_ACCESS_KEY;
    }

    // Check if the user has updated the Web3Forms key
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
        showSetupWarning();
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Validate that access key is updated
            if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
                showStatus("Please set your Web3Forms Access Key in contact.js first!", "error");
                return;
            }

            const submitBtn = form.querySelector(".btn-submit");
            const originalBtnHTML = submitBtn.innerHTML;

            // Set button to loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

            // Hide previous status
            hideStatus();

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status === 200) {
                    showStatus("Message sent successfully! Thank you.", "success");
                    form.reset();
                    // Set the key back to hidden input after reset
                    if (accessKeyInput) {
                        accessKeyInput.value = WEB3FORMS_ACCESS_KEY;
                    }
                } else {
                    showStatus(res.message || "Something went wrong. Please try again.", "error");
                }
            })
            .catch((error) => {
                console.error("Error sending message:", error);
                showStatus("Network error. Please check your internet connection.", "error");
            })
            .finally(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            });
        });
    }

    function showStatus(message, type) {
        if (!statusDiv) return;
        statusDiv.className = `form-status ${type} show`;
        statusDiv.innerHTML = `
            <span class="status-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="status-text">${message}</span>
        `;
    }

    function hideStatus() {
        if (!statusDiv) return;
        statusDiv.className = "form-status";
        statusDiv.innerHTML = "";
    }

    function showSetupWarning() {
        const contactCard = document.querySelector(".contact-card");
        if (!contactCard || document.querySelector(".setup-warning-banner")) return;

        const warningBanner = document.createElement("div");
        warningBanner.className = "setup-warning-banner";
        
        warningBanner.innerHTML = `
            <div class="warning-icon">⚠️</div>
            <div class="warning-content">
                <h4>Gmail Integration Setup Required</h4>
                <p>Apne Gmail par messages receive karne ke liye:
                   <br>1. <a href="https://web3forms.com" target="_blank" class="warning-link">web3forms.com</a> par jaakar free Access Key generate karein.
                   <br>2. Us key ko <code>contact.js</code> file ke line 1 par <code>WEB3FORMS_ACCESS_KEY</code> me save karein.
                </p>
            </div>
        `;
        contactCard.insertBefore(warningBanner, contactCard.firstChild);
    }
});
