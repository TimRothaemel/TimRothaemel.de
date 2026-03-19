let animationStarted = false;
let flakes = [];

function initCanvas() {
  const canvas = document.getElementById("bg");
  if (!canvas) return null;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = window.devicePixelRatio || 1;

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize);

  return { canvas, ctx };
}

function getThemeVar(name, fallback) {
  const body = document.body;
  const root = document.documentElement;

  const bodyValue = getComputedStyle(body).getPropertyValue(name).trim();
  if (bodyValue) return bodyValue;

  const rootValue = getComputedStyle(root).getPropertyValue(name).trim();
  if (rootValue) return rootValue;

  return fallback;
}

function startAnimation(canvas, ctx) {
  const FLAKES = 120;
  flakes = [];

  for (let i = 0; i < FLAKES; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 1 + 0.3,
    });
  }

  function drawFrame() {
    const bgColor = getThemeVar("--bg-primary", "transparent");

    // Draw a solid background so we always match the current theme.
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getThemeVar("--text-secondary", "#485470");
    ctx.globalAlpha = 0.65; // make particles subtly transparent so the background shows through

    for (const f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();

      f.y += f.speed;
      if (f.y > canvas.height) {
        f.y = -5;
        f.x = Math.random() * canvas.width;
      }
    }

    // Restore full alpha in case other code draws to the canvas later
    ctx.globalAlpha = 1;

    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

function initParticles() {
  if (animationStarted) return;

  const ctxObj = initCanvas();
  if (!ctxObj) return;

  startAnimation(ctxObj.canvas, ctxObj.ctx);
  animationStarted = true;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initParticles);
} else {
  initParticles();
}

export function draw() {
  initParticles();
}
