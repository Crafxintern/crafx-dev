/**
 * CRAFX DEV — Verified Content, Portfolio & Capability Data Store
 * Sources of truth:
 * 1. https://www.crafxstudio.com/ (/about, /services, /works, /works/optellix)
 * 2. https://www.behance.net/crafxstudio
 * 3. CRAFX_DEV_Antigravity_Master_Prompt.md
 */

const AGENCY_INFO = {
  name: 'CRAFX DEV',
  parentStudio: 'CRAFX Studio',
  legalName: 'CRAFX Studio LLP',
  descriptor: 'THE DIGITAL DESIGN & DEVELOPMENT ARM OF CRAFX STUDIO',
  tagline: 'Digital experiences, designed with intent. Built to work.',
  heroHeadline: 'Digital experiences. Made to move you forward.',
  heroSub:
    'We design and build websites, digital products and interfaces that make ambitious brands easier to understand, use and remember.',
  email: 'hello@crafxstudio.com',
  emailHref: 'mailto:hello@crafxstudio.com',
  phone: '+91 93214 29725',
  phoneHref: 'tel:+919321429725',
  whatsappHref: 'https://wa.me/919321429725',
  location: 'Mumbai, India',
  availability: 'Based in Mumbai, India · Working worldwide',
  address: 'CRAFX Studio LLP, Ajmera Sikova, Damodar Park, Ghatkopar (W), Mumbai – 400086, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST',
  website: 'https://www.crafxstudio.com/',
  behance: 'https://www.behance.net/crafxstudio',
  dribbble: 'https://dribbble.com/Crafxstudio',
  linkedin: 'https://www.linkedin.com/company/crafxstudio/',
  instagram: 'https://www.instagram.com/crafx_studio/',
  x: 'https://x.com/crafxstudio',
  copyright: '© 2026 CRAFX DEV · The Digital Design & Development Arm of CRAFX Studio LLP.'
};

const SERVICE_TABS = [
  {
    nr: '01',
    title: 'Website Design & Development',
    badge: 'Websites & Front-End',
    description:
      'Custom marketing websites, corporate websites, responsive website design, front-end development, and CMS-enabled websites built so visitors understand your business on the first scroll.',
    themeColor: '#fdb912',
    accentColor: '#fde047',
    image: './assets/projects/optellix-cover.webp',
    metrics: [
      'Custom marketing & corporate websites',
      'Responsive mobile-first design',
      'Clean front-end & CMS implementation'
    ]
  },
  {
    nr: '02',
    title: 'UI/UX & Product Design',
    badge: 'Product & App Interfaces',
    description:
      'User research and information architecture, user flows and wireframes, web application interfaces, mobile app UI/UX, and scalable design systems and prototypes.',
    themeColor: '#10b981',
    accentColor: '#6ee7b7',
    image: './assets/projects/fitness-app-cover.gif',
    metrics: [
      'User research, IA & wireframes',
      'Web & mobile application UI/UX',
      'Design systems & interactive prototypes'
    ]
  },
  {
    nr: '03',
    title: 'Landing Page Design',
    badge: 'Conversion & Launches',
    description:
      'Campaign landing pages, product launch pages, conversion-focused layouts, and lead-generation experiences structured around clear user action.',
    themeColor: '#3b82f6',
    accentColor: '#93c5fd',
    image: './assets/projects/optellix-03.webp',
    metrics: [
      'Product launch & campaign pages',
      'Conversion-focused visual hierarchy',
      'Lead-generation user journeys'
    ]
  },
  {
    nr: '04',
    title: 'SaaS & Digital Products',
    badge: 'SaaS & Web Apps',
    description:
      'SaaS marketing websites, dashboards and web applications, product interface design, and interactive product experiences that make complex software feel intuitive.',
    themeColor: '#14b8a6',
    accentColor: '#5eead4',
    image: './assets/projects/optellix-upwork-03.webp',
    metrics: [
      'SaaS marketing & product websites',
      'Dashboards & web app interfaces',
      'Interactive product storytelling'
    ]
  },
  {
    nr: '05',
    title: 'Website Redesign',
    badge: 'UX & Visual Refresh',
    description:
      'Visual and UX refresh, information architecture improvements, responsive optimisation, and performance-conscious implementation for brands that have outgrown their current site.',
    themeColor: '#f59e0b',
    accentColor: '#fcd34d',
    image: './assets/projects/optellix-02.webp',
    metrics: [
      'Visual & UX architecture refresh',
      'Information architecture clarity',
      'Responsive & performance optimisation'
    ]
  },
  {
    nr: '06',
    title: 'Creative Development & Motion',
    badge: 'Motion & Interaction',
    description:
      'Micro-interactions, scroll-based motion, interface animation, interactive storytelling, and thoughtful front-end experiences that elevate brand perception.',
    themeColor: '#a855f7',
    accentColor: '#d8b4fe',
    image: './assets/projects/optellix-upwork-05.webp',
    metrics: [
      'Purposeful micro-interactions',
      'Scroll-based motion & storytelling',
      'Refined front-end choreography'
    ]
  }
];

