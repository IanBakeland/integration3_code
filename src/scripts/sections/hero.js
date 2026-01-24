import gsap from 'gsap';

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initHero(onUnlock) {
    let isCharging = false;
    let chargeProgress = 0;
    let isExploded = false;
    let animationFrameId = null;

    const heroSection = document.getElementById('hero');
    const heroBg = document.getElementById('hero-bg');
    const pukpukContainer = document.getElementById('pukpuk-container');
    const pukpukGlow = document.getElementById('pukpuk-glow');
    const heroStatusText = document.getElementById('hero-status-text');
    const chargeFill = document.getElementById('charge-fill');
    const heroContent = document.getElementById('hero-content');

    // Lock body scroll initially
    document.body.classList.add('locked');

    const startCharge = () => {
        if (isExploded) return;
        isCharging = true;
        pukpukGlow.classList.remove('hidden');
        heroStatusText.classList.add('charging');
    };

    const endCharge = () => {
        isCharging = false;
        pukpukGlow.classList.add('hidden');
        heroStatusText.classList.remove('charging');
    };

    const handleExplosion = () => {
        isExploded = true;
        isCharging = false;
        cancelAnimationFrame(animationFrameId);

        const tl = gsap.timeline();

        // Reduced motion: skip scale animation, just fade out
        if (prefersReducedMotion) {
            tl.to(pukpukContainer, {
                opacity: 0,
                duration: 0.01
            });
        } else {
            tl.to(pukpukContainer, {
                scale: 15,
                opacity: 0,
                duration: 0.8,
                ease: 'power4.in'
            });
        }

        tl.to(heroSection, {
            backgroundColor: '#ff0099',
            duration: 0.1
        })
            .to(heroBg, { opacity: 0, duration: 0.1 }, '<')
            .set(heroSection, { backgroundColor: '#eaddcf' })
            .to(heroContent, {
                opacity: 1,
                duration: 0.1
            })
            .from('.hero__image', {
                scale: prefersReducedMotion ? 1 : 1.2,
                y: prefersReducedMotion ? 0 : 100,
                opacity: 0,
                duration: prefersReducedMotion ? 0.01 : 1.2,
                ease: 'power3.out'
            }, '-=1.2')
            .from('.hero__text--back', {
                x: prefersReducedMotion ? 0 : -100,
                opacity: 0,
                duration: prefersReducedMotion ? 0.01 : 1
            }, '-=1')
            .from('.hero__text--front', {
                x: prefersReducedMotion ? 0 : 100,
                opacity: 0,
                duration: prefersReducedMotion ? 0.01 : 1
            }, '-=0.8')
            .from('.garment-tag', {
                x: prefersReducedMotion ? 0 : 200,
                rotation: prefersReducedMotion ? 0 : 90,
                duration: prefersReducedMotion ? 0.01 : 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .call(() => {
                if (onUnlock) onUnlock();
            });
    };

    // Animation loop for charging
    const animateCharge = () => {
        if (isCharging && !isExploded) {
            chargeProgress = Math.min(100, chargeProgress + 1.0);

            if (chargeProgress >= 100) {
                handleExplosion();
            }
        } else if (!isExploded) {
            chargeProgress = Math.max(0, chargeProgress - 4);
        }

        chargeFill.style.width = `${chargeProgress}%`;
        chargeFill.style.backgroundColor = `hsl(${100 + chargeProgress * 2}, 100%, 50%)`;

        if (!isExploded) {
            if (isCharging) {
                heroStatusText.textContent = chargeProgress > 80 ? 'ALMOST THERE!' : 'CHARGING...';
            } else {
                heroStatusText.textContent = 'HOLD OR PRESS SPACE';
            }
        }

        if (isCharging && !isExploded) {
            const intensity = chargeProgress / 100;
            // Keep color effect, skip motion/shake when reduced motion is preferred
            heroBg.style.filter = `hue-rotate(${chargeProgress * 4}deg) blur(${intensity * 2}px)`;
            if (!prefersReducedMotion) {
                heroBg.style.transform = `scale(${1 + intensity * 0.15}) rotate(${Math.sin(chargeProgress * 0.2) * 3}deg) skewX(${Math.cos(chargeProgress * 0.1) * 2}deg)`;
            }
        } else if (!isExploded) {
            heroBg.style.transition = 'all 0.5s ease-out';
            heroBg.style.filter = 'none';
            heroBg.style.transform = 'none';
        }

        animationFrameId = requestAnimationFrame(animateCharge);
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(animateCharge);

    // Event listeners
    heroSection.addEventListener('mousedown', startCharge);
    heroSection.addEventListener('mouseup', endCharge);
    heroSection.addEventListener('mouseleave', endCharge);
    heroSection.addEventListener('touchstart', startCharge);
    heroSection.addEventListener('touchend', endCharge);

    document.addEventListener('keydown', (e) => {
        if (isExploded || isCharging) return;
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            startCharge();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            endCharge();
        }
    });
}
