/**
 * Mask Section Module
 * Handles zipper interaction and mask reveal animation
 */

export function initMaskSection() {
    const maskSection = document.getElementById('mask');
    const maskLeft = document.getElementById('mask-left');
    const maskRight = document.getElementById('mask-right');
    const maskContent = document.getElementById('mask-content');
    const maskInstructions = document.getElementById('mask-instructions');
    const zipperPull = document.getElementById('zipper-pull');
    const zipperTrack = document.getElementById('zipper-track');
    const maskForeground = document.querySelector('.mask__foreground');

    let maskCompleted = false;

    // Create the opening timeline (paused)
    const tl = gsap.timeline({ paused: true });

    // The unzipping/splitting animation
    tl.to(maskLeft, {
        xPercent: -120,
        rotation: -5,
        ease: 'power1.inOut',
        duration: 1
    }, 0)
        .to(maskRight, {
            xPercent: 120,
            rotation: 5,
            ease: 'power1.inOut',
            duration: 1
        }, 0)
        .fromTo(maskContent, {
            scale: 0.5,
            opacity: 0,
            filter: 'blur(10px)'
        }, {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.8
        }, 0.2);

    // Pin the section
    const maskPin = ScrollTrigger.create({
        trigger: maskSection,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true
    });

    // Calculate bounds for drag
    const trackHeight = zipperTrack.offsetHeight || window.innerHeight;
    const pullHeight = zipperPull.offsetHeight || 100;
    const maxDrag = trackHeight - pullHeight;

    // Function to complete the mask section
    const completeMaskSection = () => {
        if (maskCompleted) return;
        maskCompleted = true;

        maskInstructions.classList.add('hidden');

        gsap.to(maskForeground, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                maskForeground.style.pointerEvents = 'none';
                maskForeground.style.display = 'none';

                if (maskPin) {
                    maskPin.kill();
                    ScrollTrigger.refresh();
                }
            }
        });

        tl.progress(1);
    };

    // Create draggable
    Draggable.create(zipperPull, {
        type: 'y',
        bounds: zipperTrack,
        inertia: true,
        onDrag: function () {
            const progress = Math.max(0, Math.min(1, this.y / maxDrag));
            tl.progress(progress);
        },
        onThrowUpdate: function () {
            const progress = Math.max(0, Math.min(1, this.y / maxDrag));
            tl.progress(progress);
        },
        onDragEnd: function () {
            if (this.y > maxDrag * 0.8) {
                gsap.to(this.target, { y: maxDrag, duration: 0.3, ease: 'bounce.out' });
                tl.tweenTo(tl.duration(), {
                    ease: 'power2.out',
                    onComplete: completeMaskSection
                });
            } else {
                gsap.to(this.target, { y: 0, duration: 0.5, ease: 'power2.out' });
                tl.tweenTo(0, { ease: 'power2.out' });
                maskInstructions.classList.remove('hidden');
            }
        }
    });
}
