## Copilot Instructions — MoMu Interactive Longread (Vite + GSAP)

### 1) Projectcontext & doelen
Je bouwt een immersive, interactieve one-pager voor **MoMu (Fashion Museum Antwerp)**: een **longread** met sterke **storytelling** en **interactiviteit** (niet enkel animatie). De experience moet bezoekers:
- inhoudelijk iets bijleren over de ontwerper (focus: **Walter Van Beirendonck**),
- triggeren om verder te exploreren,
- aanzetten tot een museumbezoek.

**Kern-eisen (rubrics / constraints):**
- **Cross-browser:** Safari + Chrome, desktop + mobile.
- **Performance:** minimal JS, responsive images, geen onnodige dependencies.
- **Code quality:** uitgepuurd, geen repetitie, **BEM** voor CSS, elke regel is te verantwoorden.
- **Responsive:** mobile-first, progressive enhancement.

---

### 2) Tech stack & verboden keuzes

#### Bundler / tooling
- **Vite** voor bundling van JS/CSS, dependencies via npm.
- Geen SSR/backend; statische site.

#### Interactie/animatie
- **Vanilla JS (ES modules)** + **GSAP + ScrollTrigger** voor scroll-gekoppelde animaties en transities.
- **CSS eerst**; GSAP enkel wanneer het functioneel meerwaarde biedt.
- Voor responsive GSAP: gebruik `gsap.matchMedia()` en respecteer `prefers-reduced-motion`.

#### Verboden / niet gewenst
- Geen **jQuery**.
- Geen zware frameworks (React/Vue) tenzij expliciet gevraagd.
- Geen “magic” code zonder uitleg of duidelijke motivatie.

---

### 3) Project-architectuur (aanbevolen)

#### Mappenstructuur

```txt
src/
├─ styles/
│  ├─ global.css            # base, typography, layout primitives
│  └─ components/           # section-specifieke CSS (optioneel)
├─ scripts/
│  ├─ animations/           # GSAP timelines per sectie
│  ├─ sections/             # per-sectie modules met init()
│  └─ utils/                # helpers (clamp, media, prefersReducedMotion, ...)
└─ assets/
   ├─ img/                  # responsive images (avif/webp + fallback)
   └─ video/                # gecomprimeerd, lazy waar mogelijk

public/                     # statische files (niet door Vite verwerkt)
index.html                  # main HTML file
```
#### Routing
- Eén one-pager: `index.html` + secties met anchors.

---

### 4) Code conventies (kwaliteit en consistentie)

#### JavaScript
- ES Modules (`import/export`), geen globale variabelen.
- Moduleer per sectie: elke sectie heeft een `init()`.
- Vermijd repetitie: maak herbruikbare helpers (bv. `createScrollTimeline({ trigger, ... })`).
- Gebruik `const`/`let`, arrow functions, template literals, destructuring, spread/rest.
- Documenteer complexe stukken code: **wat/waarom**, en benoem trade-offs.

#### CSS
- **BEM naming verplicht:**
  - Block: `.gallery`
  - Element: `.gallery__item`
  - Modifier: `.gallery__item--active`
- Mobile-first.
- Media queries:
  - Gebruik **em**, geen px.
  - Gebruik **min-width** queries.
- CSS custom properties voor theming/typografie.
- zet niets in px, alles in **rem**

**Design tokens aanpak:**
- Definieer globale tokens in `:root` (kleuren, spacing, typography, radii, z-index, timing).
- Gebruik tokens overal (bv. `var(--space-4)`, `var(--font-size-2)`), vermijd “magic numbers”.
- Override tokens per sectie/thema via wrapper modifiers (bv. `.theme--mask { --color-bg: ...; }`) i.p.v. styles te dupliceren.

#### Progressive enhancement
- De pagina is leesbaar en navigeerbaar zonder JS.
- Interacties “enhancen” de ervaring, maar content blijft toegankelijk.

---

### 5) Animatie- en interactieprincipes

#### Definitie
- **Interactie** = user kan iets doen (kiezen, slepen, combineren, togglen, ontdekken).
- **Animatie** = visuele transitie die interactiviteit ondersteunt.

#### GSAP best practices
- Gebruik `ScrollTrigger` met duidelijke triggers en start/end.
- Gebruik `matchMedia` voor breakpoints en reduced motion.
- Gebruik waar mogelijk percentages/viewport units i.p.v. vaste pixels.

#### Asset-strategieën
- Overweeg spritesheets voor snelle image switching, maar bewaak dimensies en geheugendruk.
- Laad assets gefaseerd per hoofdstuk/sectie; preload alleen wat functioneel nodig is.

---

### 6) Performance & compatibiliteit (code-level)

#### Performance richtlijnen
- Minimal JS: geen onnodige dependencies, tree-shaking respecteren.
- Responsive images correct integreren (sizes/srcset), lazy waar passend.
- Vermijd layout shift: altijd `width`/`height` of `aspect-ratio`.

#### Cross-device input
- Gebruik **pointer events** (`pointerdown/move/up`) wanneer relevant (touch + mouse unified).
- Vermijd platform-fragiele CSS/JS; hou rekening met iOS Safari beperkingen (scroll/pinning, vh-units, fixed positioning).

#### Responsive images integratie (Respimagen output)
Ga uit van deze integratie-standaard wanneer afbeeldingen worden toegevoegd:
- Targets: **AVIF** + **WebP** + fallback (indien nodig), met meerdere groottes voor `srcset`.
- In HTML: gebruik bij voorkeur `<picture>` met:
  - `<source type="image/avif">`
  - `<source type="image/webp">`
  - `<img>` fallback
- Niet-critical images: `loading="lazy"` en `decoding="async"`.
- Above-the-fold/hero kan `fetchpriority="high"` krijgen.
- Bestandsnamen en mapstructuur consistent houden in `src/assets/img/` (of `public/` wanneer nodig).

---

### 7) Hoe Copilot moet samenwerken (outputstijl)
Copilot moet steeds:
- Eerst kort verduidelijken wat het gaat bouwen (aanpak + betrokken bestanden).
- Uitleg geven per codeblok: wat doet dit, waarom nodig, trade-offs.
- Minstens **2 alternatieven** geven wanneer er meerdere valide opties zijn (bv. CSS vs GSAP).
- Kritisch zijn op performance & browser support, zeker iOS Safari.
- Officiële documentatie als leidraad (GSAP/ScrollTrigger/Vite).
- Geen “copy-paste dump”: liever kleine, testbare stappen.
