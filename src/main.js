/**
 * CRAFX DEV — Main Homepage Entry Point
 * Initializes the Three.js 3D Hero Stage, Interactive Canvas Renderers, Lenis Smooth Scroll, and UI Choreography.
 */

function initSmoothScroll() {
  if (typeof window.Lenis !== 'function') return;
  try {
    const lenis = new window.Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (err) {
    console.warn('Lenis smooth scroll fallback:', err);
  }
}

function boot() {
  try {
    initAllInteractions();
  } catch (err) {
    console.error('Interactions error:', err);
  }
  try {
    initVisualRenderers();
  } catch (err) {
    console.error('Visual renderers error:', err);
  }
  try {
    initHeroStage();
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
