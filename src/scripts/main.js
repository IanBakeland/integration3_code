// Section imports
import { initNavigation } from './sections/navigation.js';
import { initHero } from './sections/hero.js';
import { initPukPukAnimations } from './sections/pukpuk.js';



initNavigation();


initHero(() => {
    unlockContent();
});


function unlockContent() {
    document.body.classList.remove('locked');
    document.body.style.overflowY = 'auto';

    // Show main content
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('hidden');

    // Show navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('visible');
    }
}

initPukPukAnimations();