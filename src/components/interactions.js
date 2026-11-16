/**
 * CRAFX DEV — Complete Homepage Interactions & Animation Choreography
 * Recreates bunqlabs.com's preloader, expanding pill navbar, ScrambleText notes,
 * 3D flipping client logo prisms, pen-marks SVG draw, visual service tabs,
 * 3D curved project card carousel, process horizontal accordion, reviews slider,
 * FAQ accordion, and 3-step enquiry form.
 */
function initAllInteractions() {
  initPreloader();
  initNavbarAndTheme();
  initSoundToggle();
  initLiveClock();
  initClientLogoPrisms();
  initEditorialPenReveal();
  initServiceTabsAndPlans();
  initWorkArcCarousel();
  initReviewsCarousel();
  initProcessAccordion();
  initFaqAccordions();
  initEnquiryForms();
  initNewsletterForm();
}

/* ==========================================================================
   1. Preloader (#loader) & ScrambleText Hero Notes
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById('loader');
  const countEl = document.getElementById('loader-count');
  if (!loader || !countEl) {
    document.documentElement.dataset.gate = 'open';
    triggerHeroScramble();
    return;
  }

  let start = performance.now();
  const duration = 1150;

  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    countEl.textContent = String(Math.floor(eased * 100));

    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      countEl.textContent = '100';
      loader.classList.add('is-done');
      setTimeout(() => {
        document.documentElement.dataset.gate = 'open';
        triggerHeroScramble();
      }, 320);
    }
  }
  requestAnimationFrame(tick);

  // Fail-safe preloader unlock so #loader never stays stuck even if rAF is throttled
  setTimeout(() => {
    countEl.textContent = '100';
    loader.classList.add('is-done');
    document.documentElement.dataset.gate = 'open';
    triggerHeroScramble();
  }, 850);
}

function scrambleText(el, finalStr, durationMs = 700) {
  if (!el) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//[]';
  const start = performance.now();

  function frame(now) {
    const p = Math.min(1, (now - start) / durationMs);
    const revealCount = Math.floor(p * finalStr.length);
    let out = '';
    for (let i = 0; i < finalStr.length; i++) {
      if (finalStr[i] === ' ') {
        out += ' ';
      } else if (i < revealCount) {
        out += finalStr[i];
      } else {
        out += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = finalStr;
  }
  requestAnimationFrame(frame);
}

let scrambleLoopStarted = false;
function triggerHeroScramble() {
  const notes = Array.from(document.querySelectorAll('[data-scramble]'));
  notes.forEach((el, i) => {
    const target = el.dataset.scramble || el.textContent;
    setTimeout(() => scrambleText(el, target, 650), i * 75);
  });

  if (scrambleLoopStarted || !notes.length) return;
  scrambleLoopStarted = true;

  const altPhrases = [
    'CRAFX DEV',
    'PART OF CRAFX STUDIO',
    'MUMBAI, INDIA · WORLDWIDE',
    'WEBSITE DESIGN & BUILD',
    'UI/UX & PRODUCT DESIGN',
    'SAAS & DIGITAL PRODUCTS',
    'LANDING PAGE DESIGN',
    'WEBSITE REDESIGN',
    'CREATIVE DEV & MOTION',
    'DESIGNED WITH INTENT',
    'BUILT TO WORK',
    'DIGITAL STUDIO'
  ];

  let idx = 0;
  setInterval(() => {
    const el = notes[idx % notes.length];
    const phrase = altPhrases[idx % altPhrases.length];
    idx++;
    if (el) scrambleText(el, phrase, 680);
  }, 3400);
}

/* ==========================================================================
   2. Floating Pill Navbar (.site-nav), Smooth Scroll & Theme Switcher
   ========================================================================== */
