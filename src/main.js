/**
 * CRAFX DEV — Main Homepage Entry Point
 * Initializes the Three.js 3D Hero Stage, Interactive Canvas Renderers, and UI Choreography.
 */
import { initHeroStage } from './webgl/stageController.js';
import { initVisualRenderers } from './components/visualRenderers.js';
import { initAllInteractions } from './components/interactions.js';

function boot() {
  initAllInteractions();
  initVisualRenderers();
  try {
    initHeroStage();
  } catch (err) {
    console.warn('WebGL fallback active:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
