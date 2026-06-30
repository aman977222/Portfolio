const WEB3FORMS_ACCESS_KEY = "29901146-535f-47f2-b0e4-da240df2e2c3";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusDiv = document.getElementById("form-status");
    const accessKeyInput = document.getElementById("accessKeyInput");

    // Set the access key value in the hidden input
    if (accessKeyInput) {
        accessKeyInput.value = WEB3FORMS_ACCESS_KEY;
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

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
});
