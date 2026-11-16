/**
 * CRAFX DEV — Three.js 3D Hero Stage Controller
 * Recreates bunqlabs.com's 3D low-poly mountain peak, falling atmospheric particles,
 * floating 3D portfolio screen (featuring Optellix), tilted orbital ring,
 * spinning 4-point CRAFX yellow-orange (#FDB912) star, and pointer parallax.
 */
const THREE = window.THREE;

function initHeroStage() {
  const canvas = document.getElementById('gl');
  if (!canvas || !THREE) return null;

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

  const fogColorDark = new THREE.Color(0x080808);
  const fogColorLight = new THREE.Color(0xf4f3ef);
  scene.fog = new THREE.FogExp2(isLight() ? fogColorLight : fogColorDark, 0.042);

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 120);
  camera.position.set(0, 1.35, 9.2);

  // Lights anchored by CRAFX DEV's #FDB912 yellow-orange and Optellix emerald/teal
  const ambientLight = new THREE.AmbientLight(0xd8e2ff, 1.15);
  scene.add(ambientLight);

  const rimLight = new THREE.DirectionalLight(0xfdb912, 2.35);
  rimLight.position.set(5, 7, 4);
  scene.add(rimLight);

  const coolLight = new THREE.DirectionalLight(0x10b981, 1.45);
  coolLight.position.set(-6, 5, 3);
  scene.add(coolLight);

  const backGlowLight = new THREE.PointLight(0xfdb912, 2.4, 18);
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
    color: isLight() ? 0xd8dce4 : 0x13151b,
    roughness: 0.78,
    metalness: 0.18,
    flatShading: true
  });
  const mountainMesh = new THREE.Mesh(mountainGeo, mountainMat);
  mountainMesh.position.set(0, -1.65, 0.5);
  rootGroup.add(mountainMesh);

  const wireMat = new THREE.MeshBasicMaterial({
    color: isLight() ? 0x9aa4b8 : 0x2f3340,
    wireframe: true,
    transparent: true,
    opacity: 0.14
  });
  const mountainWire = new THREE.Mesh(mountainGeo, wireMat);
  mountainWire.position.copy(mountainMesh.position);
  mountainWire.position.y += 0.006;
  rootGroup.add(mountainWire);

  // 2. Floating 3D Portfolio Screen + Orbital Ring + Spinning 4-Point #FDB912 Star
  const showreelGroup = new THREE.Group();
  showreelGroup.position.set(0, 2.08, -0.35);
  rootGroup.add(showreelGroup);

  // Atmospheric Halo Plane behind the showreel & mountain ridge
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 256;
  haloCanvas.height = 256;
  const hCtx = haloCanvas.getContext('2d');
  if (hCtx) {
    const hGrad = hCtx.createRadialGradient(128, 128, 8, 128, 128, 124);
    hGrad.addColorStop(0, 'rgba(253, 185, 18, 0.22)');
    hGrad.addColorStop(0.45, 'rgba(16, 185, 129, 0.10)');
    hGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    hCtx.fillStyle = hGrad;
    hCtx.fillRect(0, 0, 256, 256);
  }
  const haloTex = new THREE.CanvasTexture(haloCanvas);
  const haloGeo = new THREE.PlaneGeometry(9.5, 6.2);
  const haloMat = new THREE.MeshBasicMaterial({
    map: haloTex,
    transparent: true,
    depthWrite: false
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  haloMesh.position.set(0, 1.35, -1.6);
  rootGroup.add(haloMesh);

  // Load real Optellix case study image for the 3D floating hero screen
  const heroImg = new Image();
  let heroImgLoaded = false;
  heroImg.onload = () => {
    heroImgLoaded = true;
  };
  heroImg.src = './assets/projects/optellix-cover.webp';

  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 320;
  const sCtx = screenCanvas.getContext('2d');
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  function drawScreenTexture(t) {
    if (!sCtx) return;
    const w = screenCanvas.width;
    const h = screenCanvas.height;

    const grad = sCtx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0a0f12');
    grad.addColorStop(0.55, '#0f1c18');
    grad.addColorStop(1, '#080808');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, w, h);

    if (heroImgLoaded) {
      sCtx.save();
      sCtx.globalAlpha = 0.78;
      const scale = 1.03 + Math.sin(t * 0.6) * 0.025;
      const dw = w * scale;
      const dh = h * scale;
      sCtx.drawImage(heroImg, (w - dw) * 0.5, (h - dh) * 0.5, dw, dh);
      sCtx.restore();

      const vignette = sCtx.createLinearGradient(0, 0, 0, h);
      vignette.addColorStop(0, 'rgba(8, 8, 8, 0.35)');
      vignette.addColorStop(0.55, 'rgba(8, 8, 8, 0.12)');
      vignette.addColorStop(1, 'rgba(8, 8, 8, 0.85)');
      sCtx.fillStyle = vignette;
      sCtx.fillRect(0, 0, w, h);
    }

    // Subtle frame border & verified project label
    sCtx.strokeStyle = 'rgba(253, 185, 18, 0.35)';
    sCtx.lineWidth = 1.5;
    sCtx.strokeRect(10, 10, w - 20, h - 20);

    sCtx.fillStyle = '#fdb912';
    sCtx.font = '600 11px monospace';
    sCtx.textAlign = 'left';
    sCtx.fillText('FEATURED WORK // OPTELLIX 3D SAAS', 22, h - 42);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = '600 18px sans-serif';
    sCtx.fillText('CRAFX DEV · DIGITAL STUDIO', 22, h - 20);

    screenTexture.needsUpdate = true;
  }

  const screenGeo = new THREE.PlaneGeometry(2.35, 1.46);
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture,
    side: THREE.DoubleSide
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  showreelGroup.add(screenMesh);

  // Dark bezel behind screen
  const bezelGeo = new THREE.BoxGeometry(2.44, 1.54, 0.06);
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.4,
    metalness: 0.5
  });
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.z = -0.04;
  showreelGroup.add(bezelMesh);

  // Tilted 3D Orbital Ring around the screen
  const ringGeo = new THREE.TorusGeometry(1.74, 0.016, 16, 100);
  const ringMat = new THREE.MeshStandardMaterial({
    color: isLight() ? 0x666a73 : 0x767a85,
    roughness: 0.35,
    metalness: 0.65
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI * 0.38;
  ringMesh.rotation.y = -Math.PI * 0.14;
  showreelGroup.add(ringMesh);

  // 4-Point #FDB912 CRAFX Star orbiting on the ring
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
  const starMat = new THREE.MeshBasicMaterial({ color: 0xfdb912 });
  const starMesh = new THREE.Mesh(starGeo, starMat);
  starMesh.position.set(1.55, 0.35, 0.55);
  showreelGroup.add(starMesh);

  // 3. Atmospheric Particles (Reduced count on mobile for 60fps performance)
  const isMobile = window.innerWidth <= 767;
  const snowCount = isMobile ? 1200 : 2800;
  const snowPositions = new Float32Array(snowCount * 3);
  const snowSpeeds = new Float32Array(snowCount);
  for (let i = 0; i < snowCount; i++) {
    snowPositions[i * 3] = (Math.random() - 0.5) * 24;
    snowPositions[i * 3 + 1] = (Math.random() - 0.2) * 14;
    snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    snowSpeeds[i] = 0.35 + Math.random() * 0.8;
  }
  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowMat = new THREE.PointsMaterial({
    color: isLight() ? 0x1a1a1a : 0xffffff,
    size: 0.034,
    transparent: true,
    opacity: 0.55
  });
  const snowPoints = new THREE.Points(snowGeo, snowMat);
  scene.add(snowPoints);

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

  function syncTheme() {
    const light = isLight();
    scene.fog.color.copy(light ? fogColorLight : fogColorDark);
    mountainMat.color.setHex(light ? 0xdde1e8 : 0x13151b);
    wireMat.color.setHex(light ? 0x8a92a6 : 0x2f3340);
    snowMat.color.setHex(light ? 0x202020 : 0xffffff);
  }

  window.addEventListener('crafx-theme-change', syncTheme);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = reducedMotion ? 0 : clock.getElapsedTime();

    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight || 800;
    const heroRatio = Math.max(0, Math.min(1, 1 - scrollY / (vh * 1.25)));
    canvas.style.opacity = String(heroRatio);
    if (heroRatio <= 0.01) return;

    drawScreenTexture(elapsed);

    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    rootGroup.rotation.y = currentX * 0.14;
    rootGroup.rotation.x = currentY * 0.06;

    showreelGroup.position.y = 2.08 + Math.sin(elapsed * 1.2) * 0.06 - scrollY * 0.0012;
    showreelGroup.rotation.y = Math.sin(elapsed * 0.45) * 0.1 + currentX * 0.1;
    ringMesh.rotation.z = elapsed * 0.32;

    const orbitAngle = elapsed * 0.52;
    starMesh.position.set(
      Math.cos(orbitAngle) * 1.74,
      Math.sin(orbitAngle) * Math.cos(Math.PI * 0.38) * 1.74,
      Math.sin(orbitAngle) * Math.sin(Math.PI * 0.38) * 1.74 + 0.12
    );
    starMesh.rotation.z = -elapsed * 1.6;
    starMesh.rotation.y = elapsed * 1.1;

    if (!reducedMotion) {
      const arr = snowGeo.attributes.position.array;
      for (let i = 0; i < snowCount; i++) {
        const idx = i * 3;
        arr[idx + 1] -= snowSpeeds[i] * 0.012;
        arr[idx] += Math.sin(elapsed * 0.6 + i) * 0.002;
        if (arr[idx + 1] < -3.5) {
          arr[idx + 1] = 9.5;
        }
      }
      snowGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  animate();
  return { syncTheme };
}
