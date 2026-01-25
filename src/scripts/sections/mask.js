
export function initMaskSection() {

    // ====== STAP 1: Elementen ophalen ======
    const linkerHelft = document.getElementById('mask-left');
    const rechterHelft = document.getElementById('mask-right');
    const voorgrond = document.querySelector('.mask__foreground');
    const sleepKnop = document.getElementById('zipper-pull');

    // ====== STAP 2: Variabelen instellen ======
    let isAanHetSlepen = false;      // Houdt bij of we aan het slepen zijn
    let isKlaar = false;              // Houdt bij of de animatie klaar is
    let startPositie = 0;             // Waar begon de muis/vinger?

    // Hoeveel pixels moet je slepen om de animatie te voltooien?
    const sleepAfstand = window.innerHeight * 0.6; // 60% van schermbhoogte

    // ====== STAP 3: Functies ======

    /**
     * Update de positie van alles tijdens het slepen
     * @param {number} afstand - Hoeveel pixels er gesleept is
     */
    function updatePosities(afstand) {
        // Beweeg het knopje naar beneden
        gsap.set(sleepKnop, { y: afstand });

        // Bereken hoeveel procent we gesleept hebben (0 tot 100)
        const percentage = (afstand / sleepAfstand) * 100;

        // Beweeg de helften uit elkaar
        gsap.set(linkerHelft, { xPercent: -percentage });  // Naar links
        gsap.set(rechterHelft, { xPercent: percentage });   // Naar rechts
    }

    /**
     * Maak de animatie af - alles verdwijnt
     */
    function voltooiAnimatie() {
        if (isKlaar) return; // Voorkom dubbel uitvoeren
        isKlaar = true;

        // Animeer de helften helemaal open
        gsap.to(linkerHelft, { xPercent: -100, duration: 0.4 });
        gsap.to(rechterHelft, { xPercent: 100, duration: 0.4 });

        // Fade alles uit na korte pauze
        gsap.to(voorgrond, {
            opacity: 0,
            duration: 0.5,
            delay: 0.2,
            onComplete: () => {
                voorgrond.style.display = 'none';
            }
        });
    }

    /**
     * Spring terug naar startpositie
     */
    function springTerug() {
        gsap.to(sleepKnop, { y: 0, duration: 0.3 });
        gsap.to(linkerHelft, { xPercent: 0, duration: 0.3 });
        gsap.to(rechterHelft, { xPercent: 0, duration: 0.3 });
    }

    // ====== STAP 4: Event Handlers ======

    /**
     * Wanneer je begint te slepen (muisklik of touch)
     */
    function startSlepen(event) {
        if (isKlaar) return;

        event.preventDefault();
        isAanHetSlepen = true;

        // Onthoud waar we begonnen
        if (event.type === 'mousedown') {
            startPositie = event.clientY;
        } else {
            startPositie = event.touches[0].clientY;
        }

        // Voeg move/end listeners alleen toe wanneer we slepen
        document.addEventListener('mousemove', tijdensSlepen);
        document.addEventListener('touchmove', tijdensSlepen, { passive: false });
        document.addEventListener('mouseup', stopSlepen);
        document.addEventListener('touchend', stopSlepen);
    }

    /**
     * Wanneer je aan het slepen bent (muisbeweging of touch move)
     */
    function tijdensSlepen(event) {
        if (!isAanHetSlepen || isKlaar) return;

        // Huidige positie van muis/vinger
        let huidigePositie;
        if (event.type === 'mousemove') {
            huidigePositie = event.clientY;
        } else {
            huidigePositie = event.touches[0].clientY;
        }

        // Bereken hoeveel we naar beneden gesleept hebben
        const gesleepteAfstand = huidigePositie - startPositie;

        // Alleen naar beneden slepen (positieve waarde)
        if (gesleepteAfstand > 0) {
            updatePosities(gesleepteAfstand);
        }
    }

    /**
     * Wanneer je stopt met slepen (muis loslaten of touch end)
     */
    function stopSlepen() {
        if (!isAanHetSlepen || isKlaar) return;
        isAanHetSlepen = false;

        // Verwijder de move/end listeners
        document.removeEventListener('mousemove', tijdensSlepen);
        document.removeEventListener('touchmove', tijdensSlepen);
        document.removeEventListener('mouseup', stopSlepen);
        document.removeEventListener('touchend', stopSlepen);

        // Check hoever we gesleept hebben
        const huidigeY = gsap.getProperty(sleepKnop, 'y');

        if (huidigeY > sleepAfstand * 0.5) {
            // Meer dan de helft gesleept = maak animatie af
            voltooiAnimatie();
        } else {
            // Niet ver genoeg = spring terug
            springTerug();
        }
    }

    // ====== STAP 5: Event Listeners toevoegen ======

    // Start slepen - alleen op de sleepknop
    sleepKnop.addEventListener('mousedown', startSlepen);
    sleepKnop.addEventListener('touchstart', startSlepen, { passive: false });
}