function initNavbarAndTheme() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const menuBtn = nav.querySelector('.nav-toggle');
  const talkBtn = nav.querySelector('.nav-talk');
  const scrim = nav.querySelector('.site-nav__scrim');
  const panel = document.getElementById('site-menu');
  const clip = nav.querySelector('.site-nav__clip');
  const views = nav.querySelector('.site-nav__views');

  function setView(viewName) {
    const isClosed = viewName === 'closed';
    nav.dataset.view = viewName;
    if (viewName === 'contact') {
      nav.dataset.shows = 'contact';
    } else if (viewName === 'menu') {
      delete nav.dataset.shows;
    }

    document.documentElement.classList.toggle('nav-open', !isClosed);
    if (panel) panel.toggleAttribute('inert', isClosed);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(viewName === 'menu'));
    if (talkBtn) talkBtn.setAttribute('aria-expanded', String(viewName === 'contact'));

    requestAnimationFrame(() => {
      if (!clip || !views) return;
      if (isClosed) {
        clip.style.height = '0px';
      } else {
        const activePane =
          viewName === 'contact'
            ? nav.querySelector('[data-pane="contact"]')
            : nav.querySelector('[data-pane="menu"]');
        if (activePane) {
          clip.style.height = `${activePane.scrollHeight}px`;
        }
      }
    });
  }

  window.openCrafxContactDrawer = function (preselectedService) {
    if (preselectedService) {
      const checkboxes = nav.querySelectorAll('input[name="services"]');
      checkboxes.forEach((cb) => {
        cb.checked = cb.value.toLowerCase() === preselectedService.toLowerCase();
      });
    }
    setView('contact');
  };

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const current = nav.dataset.view || 'closed';
      setView(current === 'closed' ? 'menu' : 'closed');
    });
  }

  if (talkBtn) {
    talkBtn.addEventListener('click', () => {
      const current = nav.dataset.view || 'closed';
      setView(current === 'contact' ? 'closed' : 'contact');
    });
  }

  if (scrim) {
    scrim.addEventListener('click', () => setView('closed'));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.dataset.view !== 'closed') {
      setView('closed');
    }
  });

  // Open contact drawer buttons across the page
  document.querySelectorAll('[data-cta-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.dataset.servicePreselect || '';
      window.openCrafxContactDrawer(service);
    });
  });

  // Hover service category preview inside expanded Menu (.nav-cta)
  const navCta = nav.querySelector('[data-nav-cta]');
  const serviceTriggers = nav.querySelectorAll('[data-service]');
  const serviceLists = nav.querySelectorAll('[data-service-list]');

  serviceTriggers.forEach((trigger) => {
    const idx = trigger.dataset.service;
    const activate = () => {
      if (!navCta) return;
      navCta.dataset.preview = idx;
      serviceTriggers.forEach((t) => t.classList.toggle('is-on', t === trigger));
      serviceLists.forEach((l) => l.classList.toggle('is-on', l.dataset.serviceList === idx));
    };
    trigger.addEventListener('pointerenter', activate);
    trigger.addEventListener('focus', activate);
  });

  const navCols = nav.querySelector('.nav-cols');
  if (navCols && navCta) {
    navCols.addEventListener('pointerleave', () => {
      delete navCta.dataset.preview;
      serviceTriggers.forEach((t) => t.classList.remove('is-on'));
      serviceLists.forEach((l) => l.classList.remove('is-on'));
    });
  }

  // Smooth scroll on all internal anchor links & close menu drawer if open
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        setView('closed');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll state for navbar & active inline section highlight
  const sections = ['#hero', '#work', '#services', '#about', '#approach', '#contact']
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);
  const inlineLinks = document.querySelectorAll('.nav-inline-link');

  window.addEventListener(
    'scroll',
    () => {
      const sy = window.scrollY || window.pageYOffset;
      nav.toggleAttribute('data-scrolled', sy > 48);

      let currentSectionId = '#hero';
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.38) {
          currentSectionId = `#${sec.id}`;
        }
      });

      inlineLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === currentSectionId);
      });
    },
    { passive: true }
  );

  // Theme Switcher (System / Light / Dark)
  const themeBtns = document.querySelectorAll('[data-theme-toggle]');
  const modes = ['dark', 'light', 'system'];

  function applyTheme(mode) {
    const root = document.documentElement;
    const resolved =
      mode === 'system'
        ? window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark'
        : mode;
    root.dataset.theme = resolved;
    root.dataset.themeMode = mode;
    try {
      localStorage.setItem('crafx-theme', mode);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('crafx-theme-change', { detail: { theme: resolved } }));
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.dataset.themeMode || 'dark';
      const next = modes[(modes.indexOf(current) + 1) % modes.length];
      applyTheme(next);
    });
  });
}

