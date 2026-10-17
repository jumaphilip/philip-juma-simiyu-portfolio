
/*
 * Philip Juma Simiyu — Portfolio Website
 * Shared JavaScript functionality
 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // 1. Automatically update the copyright year.
    const yearElements = document.querySelectorAll("#currentYear");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // 2. Highlight the current page in the navigation.
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // 3. Add a class when the visitor scrolls down.
    // This can be used later for a sticky-header effect.
    function updateScrollState() {
        if (window.scrollY > 30) {
            document.body.classList.add("has-scrolled");
        } else {
            document.body.classList.remove("has-scrolled");
        }
    }

    window.addEventListener("scroll", updateScrollState, {
        passive: true
    });

    updateScrollState();

    // 4. Reveal animated elements as they enter the viewport.
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const observer = new IntersectionObserver(
            function (entries, activeObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        activeObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("revealed");
        });
    }

    // 5. Basic validation and email preparation for the contact form.
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            const mailtoLink =
                "mailto:jumaphilip19@gmail.com" +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            const notice = document.getElementById("formNotice");

            if (notice) {
                notice.textContent =
                    "Your email application should open. Review the message " +
                    "and press Send to contact Philip.";
            }

            window.location.href = mailtoLink;
        });
    }

    // 6. Log a simple message during development.
    console.log("Philip's portfolio website is ready.");

});
