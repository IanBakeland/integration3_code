// Section imports
import { initNavigation } from './sections/navigation.js';
import { initHero } from './sections/hero.js';


initNavigation();


initHero(() => {
    unlockContent();
});

