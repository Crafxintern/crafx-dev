/**
 * CRAFX DEV — Interactive Canvas Visual Renderers
 * Renders 60fps motion visuals for the Showreel (Section 5), Service Tabs (Section 6),
 * and 3D Arc Project Cards (Section 7), with clear [PLACEHOLDER] hooks for custom media.
 */
function initVisualRenderers() {
  initShowreelCanvas();
  initServiceTabCanvases();
  initProjectCardCanvases();
  initHorizonCanvas();
}

/* 1. Section 5: Video of Our Work Interactive Showreel */
function initShowreelCanvas() {
  const canvas = document.getElementById('showreel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const playBtn = document.getElementById('reel-play-btn');
  const playLabel = document.getElementById('reel-play-label');
  const chapterBtn = document.getElementById('reel-chapter-btn');
  const timeEl = document.getElementById('reel-timecode');

  let isPlaying = true;
  let elapsed = 0;
  let lastTime = performance.now();
  let manualChapterOffset = 0;

  const chapters = [
    {
      code: 'CHAPTER 01 / 04',
      title: 'UI/UX ARCHITECTURE & INTERACTIVE DESIGN',
      sub: 'Wireframes, responsive grids, design systems & brand-first interfaces',
      accent: '#4556d9',
      secondary: '#6d86fe'
    },
    {
      code: 'CHAPTER 02 / 04',
      title: 'FULL-STACK & FRONTEND ENGINEERING',
      sub: 'Clean semantic code in React, Next.js, Astro, Webflow & custom stacks',
      accent: '#ff3232',
      secondary: '#e8b94f'
    },
    {
      code: 'CHAPTER 03 / 04',
      title: 'IMMERSIVE 3D WEBGL & GSAP MOTION',
      sub: '60fps scroll choreography, spatial galleries & tactile micro-interactions',
      accent: '#37be95',
      secondary: '#89efca'
    },
    {
      code: 'CHAPTER 04 / 04',
      title: 'MOBILE-FIRST SPEED, SEO & CMS HANDOVER',
      sub: 'Tested on real devices with Core Web Vitals optimization & easy team editing',
      accent: '#ff7a18',
      secondary: '#f9cc21'
    }
  ];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(640, Math.floor(rect.width * dpr));
    canvas.height = Math.max(360, Math.floor(rect.height * dpr));
  }
  resize();
  window.addEventListener('resize', resize);

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (playLabel) playLabel.textContent = isPlaying ? 'Pause reel' : 'Play reel';
      playBtn.setAttribute('aria-pressed', String(!isPlaying));
    });
  }

  if (chapterBtn) {
    chapterBtn.addEventListener('click', () => {
      manualChapterOffset = (manualChapterOffset + 1) % chapters.length;
    });
  }

  function render(now) {
    requestAnimationFrame(render);
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    if (isPlaying) elapsed += dt;

    const w = canvas.width;
    const h = canvas.height;
    const chIdx = (Math.floor(elapsed / 6) + manualChapterOffset) % chapters.length;
    const ch = chapters[chIdx];
    const chProgress = (elapsed % 6) / 6;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#0d0f17');
    bg.addColorStop(0.55, '#151722');
    bg.addColorStop(1, '#0b0c10');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Animated perspective architectural grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.055)';
    ctx.lineWidth = 1;
    const step = Math.floor(w / 18);
    const shift = (elapsed * 36) % step;
    for (let x = -step; x < w + step; x += step) {
      ctx.beginPath();
      ctx.moveTo(x + shift, 0);
      ctx.lineTo(x + shift, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Dynamic ambient glow
    const gx = w * 0.5 + Math.cos(elapsed * 0.9) * (w * 0.18);
    const gy = h * 0.48 + Math.sin(elapsed * 1.1) * (h * 0.12);
    const glow = ctx.createRadialGradient(gx, gy, 10, gx, gy, w * 0.42);
    glow.addColorStop(0, ch.accent + '66');
    glow.addColorStop(0.5, ch.secondary + '22');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Interactive Browser / Device Frame Showcase in center
    const frameW = w * 0.64;
    const frameH = h * 0.56;
    const fx = (w - frameW) / 2;
    const fy = h * 0.17;

    ctx.save();
    ctx.fillStyle = 'rgba(18, 19, 26, 0.88)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, fx, fy, frameW, frameH, 14);
    ctx.fill();
    ctx.stroke();

    // Top browser bar dots
    const dotColors = ['#ff5f56', '#ffbd2e', '#27c93f'];
    dotColors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(fx + 22 + i * 16, fy + 18, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // URL pill inside browser mockup
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    roundRect(ctx, fx + frameW * 0.25, fy + 9, frameW * 0.5, 18, 9);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = `${Math.max(10, Math.floor(w * 0.009))}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('https://crafx.dev // [SHOWREEL VIDEO PLACEHOLDER]', fx + frameW * 0.5, fy + 22);

    // Animated UI layout cards inside browser frame
    const innerY = fy + 40;
    const innerH = frameH - 52;
    const cardCount = 3;
    const gap = frameW * 0.03;
    const cardW = (frameW - gap * 4) / cardCount;

    for (let i = 0; i < cardCount; i++) {
      const cx = fx + gap + i * (cardW + gap);
      const wave = Math.sin(elapsed * 2.2 + i * 1.1) * 8;
      const cy = innerY + 18 + wave;
      const chCard = innerH * 0.46;

      ctx.fillStyle = i === chIdx % 3 ? ch.accent + '38' : 'rgba(255,255,255,0.04)';
      ctx.strokeStyle = i === chIdx % 3 ? ch.accent : 'rgba(255,255,255,0.1)';
      roundRect(ctx, cx, cy, cardW, chCard, 8);
      ctx.fill();
      ctx.stroke();

      // Mockup lines inside card
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillRect(cx + 14, cy + chCard - 34, cardW * 0.65, 6);
      ctx.fillStyle = 'rgba(255,255,255,0.32)';
      ctx.fillRect(cx + 14, cy + chCard - 20, cardW * 0.45, 4);
    }

    // Chapter typography overlay inside frame bottom
    ctx.textAlign = 'left';
    ctx.fillStyle = ch.secondary;
    ctx.font = `600 ${Math.max(11, Math.floor(w * 0.011))}px monospace`;
    ctx.fillText(ch.code, fx + gap, fy + frameH - 64);

    ctx.fillStyle = '#ffffff';
    ctx.font = `500 ${Math.max(16, Math.floor(w * 0.022))}px "Inter Tight", sans-serif`;
    ctx.fillText(ch.title, fx + gap, fy + frameH - 36);

    ctx.fillStyle = 'rgba(230, 230, 230, 0.68)';
    ctx.font = `400 ${Math.max(12, Math.floor(w * 0.0125))}px "Inter Tight", sans-serif`;
    ctx.fillText(ch.sub, fx + gap, fy + frameH - 14);

    // Chapter progress bar along bottom of browser frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(fx, fy + frameH - 3, frameW, 3);
    ctx.fillStyle = ch.accent;
    ctx.fillRect(fx, fy + frameH - 3, frameW * chProgress, 3);
    ctx.restore();

    if (timeEl) {
      const secs = Math.floor(elapsed % 24);
      timeEl.textContent = `00:${String(secs).padStart(2, '0')} / 00:24 · ${ch.code}`;
    }
  }

  requestAnimationFrame(render);
}

/* 2. Section 6: Services Visual Tabs Canvases */
function initServiceTabCanvases() {
  const canvases = document.querySelectorAll('[data-service-canvas]');
  canvases.forEach((canvas, idx) => {
    const ctx = canvas.getContext('2d');
    const tab = SERVICE_TABS[idx] || SERVICE_TABS[0];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(480, Math.floor((rect.width || 640) * dpr));
      canvas.height = Math.max(360, Math.floor((rect.height || 480) * dpr));
    }
    resize();
    window.addEventListener('resize', resize);

    let start = performance.now();
    function draw(now) {
      requestAnimationFrame(draw);
      const t = (now - start) / 1000;
      const w = canvas.width;
      const h = canvas.height;

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#12131c');
      grad.addColorStop(1, '#0b0c12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Radial accent glow
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.45, w * 0.55);
      glow.addColorStop(0, tab.themeColor + '55');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      const step = Math.floor(w / 12);
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Visual illustration by tab index
      const pad = w * 0.08;
      const boxW = w - pad * 2;
      const boxH = h - pad * 2;

      ctx.fillStyle = 'rgba(20, 22, 30, 0.86)';
      ctx.strokeStyle = tab.themeColor;
      ctx.lineWidth = 1.5;
      roundRect(ctx, pad, pad, boxW, boxH, 12);
      ctx.fill();
      ctx.stroke();

      // Header badge inside visual
      ctx.fillStyle = tab.accentColor;
      ctx.font = `600 ${Math.max(11, Math.floor(w * 0.018))}px monospace`;
      ctx.fillText(`CAPABILITY ${tab.nr} // ${tab.badge.toUpperCase()}`, pad + 24, pad + 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = `500 ${Math.max(16, Math.floor(w * 0.032))}px "Inter Tight", sans-serif`;
      ctx.fillText(tab.title, pad + 24, pad + 72);

      // Animated metric pills
      tab.metrics.forEach((m, mIdx) => {
        const py = pad + 105 + mIdx * 48;
        const barW = boxW - 48;
        const pulse = 0.65 + 0.35 * Math.sin(t * 2 + mIdx);

        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        roundRect(ctx, pad + 24, py, barW, 34, 8);
        ctx.fill();

        ctx.fillStyle = tab.themeColor + '44';
        roundRect(ctx, pad + 24, py, barW * pulse, 34, 8);
        ctx.fill();

        ctx.fillStyle = '#e6e6e6';
        ctx.font = `500 ${Math.max(11, Math.floor(w * 0.019))}px monospace`;
        ctx.fillText(`0${mIdx + 1}  ${m}`, pad + 38, py + 22);
      });
    }
    requestAnimationFrame(draw);
  });
}

