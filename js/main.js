
// ==============================
// EFECTO DE APARICIÓN AL HACER SCROLL
// ==============================

const elements = document.querySelectorAll(
    ".history-section, .timeline-item, .value-card, " +
    ".contact-card, .social-link, .staff-card, " +
    ".welcome-section, .specialty-content, " +
    ".home-values-grid article, .home-final"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });
    },
    {
        threshold: 0.15
    }
);

elements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});