/* ==========================================================================
   3. Web Audio API Ambient Sound Wave Toggle
   ========================================================================== */
function initSoundToggle() {
  const btns = document.querySelectorAll('[data-audio-toggle]');
  let audioCtx = null;
  let gainNode = null;
  let isPlaying = false;

  function toggleSound() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.value = 110; // Warm A2 drone
      osc2.type = 'triangle';
      osc2.frequency.value = 164.81; // E3 fifth

      filter.type = 'lowpass';
      filter.frequency.value = 320;

      gainNode.gain.value = 0.0001;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;
    const now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setTargetAtTime(isPlaying ? 0.025 : 0.0001, now, 0.35);

    btns.forEach((b) => b.setAttribute('aria-pressed', String(isPlaying)));
  }

  btns.forEach((btn) => btn.addEventListener('click', toggleSound));
}

/* ==========================================================================
   4. Live Agency Clock (IST)
   ========================================================================== */
function initLiveClock() {
  const clockEls = document.querySelectorAll('[data-clock]');
  if (!clockEls.length) return;

  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  function update() {
    const str = `${fmt.format(new Date())} IST`;
    clockEls.forEach((el) => {
      el.textContent = str;
    });
  }
  update();
  setInterval(update, 15000);
}

/* ==========================================================================
   5. Client Logos 3D Rotating Prisms (.intro__wall)
   ========================================================================== */
function initClientLogoPrisms() {
  const rolls = document.querySelectorAll('.logo-roll');
  if (!rolls.length) return;

  let cursor = 0;
  setInterval(() => {
    const target = rolls[cursor % rolls.length];
    cursor++;
    if (!target) return;
    target.classList.toggle('is-turning');
  }, 2200);
}

/* ==========================================================================
   6. About Us Editorial Statement Word & Pen-Marks Reveal
   ========================================================================== */
function initEditorialPenReveal() {
  const penLines = document.querySelectorAll('.pen-line');
  if (!penLines.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.remove('is-waiting');
          setTimeout(() => {
            el.classList.remove('is-unmarked');
          }, 550);
        }
      });
    },
    { threshold: 0.25 }
  );

  penLines.forEach((el) => io.observe(el));
}

/* ==========================================================================
   7. Services Interactive Visual Tabs (01–04)
   ========================================================================== */
function initServiceTabsAndPlans() {
  const wrapper = document.querySelector('[data-tabs="wrapper"]');
  if (!wrapper) return;

  const tabItems = wrapper.querySelectorAll('[data-tabs="content-item"]');
  const visualItems = wrapper.querySelectorAll('[data-tabs="visual-item"]');
  const dotBtns = wrapper.querySelectorAll('[data-dot]');
  const fills = wrapper.querySelectorAll('.dots__fill');

  let activeIdx = 0;
  let startTime = performance.now();
  const duration = 5500;
  let isPaused = false;

  function activateTab(idx) {
    activeIdx = (idx + tabItems.length) % tabItems.length;
    startTime = performance.now();

    tabItems.forEach((item, i) => {
      item.setAttribute('aria-selected', String(i === activeIdx));
    });
    visualItems.forEach((vis, i) => {
      vis.classList.toggle('active', i === activeIdx);
    });
    dotBtns.forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === activeIdx));
    });
    fills.forEach((f) => {
      f.style.transform = 'scaleX(0)';
    });
  }

  tabItems.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(i);
    });
  });

  dotBtns.forEach((dot, i) => {
    dot.addEventListener('click', () => activateTab(i));
  });

  wrapper.addEventListener('pointerenter', () => {
    isPaused = true;
  });
  wrapper.addEventListener('pointerleave', () => {
    isPaused = false;
    startTime = performance.now();
  });

  function tick(now) {
    requestAnimationFrame(tick);
    if (isPaused) return;
    const p = Math.min(1, (now - startTime) / duration);
    const activeFill = fills[activeIdx];
    if (activeFill) {
      activeFill.style.transform = `scaleX(${p})`;
    }
    if (p >= 1) {
      activateTab(activeIdx + 1);
    }
  }
  requestAnimationFrame(tick);
}