/* 3. Section 7: 3D Curved Arc Project Card Canvases */
function initProjectCardCanvases() {
  const canvases = document.querySelectorAll('[data-project-canvas]');
  canvases.forEach((canvas) => {
    const idx = Number(canvas.dataset.projectCanvas || 0);
    const project = PROJECTS_DATA[idx] || PROJECTS_DATA[0];
    const ctx = canvas.getContext('2d');

    canvas.width = 420;
    canvas.height = 420;

    let start = performance.now();
    function draw(now) {
      requestAnimationFrame(draw);
      const t = (now - start) / 1000 + idx * 1.7;
      const w = canvas.width;
      const h = canvas.height;

      // Rich brand-tinted dark backdrop
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#12131a');
      bg.addColorStop(0.6, '#171824');
      bg.addColorStop(1, '#0b0c10');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Moving spotlight orb
      const ox = w * 0.5 + Math.cos(t * 0.9) * 70;
      const oy = h * 0.45 + Math.sin(t * 1.1) * 55;
      const rad = ctx.createRadialGradient(ox, oy, 8, ox, oy, 190);
      rad.addColorStop(0, project.hex + '88');
      rad.addColorStop(0.55, project.accentHex + '28');
      rad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, w, h);

      // Isometric / layered interface cards inside the square preview
      for (let layer = 2; layer >= 0; layer--) {
        const offset = layer * 16;
        const floatY = Math.sin(t * 1.6 + layer) * 5;
        const lx = 42 + offset * 0.6;
        const ly = 78 + offset + floatY;
        const lw = w - 84 - offset * 1.2;
        const lh = h - 148;

        ctx.fillStyle = layer === 0 ? 'rgba(18, 19, 26, 0.92)' : 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = layer === 0 ? project.hex : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = layer === 0 ? 1.5 : 1;
        roundRect(ctx, lx, ly, lw, lh, 12);
        ctx.fill();
        ctx.stroke();

        if (layer === 0) {
          // Header bar inside mockup
          ctx.fillStyle = project.hex + '33';
          roundRect(ctx, lx + 16, ly + 16, lw - 32, 76, 8);
          ctx.fill();

          ctx.fillStyle = project.accentHex;
          ctx.font = '600 11px monospace';
          ctx.fillText(`PROJECT ${project.num} // ${project.industry.toUpperCase()}`, lx + 28, ly + 42);

          ctx.fillStyle = '#ffffff';
          ctx.font = '600 18px "Inter Tight", sans-serif';
          ctx.fillText(project.clientPlaceholder, lx + 28, ly + 70);

          // Deliverable pills inside card
          project.deliverables.slice(0, 3).forEach((deliv, dIdx) => {
            const dy = ly + 108 + dIdx * 34;
            ctx.fillStyle = 'rgba(255,255,255,0.06)';
            roundRect(ctx, lx + 16, dy, lw - 32, 26, 6);
            ctx.fill();

            ctx.fillStyle = 'rgba(255,255,255,0.78)';
            ctx.font = '11px monospace';
            ctx.fillText(`→ ${deliv}`, lx + 28, dy + 17);
          });
        }
      }
    }
    requestAnimationFrame(draw);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/* 4. Section 10: Contact Ocean Horizon & Shimmer Reflection Canvas */
function initHorizonCanvas() {
  const canvas = document.getElementById('horizon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(640, Math.floor(rect.width * dpr));
    canvas.height = Math.max(480, Math.floor(rect.height * dpr));
  }
  resize();
  window.addEventListener('resize', resize);

  let start = performance.now();
  function draw(now) {
    requestAnimationFrame(draw);
    const t = (now - start) / 1000;
    const w = canvas.width;
    const h = canvas.height;
    const horizonY = h * 0.51;

    ctx.clearRect(0, 0, w, h);

    // Horizon sun / moon atmospheric glow
    const sunGlow = ctx.createRadialGradient(w * 0.5, horizonY, 4, w * 0.5, horizonY, w * 0.36);
    sunGlow.addColorStop(0, 'rgba(255, 198, 145, 0.32)');
    sunGlow.addColorStop(0.35, 'rgba(255, 122, 24, 0.12)');
    sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, w, h);

    // Crisp horizon seam line
    ctx.strokeStyle = 'rgba(205, 220, 245, 0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.stroke();

    // Animated water shimmer reflection lines below horizon
    const rows = 36;
    for (let i = 0; i < rows; i++) {
      const p = i / rows;
      const y = horizonY + 4 + Math.pow(p, 1.55) * (h - horizonY - 12);
      const spread = (0.06 + p * 0.38) * w;
      const sway = Math.sin(t * 1.4 + i * 0.55) * (12 + p * 28);
      const alpha = (1 - p * 0.75) * 0.22;

      ctx.strokeStyle = `rgba(215, 228, 250, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1 + p * 1.4;
      ctx.beginPath();
      ctx.moveTo(w * 0.5 - spread * 0.5 + sway, y);
      ctx.lineTo(w * 0.5 + spread * 0.5 + sway, y);
      ctx.stroke();
    }

    // Subtle distant birds silhouette above horizon (matching bunqlabs.com --sea-birds)
    const birdCount = 4;
    ctx.strokeStyle = 'rgba(220, 228, 240, 0.38)';
    ctx.lineWidth = 1.4;
    for (let b = 0; b < birdCount; b++) {
      const bx = ((w * 0.22 + b * 68 + t * (14 + b * 2)) % (w * 0.76)) + w * 0.12;
      const by = horizonY - h * 0.12 - b * 14 + Math.sin(t * 2.1 + b) * 5;
      const flap = Math.sin(t * 5.5 + b * 1.3) * 4;
      ctx.beginPath();
      ctx.moveTo(bx - 7, by + flap);
      ctx.quadraticCurveTo(bx - 3, by - 3, bx, by);
      ctx.quadraticCurveTo(bx + 3, by - 3, bx + 7, by + flap);
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}
