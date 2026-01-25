export function initBearSection() {
    const bearContainer = document.getElementById('bear-container');
    const panels = gsap.utils.toArray('.bear__panel');

    if (!bearContainer || panels.length === 0) return;

    // Wacht tot layout klaar is
    const initScrollTrigger = () => {
        // Bereken breedte - fallback naar viewport * panels als offsetWidth faalt
        const containerWidth = bearContainer.offsetWidth || (window.innerWidth * panels.length);

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: bearContainer,
                pin: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => '+=' + containerWidth,
                invalidateOnRefresh: true // Herbereken bij resize
            }
        });
    };

    // Zorg dat DOM volledig geladen is
    if (document.readyState === 'complete') {
        initScrollTrigger();
    } else {
        window.addEventListener('load', initScrollTrigger);
    }
}
