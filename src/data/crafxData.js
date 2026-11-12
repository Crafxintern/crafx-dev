/**
 * CRAFX DEV — Central Content & Placeholder Data Store
 * All [PLACEHOLDER] items are clearly marked for easy replacement with real client/project data.
 */

export const AGENCY_INFO = {
  name: 'CRAFX DEV',
  parentStudio: 'CRAFX Studio',
  tagline: 'A creative web development agency',
  motto: 'Crafting modern, high-performing websites for ambitious brands.',
  emailPlaceholder: 'hello@crafx.dev [EMAIL — PLACEHOLDER]',
  emailHref: 'mailto:crafx.brandingintern@gmail.com',
  locationPlaceholder: '[CITY, COUNTRY — PLACEHOLDER]',
  coordinatesPlaceholder: '[LAT° N, LONG° E — PLACEHOLDER]',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST',
  copyright: 'Copyright © 2026 CRAFX DEV',
  leadContact: {
    name: '[FOUNDER / LEAD NAME — PLACEHOLDER]',
    role: 'Creative & Technical Lead · CRAFX DEV',
    initials: 'CD'
  },
  socials: [
    { label: 'LinkedIn', href: '#contact', placeholder: '[LINKEDIN — PLACEHOLDER]' },
    { label: 'X / Twitter', href: '#contact', placeholder: '[X — PLACEHOLDER]' },
    { label: 'Instagram', href: '#contact', placeholder: '[INSTAGRAM — PLACEHOLDER]' }
  ]
};

export const HERO_NOTES = [
  { pos: 'tl', line1: 'CRAFX DEV', line2: 'PART OF CRAFX STUDIO' },
  { pos: 'ml', line1: 'CUSTOM WEB DESIGN', line2: 'FULL-STACK DEVELOPMENT' },
  { pos: 'bl', line1: 'RESPONSIVE & FAST', line2: 'BUILT FOR CONVERSION' },
  { pos: 'tr', line1: 'UI/UX ARCHITECTURE', line2: 'INTERACTIVE MOTION' },
  { pos: 'mr', line1: 'MODERN TECH STACK', line2: 'SCALABLE CODEBASES' },
  { pos: 'br', line1: 'END-TO-END DELIVERY', line2: 'DESIGN TO DEPLOYMENT' }
];

export const CLIENT_LOGO_SLOTS = [
  {
    id: 1,
    front: { code: 'CLIENT 01', label: '[LOGO PLACEHOLDER 01]', sector: 'SaaS & AI' },
    back: { code: 'CLIENT 05', label: '[LOGO PLACEHOLDER 05]', sector: 'Fintech' }
  },
  {
    id: 2,
    front: { code: 'CLIENT 02', label: '[LOGO PLACEHOLDER 02]', sector: 'E-Commerce' },
    back: { code: 'CLIENT 06', label: '[LOGO PLACEHOLDER 06]', sector: 'Real Estate' }
  },
  {
    id: 3,
    front: { code: 'CLIENT 03', label: '[LOGO PLACEHOLDER 03]', sector: 'Enterprise Tech' },
    back: { code: 'CLIENT 07', label: '[LOGO PLACEHOLDER 07]', sector: 'Healthcare' }
  },
  {
    id: 4,
    front: { code: 'CLIENT 04', label: '[LOGO PLACEHOLDER 04]', sector: 'Consumer Brand' },
    back: { code: 'CLIENT 08', label: '[LOGO PLACEHOLDER 08]', sector: 'Hospitality' }
  },
  {
    id: 5,
    front: { code: 'CLIENT 05', label: '[LOGO PLACEHOLDER 05]', sector: 'Fintech' },
    back: { code: 'CLIENT 01', label: '[LOGO PLACEHOLDER 01]', sector: 'SaaS & AI' }
  },
  {
    id: 6,
    front: { code: 'CLIENT 06', label: '[LOGO PLACEHOLDER 06]', sector: 'Real Estate' },
    back: { code: 'CLIENT 02', label: '[LOGO PLACEHOLDER 02]', sector: 'E-Commerce' }
  },
  {
    id: 7,
    front: { code: 'CLIENT 07', label: '[LOGO PLACEHOLDER 07]', sector: 'Healthcare' },
    back: { code: 'CLIENT 03', label: '[LOGO PLACEHOLDER 03]', sector: 'Enterprise Tech' }
  },
  {
    id: 8,
    front: { code: 'CLIENT 08', label: '[LOGO PLACEHOLDER 08]', sector: 'Hospitality' },
    back: { code: 'CLIENT 04', label: '[LOGO PLACEHOLDER 04]', sector: 'Consumer Brand' }
  }
];

