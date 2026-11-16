/**
 * CRAFX DEV — Main Homepage Entry Point
 * Initializes the Three.js 3D Hero Stage, Interactive Canvas Renderers,
 * Lenis Smooth Scroll, and all BUNQ LABS-inspired UI Choreography.
 */
function initSmoothScroll() {
  if (typeof window.Lenis !== 'function') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    const lenis = new window.Lenis({
      duration: 1.12,
      smoothWheel: true,
      wheelMultiplier: 0.95
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (err) {
    console.warn('Lenis smooth scroll skipped:', err);
  }
}

function boot() {
  try {
    if (typeof initAllInteractions === 'function') initAllInteractions();
  } catch (err) {
    console.error('Interactions init error:', err);
  }
  try {
    if (typeof initVisualRenderers === 'function') initVisualRenderers();
  } catch (err) {
    console.error('Visual renderers init error:', err);
  }
  try {
    if (typeof initHeroStage === 'function') initHeroStage();
  } catch (err) {
    console.warn('WebGL fallback active:', err);
  }
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
