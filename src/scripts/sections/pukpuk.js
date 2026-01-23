/**
 * Puk Puk Section Module
 * Handles parallax effects and eye tracking
 */

export function initPukPukAnimations() {
    // Giant Text Parallax
    gsap.to('.pp-universe__giant-text', {
        yPercent: -20,
        rotation: 0,
        scrollTrigger: {
            trigger: '#pukpuk-universe',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Puk Puk Figure Parallax
    gsap.to('.pp-universe__figure', {
        yPercent: 20,
        rotation: 5,
        scrollTrigger: {
            trigger: '#pukpuk-universe',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
        }
    });

    // Cards Parallax
    gsap.to('.pp-universe__cards', {
        yPercent: -10,
        scrollTrigger: {
            trigger: '#pukpuk-universe',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    // Floating animation for PukPuk
    gsap.to('.pp-universe__img', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}
