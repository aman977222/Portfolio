document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // WhatsApp number (+91 7791067090)
            const whatsappNumber = "917791067090";

            // Format message string
            const formattedMessage = `*New Inquiry from Portfolio*%0A%0A` +
                `*Name:* ${encodeURIComponent(name)}%0A` +
                `*Phone:* ${encodeURIComponent(phone)}%0A` +
                `*Subject:* ${encodeURIComponent(subject)}%0A` +
                `*Message:* ${encodeURIComponent(message)}`;

            // Open WhatsApp link in new tab
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
            window.open(whatsappURL, "_blank");
        });
    }
});