/* ==========================================================================
   8. Section 7: Projects 3D Curved Arc Carousel & Case Study Modal
   ========================================================================== */
function initWorkArcCarousel() {
  const workSection = document.getElementById('projects');
  const stage = document.getElementById('work-stage');
  const cards = Array.from(document.querySelectorAll('.work-card'));
  const cursorEl = document.getElementById('work-cursor');
  const cursorText = document.getElementById('work-cursor-text');
  const indexEl = document.getElementById('work-active-num');
  const openBtn = document.getElementById('work-open-btn');
  const prevBtn = document.getElementById('work-prev-btn');
  const nextBtn = document.getElementById('work-next-btn');

  if (!stage || !cards.length) return;

  let activeIndex = 0;
  const total = cards.length;

  function layoutArc() {
    const isMobile = window.innerWidth <= 767;
    const xStep = isMobile ? 250 : 340;
    const zDrop = isMobile ? 95 : 140;
    const yDrop = isMobile ? 16 : 26;
    const rotYStep = isMobile ? -14 : -20;
    const rotZStep = isMobile ? 3.5 : 5;

    cards.forEach((card, i) => {
      let diff = i - activeIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const absDiff = Math.abs(diff);
      const tx = diff * xStep;
      const ty = absDiff * absDiff * yDrop;
      const tz = -absDiff * zDrop;
      const ry = diff * rotYStep;
      const rz = diff * rotZStep;

      card.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg)`;
      card.style.zIndex = String(10 - absDiff);
      card.style.opacity = absDiff > 2 ? '0' : absDiff === 0 ? '1' : '0.78';
      card.style.pointerEvents = absDiff > 2 ? 'none' : 'auto';
      card.classList.toggle('is-active', diff === 0);
    });

    const activeProject = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0];
    if (workSection) {
      workSection.style.setProperty('--active-work-glow', `${activeProject.hex}48`);
    }
    if (indexEl) {
      indexEl.textContent = activeProject.num;
    }
  }

  function goTo(idx) {
    activeIndex = ((idx % total) + total) % total;
    layoutArc();
  }

  layoutArc();
  window.addEventListener('resize', layoutArc);

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

  // Card click: if centered, open modal; otherwise center that card
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (i === activeIndex) {
        openProjectModal(activeIndex);
      } else {
        goTo(i);
      }
    });
  });

  if (openBtn) {
    openBtn.addEventListener('click', () => openProjectModal(activeIndex));
  }

  // Pointer drag + wheel + keyboard navigation on work-stage
  let dragStartX = null;
  stage.addEventListener('pointerdown', (e) => {
    dragStartX = e.clientX;
  });

  window.addEventListener('pointerup', (e) => {
    if (dragStartX === null) return;
    const dx = e.clientX - dragStartX;
    dragStartX = null;
    if (Math.abs(dx) > 40) {
      goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
  });

  let wheelCooldown = false;
  stage.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 18 && !wheelCooldown) {
        wheelCooldown = true;
        goTo(activeIndex + (e.deltaX > 0 ? 1 : -1));
        setTimeout(() => {
          wheelCooldown = false;
        }, 420);
      }
    },
    { passive: true }
  );

  document.addEventListener('keydown', (e) => {
    if (!workSection) return;
    const rect = workSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
    if (!inView) return;
    if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    if (e.key === 'ArrowRight') goTo(activeIndex + 1);
  });

  // Custom Drag / Open cursor bubble
  if (cursorEl && cursorText) {
    stage.addEventListener('pointerenter', () => {
      cursorEl.classList.add('is-visible');
    });
    stage.addEventListener('pointerleave', () => {
      cursorEl.classList.remove('is-visible');
    });
    stage.addEventListener('pointermove', (e) => {
      cursorEl.style.transform = `translate3d(${e.clientX + 14}px, ${e.clientY + 14}px, 0)`;
      const hoveredCard = e.target.closest('.work-card');
      if (hoveredCard && hoveredCard.classList.contains('is-active')) {
        cursorText.textContent = 'Open';
      } else {
        cursorText.textContent = 'Drag';
      }
    });
  }

  // Case Study Preview Modal (#project)
  const modal = document.getElementById('project');
  const closeBtn = document.getElementById('project-close-btn');
  const modalPrevBtn = document.getElementById('project-prev-btn');
  const modalNextBtn = document.getElementById('project-next-btn');

  function openProjectModal(idx) {
    const p = PROJECTS_DATA[idx] || PROJECTS_DATA[0];
    if (!modal) return;

    document.getElementById('pm-industry').textContent = `${p.num} // ${p.industry}`;
    document.getElementById('pm-title').textContent = p.title;
    document.getElementById('pm-client').textContent = p.clientPlaceholder;
    document.getElementById('pm-year').textContent = p.year;
    document.getElementById('pm-summary').textContent = p.summary;
    document.getElementById('pm-challenge').textContent = p.challenge;
    document.getElementById('pm-solution').textContent = p.solution;

    const pmImg = document.getElementById('pm-image');
    if (pmImg && p.coverImage) {
      pmImg.src = p.coverImage;
      pmImg.alt = p.title;
    }

    const pmLink = document.getElementById('pm-external-link');
    if (pmLink && p.projectUrl) {
      pmLink.href = p.projectUrl;
    }

    const tagsWrap = document.getElementById('pm-deliverables');
    if (tagsWrap) {
      tagsWrap.innerHTML = p.deliverables
        .map((d) => `<span class="sp-cover__tag">${d}</span>`)
        .join('');
    }

    modal.classList.add('open');
  }

  document.querySelectorAll('[data-project-inspect]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = Number(btn.dataset.projectInspect || 0);
      goTo(idx);
      openProjectModal(idx);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      goTo(activeIndex - 1);
      openProjectModal(activeIndex);
    });
  }
  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      goTo(activeIndex + 1);
      openProjectModal(activeIndex);
    });
  }
}