const PROJECTS_DATA = [
  {
    id: 'optellix',
    num: '01',
    title: 'Optellix — 3D SaaS Interactive Website Design',
    shortTitle: 'Optellix',
    clientPlaceholder: 'Optellix',
    industry: '3D SaaS & Engineering Tech',
    category: 'Website Design · UI/UX',
    year: 'Verified Case Study',
    isDigital: true,
    hex: '#10b981',
    accentHex: '#6ee7b7',
    coverImage: './assets/projects/optellix-cover.webp',
    secondaryImages: [
      './assets/projects/optellix-02.webp',
      './assets/projects/optellix-03.webp',
      './assets/projects/optellix-upwork-03.webp',
      './assets/projects/optellix-upwork-05.webp'
    ],
    projectUrl: 'https://www.crafxstudio.com/works/optellix',
    behanceUrl: 'https://www.behance.net/crafxstudio',
    summary:
      'Designed a modern, responsive website for Optellix, making complex 3D technology services simple, engaging, and easy to navigate. Created the complete UI/UX in Figma with custom visuals, mobile-first layouts, and conversion-focused user flows.',
    challenge:
      'Optellix builds specialized browser-based 3D engineering and SaaS tools. The website needed to explain technical capabilities clearly to enterprise decision-makers without overwhelming the browsing experience.',
    solution:
      'Developed a cohesive website and interface system built around a deep green and dark teal palette, pairing structured product storytelling with responsive desktop and mobile screens.',
    deliverables: [
      'SaaS Website UI/UX Design',
      'Responsive Desktop & Mobile Screens',
      '3D Visual Integration',
      'Conversion User Flows'
    ]
  },
  {
    id: 'fitness-app',
    num: '02',
    title: 'Fitness App — UI/UX Design & Brand Identity Case Study',
    shortTitle: 'Fitness App UI/UX',
    clientPlaceholder: 'Fitness App Case Study',
    industry: 'Health & Fitness Tech',
    category: 'Mobile App UI/UX · Brand System',
    year: 'Behance Case Study',
    isDigital: true,
    hex: '#fdb912',
    accentHex: '#fde047',
    coverImage: './assets/projects/fitness-app-cover.gif',
    secondaryImages: ['./assets/projects/peakline-cover.webp'],
    projectUrl: 'https://www.behance.net/gallery/252768879/Fitness-App-UI-UX-Design-Brand-Identity-Case-Study',
    behanceUrl: 'https://www.behance.net/gallery/252768879/Fitness-App-UI-UX-Design-Brand-Identity-Case-Study',
    summary:
      'End-to-end mobile application UI/UX design and brand identity case study crafted for a modern fitness platform—uniting intuitive workout flows, progress dashboards, and bold visual identity.',
    challenge:
      'Mobile fitness products require effortless legibility and rapid interaction during active training sessions while maintaining a distinctive brand character.',
    solution:
      'Designed the mobile user journey, dark-mode workout and analytics screens, component library, and accompanying brand identity system.',
    deliverables: [
      'Mobile App UI/UX Design',
      'User Flows & Wireframing',
      'Interactive Interface System',
      'Brand Identity & Guidelines'
    ]
  },
  {
    id: 'ekotek',
    num: '03',
    title: 'Ekotek — Brand Identity, Product Catalog & Digital Design',
    shortTitle: 'Ekotek Digital & Brand',
    clientPlaceholder: 'Ekotek',
    industry: 'Solar & Industrial Energy',
    category: 'Digital Design · Product System',
    year: 'Behance Case Study',
    isDigital: true,
    hex: '#22c55e',
    accentHex: '#86efac',
    coverImage: './assets/projects/ekotek-cover.webp',
    secondaryImages: [],
    projectUrl: 'https://www.behance.net/gallery/242358807/Ekotek-Brand-Identity-Product-Catalog-Digital-Design',
    behanceUrl: 'https://www.behance.net/gallery/242358807/Ekotek-Brand-Identity-Product-Catalog-Digital-Design',
    summary:
      'Digital design, structured product catalog system, and visual identity for Ekotek’s solar and industrial technology portfolio.',
    challenge:
      'Presenting technical solar inverter specifications and product lines clearly across both digital channels and commercial buyer documentation.',
    solution:
      'Created a unified brand system and digital product layout that organizes complex technical data into clean, scannable visual modules.',
    deliverables: [
      'Digital Product Design',
      'Technical Information Architecture',
      'Brand Identity System',
      'Marketing & Catalog Layouts'
    ]
  },
  {
    id: 'bharat-bank',
    num: '04',
    title: 'Bharat Bank — Digital & Print Campaign Design',
    shortTitle: 'Bharat Bank',
    clientPlaceholder: 'Bharat Bank',
    industry: 'Banking & Financial Services',
    category: 'Digital Campaign · Visual Communication',
    year: 'Behance Case Study',
    isDigital: true,
    hex: '#3b82f6',
    accentHex: '#93c5fd',
    coverImage: './assets/projects/bharat-bank-cover.webp',
    secondaryImages: [],
    projectUrl: 'https://www.behance.net/gallery/251529361/Bharat-Bank-Print-Digital-Brochure-Flyer-Design',
    behanceUrl: 'https://www.behance.net/gallery/251529361/Bharat-Bank-Print-Digital-Brochure-Flyer-Design',
    summary:
      'Digital and print visual communication layouts designed for Bharat Bank—making retail banking services clear, trustworthy, and approachable.',
    challenge:
      'Financial product communication must balance regulatory clarity with immediate visual comprehension across digital and physical customer touchpoints.',
    solution:
      'Developed structured campaign visuals, digital brochures, and clear typographic hierarchy tailored for everyday banking customers.',
    deliverables: [
      'Digital & Print Campaign Assets',
      'Information Hierarchy',
      'Brand Communication System'
    ]
  },
  {
    id: 'beam',
    num: '05',
    title: 'Beam — Skincare Brand Identity, Packaging & 3D',
    shortTitle: 'Beam Skincare',
    clientPlaceholder: 'Beam (CRAFX Studio)',
    industry: 'Skincare & DTC',
    category: 'CRAFX Studio · Brand, Packaging & 3D',
    year: '2024',
    isDigital: false,
    hex: '#a855f7',
    accentHex: '#d8b4fe',
    coverImage: './assets/projects/beam-cover.webp',
    secondaryImages: [],
    projectUrl: 'https://www.behance.net/gallery/250873741/Beam-Skincare-Brand-Identity-Packaging-Design-3D',
    behanceUrl: 'https://www.behance.net/gallery/250873741/Beam-Skincare-Brand-Identity-Packaging-Design-3D',
    summary:
      'Selected work from the broader CRAFX Studio ecosystem: complete brand identity, packaging design, and 3D product visualisation for Beam Skincare.',
    challenge:
      'Crafting a modern skincare identity with tactile 3D presentation and cohesive visual guidelines across digital and retail touchpoints.',
    solution:
      'Delivered the brand identity system, packaging architecture, and studio 3D product renders.',
    deliverables: ['Brand Identity', '3D Visualisation', 'Packaging Design']
  },
  {
    id: 'luxurati',
    num: '06',
    title: 'Luxurati — Luxury Automotive Brand Identity',
    shortTitle: 'Luxurati',
    clientPlaceholder: 'Luxurati (CRAFX Studio)',
    industry: 'Luxury Automotive',
    category: 'CRAFX Studio · Brand Identity',
    year: '2025',
    isDigital: false,
    hex: '#f59e0b',
    accentHex: '#fcd34d',
    coverImage: './assets/projects/luxurati-cover.webp',
    secondaryImages: [],
    projectUrl: 'https://www.behance.net/gallery/252933151/Luxurati-Luxury-Automotive-Brand-Identity',
    behanceUrl: 'https://www.behance.net/gallery/252933151/Luxurati-Luxury-Automotive-Brand-Identity',
    summary:
      'Selected work from the broader CRAFX Studio ecosystem: luxury automotive brand identity, custom emblem, and visual direction for Luxurati.',
    challenge:
      'Establishing an unmistakable luxury automotive presence with disciplined typography and dark-surface visual restraint.',
    solution:
      'Created the complete identity system, monogram, and brand presentation guidelines.',
    deliverables: ['Brand Identity', 'Logo & Monogram System', 'Visual Direction']
  }
];

