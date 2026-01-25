export function initNavigation() {
    const navHamburger = document.querySelector('.navbar__toggle');
    const navLinks = document.querySelector('.navbar__menu');

    if (navHamburger && navLinks) {
        // Prevent default link behavior when JS is active
        navHamburger.addEventListener('click', (e) => {
            e.preventDefault();
            navHamburger.classList.toggle('open');
            navLinks.classList.toggle('open');

            const isOpen = navHamburger.classList.contains('open');
            navHamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link + smooth scroll
        navLinks.querySelectorAll('.navbar__link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Skip external links (like TICKETS)
                if (link.getAttribute('target') === '_blank') return;

                e.preventDefault();

                navHamburger.classList.remove('open');
                navLinks.classList.remove('open');
                navHamburger.setAttribute('aria-expanded', 'false');

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Smooth scroll for nav logo
    const navLogo = document.querySelector('.navbar__logo');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = navLogo.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Smooth scroll for museum visit CTA
    const museumCta = document.querySelector('.museum-visit-cta');
    if (museumCta && museumCta.getAttribute('href').startsWith('#')) {
        museumCta.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = museumCta.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}
