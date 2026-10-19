
/* =========================================================
   PHILIP JUMA SIMIYU — PORTFOLIO WEBSITE
   Shared JavaScript for all seven HTML pages
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* 1. AUTOMATIC COPYRIGHT YEAR */
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* 2. SMOOTH SCROLLING FOR ON-PAGE LINKS */
    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });

    /* 3. HIGHLIGHT THE CURRENT NAVIGATION PAGE */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    /* 4. CONTACT FORM VALIDATION AND EMAIL DRAFT */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();

                if (formStatus) {
                    formStatus.textContent =
                        "Please complete all required fields correctly.";
                }

                return;
            }

            const nameField = contactForm.querySelector(
                '[name="name"], #name'
            );

            const emailField = contactForm.querySelector(
                '[name="email"], #email'
            );

            const subjectField = contactForm.querySelector(
                '[name="subject"], #subject'
            );

            const messageField = contactForm.querySelector(
                '[name="message"], #message'
            );

            const inquiryField = contactForm.querySelector(
                '[name="inquiry"], #inquiry'
            );

            const name = nameField ? nameField.value.trim() : "";
            const email = emailField ? emailField.value.trim() : "";
            const subject = subjectField ? subjectField.value.trim() : "";
            const message = messageField ? messageField.value.trim() : "";
            const inquiry = inquiryField ? inquiryField.value.trim() : "";

            const recipient = "jumaphilip19@gmail.com";

            const emailSubject = subject ||
                (inquiry
                    ? "Portfolio inquiry: " + inquiry
                    : "Portfolio inquiry from " + name);

            const emailBody = [
                "Hello Philip,",
                "",
                "I am contacting you through your portfolio website.",
                "",
                "Name: " + name,
                "Email: " + email,
                inquiry ? "Inquiry type: " + inquiry : "",
                "",
                "Message:",
                message,
                "",
                "Regards,",
                name
            ].filter(function (line) {
                return line !== null && line !== undefined;
            }).join("\n");

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent(emailSubject) +
                "&body=" + encodeURIComponent(emailBody);

            if (formStatus) {
                formStatus.textContent =
                    "Your email application should open with your message prepared. Review it and press Send to email Philip.";
            }

            /* Open the visitor's default email application. */
            window.location.href = mailtoLink;
        });
    }

    /* 5. EXTERNAL LINKS: OPEN SAFELY IN A NEW TAB */
    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(function (link) {
        link.setAttribute("rel", "noopener noreferrer");
    });

});
