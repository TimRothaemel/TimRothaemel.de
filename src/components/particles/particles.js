let animationStarted = false;
let flakes = [];

function initParticles() {
  if (animationStarted) return;

  const canvas = document.getElementById("bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;// Handle high-DPI screens

  function resize() {// Adjust canvas size for high-DPI screens
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize);

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

  function getParticleColor() {
    const value = getComputedStyle(document.body).getPropertyValue("--text-secondary");
    return value ? value.trim() : "#485470";
  }

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getParticleColor();

    for (let f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();

      f.y += f.speed;
      if (f.y > canvas.height) {
        f.y = -5;
        f.x = Math.random() * canvas.width;
      }
    }

    requestAnimationFrame(drawFrame);
  }

  animationStarted = true;
  drawFrame();
}

// Ensure the canvas exists before starting animation (especially for module scripts in <head>)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initParticles);
} else {
  initParticles();
}

// Exported for compatibility with existing imports.
export function draw() {
  initParticles();
}

