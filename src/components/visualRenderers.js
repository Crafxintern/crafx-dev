/**
 * CRAFX DEV — Interactive Canvas & Portfolio Visual Renderers
 * Renders 60fps motion visuals incorporating real verified CRAFX portfolio imagery
 * (Optellix, Fitness App UI/UX, Ekotek) for the Digital Reel, Service Tabs, and Closing Horizon.
 */
function initVisualRenderers() {
  initShowreelCanvas();
  initServiceTabCanvases();
  initProjectCardCanvases();
  initHorizonCanvas();
}

/* 1. Interactive Digital Work Reel (Featuring Verified CRAFX DEV Case Studies) */
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
      code: 'REEL 01 / 04 · OPTELLIX',
      title: 'OPTELLIX — 3D SAAS INTERACTIVE WEBSITE DESIGN',
      sub: 'Responsive website UI/UX, green & dark teal visual system, and conversion flows',
      accent: '#10b981',
      secondary: '#fdb912',
      imgSrc: './assets/projects/optellix-cover.webp'
    },
    {
      code: 'REEL 02 / 04 · FITNESS APP UI/UX',
      title: 'FITNESS APP — MOBILE UI/UX & BRAND CASE STUDY',
      sub: 'Mobile application interface design, workout dashboards & cohesive identity',
      accent: '#fdb912',
      secondary: '#fde047',
      imgSrc: './assets/projects/fitness-app-cover.gif'
    },
    {
      code: 'REEL 03 / 04 · RESPONSIVE SYSTEMS',
      title: 'MULTI-DEVICE WEB & PRODUCT INTERFACES',
      sub: 'Desktop and mobile experiences engineered from first click to final interaction',
      accent: '#14b8a6',
      secondary: '#fdb912',
      imgSrc: './assets/projects/optellix-upwork-03.webp'
    },
    {
      code: 'REEL 04 / 04 · EKOTEK DIGITAL',
      title: 'EKOTEK — DIGITAL CATALOG & BRAND ARCHITECTURE',
      sub: 'Structured technical product presentation and visual identity system',
      accent: '#22c55e',
      secondary: '#fdb912',
      imgSrc: './assets/projects/ekotek-cover.webp'
    }
  ];

  // Preload chapter images
  const loadedImages = chapters.map((ch) => {
    const img = new Image();
    img.src = ch.imgSrc;
    return img;
  });

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
    const chImg = loadedImages[chIdx];
    const chProgress = (elapsed % 6) / 6;

    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#080808');
    bg.addColorStop(0.55, '#111111');
    bg.addColorStop(1, '#060606');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle studio grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const step = Math.floor(w / 18);
    const shift = (elapsed * 28) % step;
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
    const gx = w * 0.5 + Math.cos(elapsed * 0.8) * (w * 0.16);
    const gy = h * 0.46 + Math.sin(elapsed * 1.0) * (h * 0.1);
    const glow = ctx.createRadialGradient(gx, gy, 10, gx, gy, w * 0.44);
    glow.addColorStop(0, ch.accent + '44');
    glow.addColorStop(0.5, ch.secondary + '18');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Browser / Studio Viewport Frame in center
    const frameW = w * 0.72;
    const frameH = h * 0.68;
    const fx = (w - frameW) / 2;
    const fy = h * 0.11;

    ctx.save();
    ctx.fillStyle = '#0e0e11';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, fx, fy, frameW, frameH, 14);
    ctx.fill();
    ctx.stroke();

    // Top browser bar dots
    const dotColors = ['#ff5f56', '#fdb912', '#10b981'];
    dotColors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(fx + 22 + i * 16, fy + 18, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // URL pill inside browser frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    roundRect(ctx, fx + frameW * 0.24, fy + 8, frameW * 0.52, 20, 10);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
    ctx.font = `${Math.max(10, Math.floor(w * 0.009))}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('crafxstudio.com // CRAFX DEV DIGITAL SHOWCASE', fx + frameW * 0.5, fy + 22);

    // Draw real project image inside the browser viewport
    const innerX = fx + 12;
    const innerY = fy + 36;
    const innerW = frameW - 24;
    const innerH = frameH - 48;

    ctx.save();
    roundRect(ctx, innerX, innerY, innerW, innerH, 8);
    ctx.clip();

    if (chImg && chImg.complete && chImg.naturalWidth > 0) {
      const zoom = 1.02 + chProgress * 0.04;
      const imgAspect = chImg.naturalWidth / chImg.naturalHeight;
      const boxAspect = innerW / innerH;
      let drawW = innerW * zoom;
      let drawH = innerH * zoom;
      if (imgAspect > boxAspect) {
        drawW = innerH * imgAspect * zoom;
      } else {
        drawH = (innerW / imgAspect) * zoom;
      }
      const dx = innerX + (innerW - drawW) * 0.5;
      const dy = innerY + (innerH - drawH) * 0.5;
      ctx.drawImage(chImg, dx, dy, drawW, drawH);
    }

    // Bottom gradient overlay for chapter title legibility
    const textGrad = ctx.createLinearGradient(0, innerY + innerH * 0.35, 0, innerY + innerH);
    textGrad.addColorStop(0, 'rgba(8, 8, 8, 0)');
    textGrad.addColorStop(0.65, 'rgba(8, 8, 8, 0.78)');
    textGrad.addColorStop(1, 'rgba(8, 8, 8, 0.95)');
    ctx.fillStyle = textGrad;
    ctx.fillRect(innerX, innerY, innerW, innerH);
    ctx.restore();

    // Chapter typography overlay
    const padX = innerX + 24;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fdb912';
    ctx.font = `600 ${Math.max(11, Math.floor(w * 0.0105))}px monospace`;
    ctx.fillText(ch.code, padX, fy + frameH - 64);

    ctx.fillStyle = '#ffffff';
    ctx.font = `500 ${Math.max(16, Math.floor(w * 0.021))}px "Inter Tight", sans-serif`;
    ctx.fillText(ch.title, padX, fy + frameH - 38);

    ctx.fillStyle = 'rgba(244, 243, 239, 0.72)';
    ctx.font = `400 ${Math.max(12, Math.floor(w * 0.012))}px "Inter Tight", sans-serif`;
    ctx.fillText(ch.sub, padX, fy + frameH - 16);

    // Progress bar along bottom of browser frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(fx + 12, fy + frameH - 4, frameW - 24, 3);
    ctx.fillStyle = '#fdb912';
    ctx.fillRect(fx + 12, fy + frameH - 4, (frameW - 24) * chProgress, 3);
    ctx.restore();

    if (timeEl) {
      const secs = Math.floor(elapsed % 24);
      timeEl.textContent = `00:${String(secs).padStart(2, '0')} / 00:24 · ${ch.code}`;
    }
  }

  requestAnimationFrame(render);
}

/* 2. Services Visual Tabs Canvases (With Real Project Previews) */
function initServiceTabCanvases() {
  const canvases = document.querySelectorAll('[data-service-canvas]');
  canvases.forEach((canvas, idx) => {
    const ctx = canvas.getContext('2d');
    const tab = SERVICE_TABS[idx] || SERVICE_TABS[0];
    const previewImg = new Image();
    if (tab.image) {
      previewImg.src = tab.image;
    }

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
      grad.addColorStop(0, '#0f1014');
      grad.addColorStop(1, '#080808');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw real project image backdrop inside the service visual frame
      const pad = w * 0.06;
      const boxW = w - pad * 2;
      const boxH = h - pad * 2;

      ctx.save();
      roundRect(ctx, pad, pad, boxW, boxH, 12);
      ctx.clip();

      if (previewImg.complete && previewImg.naturalWidth > 0) {
        const scale = 1.03 + Math.sin(t * 0.5) * 0.02;
        const dw = boxW * scale;
        const dh = boxH * scale;
        ctx.globalAlpha = 0.52;
        ctx.drawImage(previewImg, pad + (boxW - dw) * 0.5, pad + (boxH - dh) * 0.5, dw, dh);
        ctx.globalAlpha = 1;
      }

      const overlay = ctx.createLinearGradient(0, pad, 0, pad + boxH);
      overlay.addColorStop(0, 'rgba(8, 8, 8, 0.72)');
      overlay.addColorStop(0.5, 'rgba(8, 8, 8, 0.58)');
      overlay.addColorStop(1, 'rgba(8, 8, 8, 0.92)');
      ctx.fillStyle = overlay;
      ctx.fillRect(pad, pad, boxW, boxH);
      ctx.restore();

      ctx.strokeStyle = 'rgba(253, 185, 18, 0.35)';
      ctx.lineWidth = 1.25;
      roundRect(ctx, pad, pad, boxW, boxH, 12);
      ctx.stroke();

      // Header badge inside visual
      ctx.fillStyle = '#fdb912';
      ctx.font = `600 ${Math.max(11, Math.floor(w * 0.017))}px monospace`;
      ctx.fillText(`CAPABILITY ${tab.nr} // ${tab.badge.toUpperCase()}`, pad + 24, pad + 38);

      ctx.fillStyle = '#ffffff';
      ctx.font = `500 ${Math.max(16, Math.floor(w * 0.031))}px "Inter Tight", sans-serif`;
      ctx.fillText(tab.title, pad + 24, pad + 74);

      // Deliverable pills at bottom of frame
      tab.metrics.forEach((m, mIdx) => {
        const py = pad + boxH - 156 + mIdx * 46;
        const barW = boxW - 48;
        const pulse = 0.72 + 0.25 * Math.sin(t * 1.8 + mIdx);

        ctx.fillStyle = 'rgba(17, 17, 17, 0.84)';
        roundRect(ctx, pad + 24, py, barW, 34, 8);
        ctx.fill();

        ctx.fillStyle = 'rgba(253, 185, 18, 0.22)';
        roundRect(ctx, pad + 24, py, barW * pulse, 34, 8);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        roundRect(ctx, pad + 24, py, barW, 34, 8);
        ctx.stroke();

        ctx.fillStyle = '#f4f3ef';
        ctx.font = `500 ${Math.max(11, Math.floor(w * 0.018))}px monospace`;
        ctx.fillText(`0${mIdx + 1}  ${m}`, pad + 38, py + 22);
      });
    }
    requestAnimationFrame(draw);
  });
}