export const SERVICE_TABS = [
  {
    nr: '01',
    id: 'sp-visual-0',
    title: 'Structure, UI/UX & Web Design',
    description:
      'Information architecture, sitemaps, wireframes, and bespoke visual interfaces designed around your brand identity before a single line of code is written.',
    caption: 'Capability 01 — Interactive UI/UX & Design Systems [VISUAL PLACEHOLDER]',
    themeColor: '#4556d9',
    accentColor: '#6d86fe',
    badge: 'UI/UX & Design',
    metrics: ['Information Architecture', 'Figma Prototypes', 'Responsive Design System']
  },
  {
    nr: '02',
    id: 'sp-visual-1',
    title: 'Custom Frontend & Full-Stack Build',
    description:
      'Hand-engineered in modern frameworks (React, Next.js, Astro, Webflow, or custom stacks) with clean semantic markup that search engines and users love.',
    caption: 'Capability 02 — Clean Production Code & Architecture [VISUAL PLACEHOLDER]',
    themeColor: '#ff3232',
    accentColor: '#ff7a18',
    badge: 'Full-Stack Code',
    metrics: ['React / Next.js / Astro', 'Webflow & Headless CMS', 'API & Custom Integrations']
  },
  {
    nr: '03',
    id: 'sp-visual-2',
    title: 'Interactive Motion & 3D WebGL',
    description:
      'Purposeful GSAP scroll choreography, Three.js / WebGL scenes, and tactile micro-interactions that make your brand unforgettable at 60fps.',
    caption: 'Capability 03 — 60fps GSAP Choreography & WebGL [VISUAL PLACEHOLDER]',
    themeColor: '#37be95',
    accentColor: '#89efca',
    badge: 'Motion & 3D',
    metrics: ['Three.js & Custom Shaders', 'GSAP Scroll Choreography', 'Micro-Interactions']
  },
  {
    nr: '04',
    id: 'sp-visual-3',
    title: 'Speed, SEO & Effortless Handover',
    description:
      'Rigorous testing across real mobile devices, Core Web Vitals optimization, technical SEO setup, and a tailored CMS your team can update in minutes.',
    caption: 'Capability 04 — Mobile-First Performance & CMS Handover [VISUAL PLACEHOLDER]',
    themeColor: '#3aaae4',
    accentColor: '#addfff',
    badge: 'Launch & Scale',
    metrics: ['Core Web Vitals Tuned', 'Technical SEO & Schema', 'Team CMS Training']
  }
];

