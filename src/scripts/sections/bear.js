export function initBearSection() {
    const bearContainer = document.getElementById('bear-container');
    const panels = gsap.utils.toArray('.bear__panel');

    gsap.to(panels, {
        xPercent: -10 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: bearContainer,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => '+=' + bearContainer.offsetWidth
        }
    });
}