const CLIENT_REVIEWS_PLACEHOLDERS = [
  {
    quote:
      '“We start with your problem, not our process. The first session is about what the business needs to happen—sell more units, look credible to a buyer, or stop losing people on the pricing page. The design and build follow that.”',
    clientMark: 'CRAFX STUDIO PRINCIPLE 01 // BUSINESS-FIRST',
    name: 'Problem-First Architecture',
    role: 'CRAFX DEV · Mumbai, India',
    initials: '01'
  },
  {
    quote:
      '“You see work in progress, not a reveal. Nobody enjoys a big unveiling of the wrong thing. You see directions early, while changing them is still fast, and you always know what is being built.”',
    clientMark: 'CRAFX STUDIO PRINCIPLE 02 // TRANSPARENT WORKFLOW',
    name: 'Iterative Design & Build',
    role: 'Direct Collaboration with Our Team',
    initials: '02'
  },
  {
    quote:
      '“What you get at the end is usable. Working files, production-ready code, and guidelines written for the people who will use them day to day—nothing that leaves you dependent on us to change a line on a page.”',
    clientMark: 'CRAFX STUDIO PRINCIPLE 03 // FULL HANDOVER',
    name: 'Built for Long-Term Ownership',
    role: 'Clean Handover & Documentation',
    initials: '03'
  }
];
