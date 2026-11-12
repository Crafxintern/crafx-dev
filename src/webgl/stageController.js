/**
 * CRAFX DEV — Three.js 3D Hero Stage Controller
 * Recreates bunqlabs.com's 3D low-poly mountain peak, 4,000 falling snow particles,
 * floating showreel screen, tilted orbital ring, spinning 4-point red star, and pointer parallax.
 */
import * as THREE from 'three';

export function initHeroStage() {
  const canvas = document.getElementById('gl');
  if (!canvas) return null;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const isLight = () => document.documentElement.dataset.theme === 'light';

  const fogColorDark = new THREE.Color(0x0f0f12);
  const fogColorLight = new THREE.Color(0xf2f4f8);
  scene.fog = new THREE.FogExp2(isLight() ? fogColorLight : fogColorDark, 0.042);

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 120);
  camera.position.set(0, 1.35, 9.2);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xd8e2ff, 1.15);
  scene.add(ambientLight);

  const rimLight = new THREE.DirectionalLight(0xff3232, 2.2);
  rimLight.position.set(5, 7, 4);
  scene.add(rimLight);

  const coolLight = new THREE.DirectionalLight(0x6d86fe, 1.65);
  coolLight.position.set(-6, 5, 3);
  scene.add(coolLight);

  const backGlowLight = new THREE.PointLight(0xe8b94f, 2.4, 18);
  backGlowLight.position.set(0, 1.5, -2.5);
  scene.add(backGlowLight);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // 1. Low-Poly Mountain Ridge Mesh (Bottom Center)
  const mountainGeo = new THREE.PlaneGeometry(24, 12, 44, 24);
  mountainGeo.rotateX(-Math.PI * 0.44);
  const posAttr = mountainGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    const distFromCenter = Math.abs(x) * 0.22 + Math.abs(z) * 0.26;
    const ridge = Math.max(0, 3.1 - distFromCenter * 1.45);
    const jag =
      Math.sin(x * 1.35) * Math.cos(z * 1.4) * 0.48 +
      Math.sin(x * 2.9 + z * 2.1) * 0.24 +
      Math.cos(x * 0.7 - z * 1.8) * 0.32;
    const height = Math.max(-1.4, ridge + jag * (0.4 + ridge * 0.35) - 2.35);
    posAttr.setY(i, height);
  }
  mountainGeo.computeVertexNormals();

  const mountainMat = new THREE.MeshStandardMaterial({
    color: isLight() ? 0xd8dce4 : 0x1a1c24,
    roughness: 0.78,
    metalness: 0.18,
    flatShading: true
  });
  const mountainMesh = new THREE.Mesh(mountainGeo, mountainMat);
  mountainMesh.position.set(0, -1.65, 0.5);
  rootGroup.add(mountainMesh);

  // Subtle wireframe overlay on mountain ridge for technical craft feel
  const wireMat = new THREE.MeshBasicMaterial({
    color: isLight() ? 0x9aa4b8 : 0x363b4d,
    wireframe: true,
    transparent: true,
    opacity: 0.16
  });
  const mountainWire = new THREE.Mesh(mountainGeo, wireMat);
  mountainWire.position.copy(mountainMesh.position);
  mountainWire.position.y += 0.006;
  rootGroup.add(mountainWire);

  // 2. Floating 3D Showreel Screen + Orbital Ring + Spinning 4-Point Red Star
  const showreelGroup = new THREE.Group();
  showreelGroup.position.set(0, 1.95, -0.4);
  rootGroup.add(showreelGroup);

  // Dynamic Canvas Texture for the 3D Showreel Screen
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 288;
  const sCtx = screenCanvas.getContext('2d');
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  function drawScreenTexture(t) {
    if (!sCtx) return;
    const w = screenCanvas.width;
    const h = screenCanvas.height;

    const grad = sCtx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#121526');
    grad.addColorStop(0.55, '#1d1422');
    grad.addColorStop(1, '#0d0f17');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, w, h);

    // Animated grid lines
    sCtx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    sCtx.lineWidth = 1;
    const offset = (t * 28) % 32;
    for (let x = -32; x < w + 32; x += 32) {
      sCtx.beginPath();
      sCtx.moveTo(x + offset, 0);
      sCtx.lineTo(x + offset, h);
      sCtx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      sCtx.beginPath();
      sCtx.moveTo(0, y);
      sCtx.lineTo(w, y);
      sCtx.stroke();
    }

    // Glowing orb inside screen
    const orbX = w * 0.5 + Math.cos(t * 1.4) * 75;
    const orbY = h * 0.5 + Math.sin(t * 1.8) * 35;
    const rad = sCtx.createRadialGradient(orbX, orbY, 4, orbX, orbY, 120);
    rad.addColorStop(0, 'rgba(255, 50, 50, 0.65)');
    rad.addColorStop(0.5, 'rgba(232, 185, 79, 0.25)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = rad;
    sCtx.fillRect(0, 0, w, h);

    // Frame border & HUD typography
    sCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    sCtx.strokeRect(14, 14, w - 28, h - 28);

    sCtx.fillStyle = '#e8b94f';
    sCtx.font = '600 13px monospace';
    sCtx.textAlign = 'center';
    sCtx.fillText('CRAFX [DEV] // WEB REEL', w / 2, h * 0.44);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = '700 26px sans-serif';
    sCtx.fillText('DESIGN × CODE × MOTION', w / 2, h * 0.57);

    sCtx.fillStyle = 'rgba(255,255,255,0.55)';
    sCtx.font = '11px monospace';
    sCtx.fillText('[SHOWREEL PREVIEW]', w / 2, h * 0.72);

    screenTexture.needsUpdate = true;
  }

  const screenGeo = new THREE.PlaneGeometry(2.35, 1.32);
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture,
    side: THREE.DoubleSide
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  showreelGroup.add(screenMesh);

  // Dark bezel behind screen
  const bezelGeo = new THREE.BoxGeometry(2.44, 1.4, 0.06);
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x181920,
    roughness: 0.4,
    metalness: 0.5
  });
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.z = -0.04;
  showreelGroup.add(bezelMesh);

  // Tilted 3D Orbital Ring around the screen
  const ringGeo = new THREE.TorusGeometry(1.72, 0.018, 16, 100);
  const ringMat = new THREE.MeshStandardMaterial({
    color: isLight() ? 0x666a73 : 0x7c8296,
    roughness: 0.35,
    metalness: 0.65
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI * 0.38;
  ringMesh.rotation.y = -Math.PI * 0.14;
  showreelGroup.add(ringMesh);

  // 4-Point Red Star orbiting on the ring
  const starShape = new THREE.Shape();
  const outerR = 0.18;
  const innerR = 0.045;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? outerR : innerR;
    const sx = Math.cos(angle) * r;
    const sy = Math.sin(angle) * r;
    if (i === 0) starShape.moveTo(sx, sy);
    else starShape.lineTo(sx, sy);
  }
  starShape.closePath();
  const starGeo = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2
  });
  starGeo.center();
  const starMat = new THREE.MeshBasicMaterial({ color: 0xff3232 });
  const starMesh = new THREE.Mesh(starGeo, starMat);
  starMesh.position.set(1.55, 0.35, 0.55);
  showreelGroup.add(starMesh);

  // 3. 3,200 Falling Snow / Atmospheric Particles
  const snowCount = 3200;
  const snowPositions = new Float32Array(snowCount * 3);
  const snowSpeeds = new Float32Array(snowCount);
  for (let i = 0; i < snowCount; i++) {
    snowPositions[i * 3] = (Math.random() - 0.5) * 24;
    snowPositions[i * 3 + 1] = (Math.random() - 0.2) * 14;
    snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    snowSpeeds[i] = 0.4 + Math.random() * 0.9;
  }
  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowMat = new THREE.PointsMaterial({
    color: isLight() ? 0x1a1a1a : 0xffffff,
    size: 0.038,
    transparent: true,
    opacity: 0.65
  });
  const snowPoints = new THREE.Points(snowGeo, snowMat);
  scene.add(snowPoints);

  // Pointer parallax state
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener(
    'pointermove',
    (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  // Theme sync helper
  function syncTheme() {
    const light = isLight();
    scene.fog.color.copy(light ? fogColorLight : fogColorDark);
    mountainMat.color.setHex(light ? 0xdde1e8 : 0x181a22);
    wireMat.color.setHex(light ? 0x8a92a6 : 0x353b4f);
    snowMat.color.setHex(light ? 0x202020 : 0xffffff);
  }

  window.addEventListener('crafx-theme-change', syncTheme);

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Fade canvas out smoothly when scrolled far past hero so DOM sections remain crisp
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight || 800;
    const heroRatio = Math.max(0, Math.min(1, 1 - scrollY / (vh * 1.25)));
    canvas.style.opacity = String(heroRatio);
    if (heroRatio <= 0.01) return;

    drawScreenTexture(elapsed);

    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    rootGroup.rotation.y = currentX * 0.16;
    rootGroup.rotation.x = currentY * 0.07;

    showreelGroup.position.y = 1.95 + Math.sin(elapsed * 1.3) * 0.08 - scrollY * 0.0012;
    showreelGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.12 + currentX * 0.12;
    ringMesh.rotation.z = elapsed * 0.35;

    starMesh.rotation.z = -elapsed * 1.8;
    starMesh.rotation.y = elapsed * 1.2;

    // Update falling snow
    const arr = snowGeo.attributes.position.array;
    for (let i = 0; i < snowCount; i++) {
      const idx = i * 3;
      arr[idx + 1] -= snowSpeeds[i] * 0.014;
      arr[idx] += Math.sin(elapsed * 0.6 + i) * 0.0025;
      if (arr[idx + 1] < -3.5) {
        arr[idx + 1] = 9.5;
      }
    }
    snowGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
  return { syncTheme };
}