/* ==========================================================================
   9. Section 8: Client Reviews Carousel (#reviews) & 4-Step Process Accordion
   ========================================================================== */
function initReviewsCarousel() {
  const quoteEl = document.getElementById('review-quote');
  const markEl = document.getElementById('review-mark');
  const nameEl = document.getElementById('review-name');
  const roleEl = document.getElementById('review-role');
  const faceEl = document.getElementById('review-initials');
  const dots = document.querySelectorAll('[data-review-dot]');

  if (!quoteEl || !dots.length) return;

  let activeIdx = 0;

  function showReview(idx) {
    activeIdx = ((idx % CLIENT_REVIEWS_PLACEHOLDERS.length) + CLIENT_REVIEWS_PLACEHOLDERS.length) % CLIENT_REVIEWS_PLACEHOLDERS.length;
    const item = CLIENT_REVIEWS_PLACEHOLDERS[activeIdx];
    quoteEl.textContent = item.quote;
    if (markEl) markEl.textContent = item.clientMark;
    if (nameEl) nameEl.textContent = item.name;
    if (roleEl) roleEl.textContent = item.role;
    if (faceEl) faceEl.textContent = item.initials;

    dots.forEach((d, i) => {
      d.setAttribute('aria-current', String(i === activeIdx));
      const fill = d.querySelector('.dots__fill');
      if (fill) fill.style.transform = i === activeIdx ? 'scaleX(1)' : 'scaleX(0)';
    });
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => showReview(i));
  });

  showReview(0);
  setInterval(() => showReview(activeIdx + 1), 6500);
}