/* 3. Optional Canvas Fallback for 3D Arc Project Cards */
function initProjectCardCanvases() {
  const canvases = document.querySelectorAll('[data-project-canvas]');
  canvases.forEach((canvas) => {
    const idx = Number(canvas.dataset.projectCanvas || 0);
    const project = PROJECTS_DATA[idx] || PROJECTS_DATA[0];
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 420;
    canvas.height = 420;
    const bg = ctx.createLinearGradient(0, 0, 420, 420);
    bg.addColorStop(0, '#111111');
    bg.addColorStop(1, '#080808');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 420, 420);
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

/* 4. Closing Contact Ocean Horizon & Shimmer Reflection Canvas */
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

    // Warm CRAFX #FDB912 horizon glow
    const sunGlow = ctx.createRadialGradient(w * 0.5, horizonY, 4, w * 0.5, horizonY, w * 0.36);
    sunGlow.addColorStop(0, 'rgba(253, 185, 18, 0.26)');
    sunGlow.addColorStop(0.38, 'rgba(245, 158, 11, 0.09)');
    sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, w, h);

    // Crisp horizon seam line
    ctx.strokeStyle = 'rgba(253, 185, 18, 0.26)';
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
      const alpha = (1 - p * 0.75) * 0.2;

      ctx.strokeStyle = `rgba(253, 215, 130, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1 + p * 1.3;
      ctx.beginPath();
      ctx.moveTo(w * 0.5 - spread * 0.5 + sway, y);
      ctx.lineTo(w * 0.5 + spread * 0.5 + sway, y);
      ctx.stroke();
    }

    // Subtle distant birds silhouette above horizon
    const birdCount = 4;
    ctx.strokeStyle = 'rgba(230, 230, 230, 0.34)';
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