export const SERVICE_PLANS = [
  {
    key: 'launch',
    doodle: 'rocket',
    title: 'Launch',
    subtitle: 'Start something new',
    summary:
      'For new brands, products, and businesses that need a standout custom website designed and engineered from the ground up.',
    ctaLabel: 'Start with Launch',
    items: [
      { name: 'Custom website design & build', tag: 'Popular', servicePreselect: 'Website' },
      { name: 'High-converting landing pages', tag: 'Popular', servicePreselect: 'Website' },
      { name: 'UI/UX design & interactive prototypes', tag: null, servicePreselect: 'UI/UX' },
      { name: 'Immersive 3D & motion websites', tag: 'New', servicePreselect: '3D' },
      { name: 'E-commerce & storefront builds', tag: null, servicePreselect: 'Website' },
      { name: 'Web app & SaaS frontend interfaces', tag: null, servicePreselect: 'UI/UX' }
    ]
  },
  {
    key: 'evolve',
    doodle: 'sync',
    title: 'Evolve',
    subtitle: 'Outgrow what you have',
    summary:
      'For established teams whose business has outgrown an outdated, slow, or template-looking website and needs a sharp upgrade.',
    ctaLabel: 'Start with Evolve',
    items: [
      { name: 'Complete website redesign & rebuild', tag: 'Popular', servicePreselect: 'Website' },
      { name: 'UI/UX & conversion rate audit', tag: null, servicePreselect: 'UI/UX' },
      { name: 'Speed & Core Web Vitals optimization', tag: null, servicePreselect: 'Website' },
      { name: 'CMS & platform migration', tag: null, servicePreselect: 'Website' },
      { name: 'Mobile responsiveness overhaul', tag: null, servicePreselect: 'UI/UX' },
      { name: 'Technical SEO & accessibility upgrade', tag: null, servicePreselect: 'Other' }
    ]
  },
  {
    key: 'scale',
    doodle: 'trend-up',
    title: 'Scale',
    subtitle: 'Grow what works',
    summary:
      'For growing brands that need modular design systems, continuous feature drops, new campaign pages, and reliable engineering support.',
    ctaLabel: 'Start with Scale',
    items: [
      { name: 'Web component libraries & design systems', tag: null, servicePreselect: 'UI/UX' },
      { name: 'Webflow, Framer & headless CMS builds', tag: 'Popular', servicePreselect: 'Website' },
      { name: '3D product configurators & showcases', tag: null, servicePreselect: '3D' },
      { name: 'Campaign microsites & launch pages', tag: null, servicePreselect: 'Website' },
      { name: 'Custom API & third-party integrations', tag: null, servicePreselect: 'Other' },
      { name: 'Ongoing web development retainer', tag: 'Popular', servicePreselect: 'Website' }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    index: 0,
    num: '01',
    slug: 'project-slot-01',
    industry: 'SaaS & AI',
    title: 'Next-gen AI workflow platform & interactive product showcase',
    clientPlaceholder: '[CLIENT 01 — PLACEHOLDER]',
    shortName: 'Project 01 [Placeholder]',
    primaryTag: 'Web Development',
    year: '2026',
    colorVar: '--c-indigo',
    tagVar: '--c-indigo-tag',
    washVar: '--c-indigo-wash',
    hex: '#4556d9',
    accentHex: '#6d86fe',
    deliverables: ['UI/UX Architecture', 'Custom React / Next.js Build', 'Interactive 3D Product Tour', 'Design System'],
    summary:
      '[PROJECT 01 SUMMARY PLACEHOLDER] — A custom-engineered marketing and product platform designed to explain complex AI workflows through tactile interactive demos and 60fps scroll storytelling.',
    challenge:
      '[PLACEHOLDER] Replace this slot with your client’s core business challenge, legacy site limitations, and target audience goals.',
    solution:
      '[PLACEHOLDER] Replace this slot with how CRAFX DEV architected the UI/UX, front-end stack, motion design, and CMS handover.'
  },
  {
    index: 1,
    num: '02',
    slug: 'project-slot-02',
    industry: 'E-Commerce',
    title: 'High-conversion flagship storefront & bespoke checkout experience',
    clientPlaceholder: '[CLIENT 02 — PLACEHOLDER]',
    shortName: 'Project 02 [Placeholder]',
    primaryTag: 'E-Commerce Build',
    year: '2026',
    colorVar: '--c-red',
    tagVar: '--c-red-tag',
    washVar: '--c-red-wash',
    hex: '#ff3232',
    accentHex: '#ff7a18',
    deliverables: ['Custom Storefront UI', 'Headless E-Commerce', 'Mobile-First Checkout', 'Speed Optimization'],
    summary:
      '[PROJECT 02 SUMMARY PLACEHOLDER] — An editorial, lightning-fast storefront built for instant product discovery, seamless mobile filtering, and frictionless checkout.',
    challenge:
      '[PLACEHOLDER] Replace this slot with the client’s e-commerce conversion goals, catalog complexity, and mobile performance targets.',
    solution:
      '[PLACEHOLDER] Replace this slot with CRAFX DEV’s custom storefront architecture, interactive product cards, and checkout engineering.'
  },
  {
    index: 2,
    num: '03',
    slug: 'project-slot-03',
    industry: 'Fintech',
    title: 'Real-time financial analytics web app & brand platform',
    clientPlaceholder: '[CLIENT 03 — PLACEHOLDER]',
    shortName: 'Project 03 [Placeholder]',
    primaryTag: 'UI/UX & Frontend',
    year: '2026',
    colorVar: '--c-neem',
    tagVar: '--c-neem-tag',
    washVar: '--c-neem-wash',
    hex: '#37be95',
    accentHex: '#89efca',
    deliverables: ['Design System', 'Interactive Data Visuals', 'Frontend Engineering', 'Technical SEO'],
    summary:
      '[PROJECT 03 SUMMARY PLACEHOLDER] — Clarity-first interface design and responsive web engineering for a modern financial technology platform.',
    challenge:
      '[PLACEHOLDER] Replace this slot with the fintech client’s trust, security, and data-visualization requirements.',
    solution:
      '[PLACEHOLDER] Replace this slot with the modular component library, live interactive calculators, and accessible frontend build.'
  },
  {
    index: 3,
    num: '04',
    slug: 'project-slot-04',
    industry: 'Architecture & Design',
    title: 'Immersive spatial portfolio & motion-driven studio website',
    clientPlaceholder: '[CLIENT 04 — PLACEHOLDER]',
    shortName: 'Project 04 [Placeholder]',
    primaryTag: '3D Web & Motion',
    year: '2026',
    colorVar: '--c-marigold',
    tagVar: '--c-marigold-tag',
    washVar: '--c-marigold-wash',
    hex: '#ff7a18',
    accentHex: '#f9cc21',
    deliverables: ['WebGL Gallery', 'GSAP Scroll Transitions', 'Custom CMS', 'Editorial Typography'],
    summary:
      '[PROJECT 04 SUMMARY PLACEHOLDER] — A gallery-grade web experience with fluid page transitions, high-resolution visual storytelling, and an effortless project CMS.',
    challenge:
      '[PLACEHOLDER] Replace this slot with the client’s visual presentation needs and media-heavy performance constraints.',
    solution:
      '[PLACEHOLDER] Replace this slot with CRAFX DEV’s progressive image pipeline, smooth Lenis + GSAP choreography, and custom CMS.'
  },
  {
    index: 4,
    num: '05',
    slug: 'project-slot-05',
    industry: 'Enterprise Tech',
    title: 'Scalable multi-page corporate platform & component library',
    clientPlaceholder: '[CLIENT 05 — PLACEHOLDER]',
    shortName: 'Project 05 [Placeholder]',
    primaryTag: 'Custom Website',
    year: '2026',
    colorVar: '--c-monsoon',
    tagVar: '--c-monsoon-tag',
    washVar: '--c-monsoon-wash',
    hex: '#3aaae4',
    accentHex: '#addfff',
    deliverables: ['Information Architecture', 'Multi-Page Web Build', 'Headless CMS', 'Performance Audit'],
    summary:
      '[PROJECT 05 SUMMARY PLACEHOLDER] — A structured, fast-loading enterprise website built around a reusable component system so marketing can launch pages in hours.',
    challenge:
      '[PLACEHOLDER] Replace this slot with the enterprise client’s multi-stakeholder content needs and scalability goals.',
    solution:
      '[PLACEHOLDER] Replace this slot with CRAFX DEV’s token-driven design system, semantic HTML build, and team onboarding.'
  },
  {
    index: 5,
    num: '06',
    slug: 'project-slot-06',
    industry: 'Health & Wellness',
    title: 'Accessible digital booking platform & complete web redesign',
    clientPlaceholder: '[CLIENT 06 — PLACEHOLDER]',
    shortName: 'Project 06 [Placeholder]',
    primaryTag: 'Web Redesign',
    year: '2026',
    colorVar: '--c-gulabi',
    tagVar: '--c-gulabi-tag',
    washVar: '--c-gulabi-wash',
    hex: '#ee67aa',
    accentHex: '#ffc4dc',
    deliverables: ['UX Audit & Redesign', 'Custom Booking Flow', 'WCAG Accessibility', 'SEO Migration'],
    summary:
      '[PROJECT 06 SUMMARY PLACEHOLDER] — A warm, human-centric website redesign that simplified user journeys and modernized mobile performance.',
    challenge:
      '[PLACEHOLDER] Replace this slot with the client’s previous drop-off points and mobile usability bottlenecks.',
    solution:
      '[PLACEHOLDER] Replace this slot with CRAFX DEV’s streamlined UX flow, accessible UI components, and zero-downtime launch.'
  }
];

export const WHY_CHOOSE_US = [
  {
    doodle: 'puzzle',
    title: 'Design & code under one roof',
    body: 'The same tightly-knit team that shapes your UI/UX writes the production code—so every layout, transition, and detail ships exactly as approved.'
  },
  {
    doodle: 'setting',
    title: 'Engineered for real-world speed',
    body: 'We optimize assets, DOM structure, and 60fps motion so your site feels instant on everyday mobile phones, not just studio desktops.'
  },
  {
    doodle: 'layer',
    title: '100% custom, zero templates',
    body: 'We never force your brand into a generic theme. Every section, grid, and interaction is architected specifically around your positioning.'
  },
  {
    doodle: 'globe',
    title: 'Built for SEO & discoverability',
    body: 'Clean semantic HTML, structured schema data, fast Core Web Vitals, and logical heading hierarchy built in from day one.'
  },
  {
    doodle: 'file-contract',
    title: 'Clear scope & transparent delivery',
    body: 'Written scope before we start, live staging links throughout the build, and direct communication with the designers and developers.'
  },
  {
    doodle: 'unbox',
    title: 'Full ownership & easy updates',
    body: 'Once launched, the codebase and design files are 100% yours, backed by a clean CMS and a recorded walkthrough for your team.'
  }
];

export const CLIENT_REVIEWS_PLACEHOLDERS = [
  {
    id: 'review-01',
    clientMark: '[CLIENT 01 LOGO — PLACEHOLDER]',
    quote:
      '“[CLIENT TESTIMONIAL PLACEHOLDER 01 — Reserved for your real client review about working with CRAFX DEV on their website design and development.]”',
    name: '[Client Name 01 — Placeholder]',
    role: '[Title & Company — Placeholder]',
    initials: 'C1'
  },
  {
    id: 'review-02',
    clientMark: '[CLIENT 02 LOGO — PLACEHOLDER]',
    quote:
      '“[CLIENT TESTIMONIAL PLACEHOLDER 02 — Reserved for your real client feedback on UI/UX quality, responsiveness, and launch execution.]”',
    name: '[Client Name 02 — Placeholder]',
    role: '[Title & Company — Placeholder]',
    initials: 'C2'
  },
  {
    id: 'review-03',
    clientMark: '[CLIENT 03 LOGO — PLACEHOLDER]',
    quote:
      '“[CLIENT TESTIMONIAL PLACEHOLDER 03 — Reserved for your real client feedback on communication, speed optimization, and post-launch results.]”',
    name: '[Client Name 03 — Placeholder]',
    role: '[Title & Company — Placeholder]',
    initials: 'C3'
  }
];

export const DELIVERY_PROMISES = [
  {
    doodle: 'file-contract',
    text: 'Written scope, timeline, and milestones before any work begins'
  },
  {
    doodle: 'puzzle',
    text: 'One dedicated team from initial wireframe to production deployment'
  },
  {
    doodle: 'message',
    text: 'Direct access to the designers and developers building your site'
  },
  {
    doodle: 'unbox',
    text: 'Complete ownership of design files, source code, and CMS at handover'
  }
];

export const PROCESS_STEPS = [
  {
    num: '01',
    name: 'Structure first',
    title: 'Structure first',
    body: 'We align on your business goals, audience, and references, mapping out every page’s job and content hierarchy before design starts.',
    deliverables: ['Sitemap & information architecture', 'Wireframes & user flow', 'Technical stack & scope']
  },
  {
    num: '02',
    name: 'Design & motion system',
    title: 'Design & motion system',
    body: 'We design the flagship page first—establishing typography, color, layout rhythm, and interactive motion—then extend the system across every screen.',
    deliverables: ['Desktop & mobile Figma prototypes', 'Interactive motion direction', 'Reusable UI component library']
  },
  {
    num: '03',
    name: 'Built as designed',
    title: 'Built as designed',
    body: 'Our developers build your site with pixel accuracy, responsive fluidity, custom animations, and clean CMS collections on a live staging link.',
    deliverables: ['Live staging environment', 'Production frontend & CMS', 'Technical SEO & metadata']
  },
  {
    num: '04',
    name: 'Tested on real devices',
    title: 'Tested on real devices',
    body: 'We test across real phones, browsers, and network speeds, configure analytics and redirects, launch smoothly, and train your team.',
    deliverables: ['Cross-device QA & speed tuning', 'Domain & deployment launch', 'Team CMS handover & training']
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Which technologies and platforms do you build websites on?',
    a: 'We recommend the stack that best fits your goals and team workflow: custom code (React, Next.js, Astro, Three.js / WebGL, GSAP) when you need bespoke functionality or immersive performance, and Webflow, Framer, or Shopify when your marketing team needs rapid visual editing.'
  },
  {
    q: 'Do you handle both UI/UX design and full website development?',
    a: 'Yes. CRAFX DEV handles the entire website lifecycle end-to-end—from information architecture, wireframing, and UI/UX design to custom motion, frontend/backend development, and launch.'
  },
  {
    q: 'Will our website be mobile-responsive and optimized for SEO?',
    a: 'Yes. Every website we build is engineered mobile-first, tested on real iOS and Android devices, and structured with clean semantic HTML, fast Core Web Vitals, and complete technical SEO metadata.'
  },
  {
    q: 'Can our team update text, images, and pages ourselves after launch?',
    a: 'Absolutely. We structure the CMS around the content your team updates most frequently and provide a complete walkthrough before handover so everyday edits never require a developer ticket.'
  },
  {
    q: 'How long does a custom website project take?',
    a: 'Timelines depend on the number of pages, content readiness, and interactive or 3D complexity. A focused landing page or marketing site typically takes a few weeks, while larger multi-page builds or custom web apps are mapped with clear phase milestones on our first call.'
  },
  {
    q: 'Who owns the design files and code once the project is completed?',
    a: 'You do. Once the project is completed, full ownership of the design files, source code repository, and live website is handed over directly to your brand.'
  }
];
