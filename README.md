# CRAFX DEV — Official Agency Website (Homepage)

Creative web development agency website for **CRAFX DEV** (part of **CRAFX Studio**), designed and engineered after the `bunqlabs.com` UI/UX and motion reference.

## Homepage Structure (11 Continuous Sections)

1. **Header / Navigation (`.site-nav`)** — Floating glass pill with official `CRAFX [DEV]™` logo (`721×120` transparent PNG), smooth-scroll navigation (`Home`, `Dev Services`, `Projects`, `Reviews`, `Contact Us`), expandable `Menu` drawer with interactive service hover preview, `Let's talk` 3-step enquiry drawer, ambient sound toggle, and `Dark / Light / System` theme switcher.
2. **Hero Section (`#hero`)** — Three.js 3D low-poly mountain peak, 3,200 falling snow particles, floating 3D showreel screen with tilted orbital ring & spinning 4-point red star, peripheral ScrambleText annotations, display headline with animated 3-stroke SVG underline, and CTAs.
3. **Client Logos (`#clients`)** — 4×2 grid of 3D flipping client logo prisms (`.logo-roll`) using `[CLIENT LOGO 01–08]` placeholders.
4. **About Us (`#about`)** — Editorial statement with staggered `.pen-word` reveal, variable slant typography, popping inline icons, red `.sel` selection frame, handwritten margin notes, and studio overview with live `IST` clock.
5. **Video of Our Work (`#video-showcase`)** — Interactive 60fps showreel player with 4 capability chapters, Play/Pause & Chapter controls, and capability tags.
6. **Services Cards (`#services`)** — Interactive numbered visual tabs (`01–04`) with auto-advancing progress bars + 3-column **Launch / Evolve / Scale** service cards with animated SVG doodle icons.
7. **Projects Cards (`#projects`)** — 3D curved arc project card carousel (`01 / 06`) with pointer drag, dynamic floor spotlight glow, custom frosted-glass `Drag / Open` cursor bubble, and slide-up case study preview modal (`#project`).
8. **Why Choose Us & Reviews (`#why-us` & `#reviews`)** — 6 differentiator cards with animated SVG doodles, client review carousel (`[CLIENT TESTIMONIAL PLACEHOLDERS]`), delivery promises checklist, and 4-step horizontal expanding process accordion.
9. **FAQ (`#faq`)** — Sticky split-column FAQ with smooth-animating `<details>` accordions.
10. **Contact Us (`#contact`)** — Atmospheric horizon backdrop + embedded 3-step interactive project enquiry form.
11. **Footer (`.home-foot`)** — Official `CRAFX [DEV]™` brand lockup, 3-column collapsible sitemap, newsletter subscription, and global coordinates bar.

## Running Locally

You can serve `C:\crafx\crafx dev` with any static HTTP server (zero build step required thanks to native ES modules and locally vendored `three.module.min.js`) or with Vite:

```powershell
cd "C:\crafx\crafx dev"
python -m http.server 5173
```

Then open `http://localhost:5173`.