function initProcessAccordion() {
  const cards = document.querySelectorAll('[data-process-card]');
  const dots = document.querySelectorAll('[data-process-dot]');
  if (!cards.length) return;

  function activateStep(idx) {
    cards.forEach((c, i) => c.classList.toggle('is-open', i === idx));
    dots.forEach((d, i) => {
      d.setAttribute('aria-current', String(i === idx));
      const fill = d.querySelector('.dots__fill');
      if (fill) fill.style.transform = i === idx ? 'scaleX(1)' : 'scaleX(0)';
    });
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => activateStep(i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateStep(i);
      }
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => activateStep(i));
  });
}

/* ==========================================================================
   10. Section 9: FAQ Split Accordion (#faq)
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('[data-faq-item]');
  faqItems.forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = details.classList.contains('is-open') || details.hasAttribute('open');
      if (isOpen) {
        details.classList.remove('is-open');
        setTimeout(() => details.removeAttribute('open'), 450);
      } else {
        details.setAttribute('open', '');
        requestAnimationFrame(() => details.classList.add('is-open'));
      }
    });
  });
}

/* ==========================================================================
   11. Section 10 & Drawer: 3-Step Enquiry Form (.enquiry-form)
   ========================================================================== */
function initEnquiryForms() {
  const forms = document.querySelectorAll('.enquiry-form');
  forms.forEach((form) => {
    const sections = Array.from(form.querySelectorAll('.enquiry-sec'));

    function openStep(stepIdx) {
      sections.forEach((sec, i) => {
        sec.classList.toggle('is-open', i === stepIdx);
        if (i < stepIdx) sec.classList.add('is-done');
        const btn = sec.querySelector('.enquiry-sec__toggle');
        if (btn) btn.setAttribute('aria-expanded', String(i === stepIdx));
      });

      // Resize parent drawer clip if inside navbar
      const navClip = form.closest('.site-nav__clip');
      const navPane = form.closest('[data-pane="contact"]');
      if (navClip && navPane) {
        setTimeout(() => {
          navClip.style.height = `${navPane.scrollHeight}px`;
        }, 120);
      }
    }

    sections.forEach((sec, i) => {
      const toggleBtn = sec.querySelector('.enquiry-sec__toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => openStep(i));
      }

      const nextBtn = sec.querySelector('[data-step-next]');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          // Validate required inputs in current step
          const requiredInputs = sec.querySelectorAll('input[required]');
          let valid = true;
          requiredInputs.forEach((inp) => {
            const grp = inp.closest('.enquiry-group');
            const isOk = inp.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim()) : inp.value.trim().length >= 2;
            if (!isOk) {
              valid = false;
              if (grp) grp.classList.add('is--error');
            } else if (grp) {
              grp.classList.remove('is--error');
            }
          });
          if (valid && i + 1 < sections.length) {
            openStep(i + 1);
          }
        });
      }

      const backBtn = sec.querySelector('[data-step-back]');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          if (i - 1 >= 0) openStep(i - 1);
        });
      }

      const cancelBtn = sec.querySelector('[data-step-cancel]');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          const nav = document.querySelector('.site-nav');
          if (nav && form.closest('.site-nav')) {
            nav.dataset.view = 'closed';
            document.documentElement.classList.remove('nav-open');
          } else {
            form.reset();
            openStep(0);
          }
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.dataset.state = 'sent';
    });

    const resetBtns = form.querySelectorAll('[data-enquiry-reset]');
    resetBtns.forEach((rb) => {
      rb.addEventListener('click', () => {
        delete form.dataset.state;
        form.reset();
        sections.forEach((s) => s.classList.remove('is-done'));
        openStep(0);
      });
    });
  });
}

function initNewsletterForm() {
  const nlForm = document.getElementById('footer-nl-form');
  const statusEl = document.getElementById('footer-nl-status');
  if (!nlForm || !statusEl) return;

  nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.textContent = 'THANK YOU — SUBSCRIBED TO CRAFX DEV UPDATES.';
    nlForm.reset();
  });
}
