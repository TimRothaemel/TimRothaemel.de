console.log("particles loaded");
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const flakes = [];
const FLAKES = 120;

for (let i = 0; i < FLAKES; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.3,
  });
}

export function draw() {
    ctx.fillStyle = "red";
ctx.fillRect(10,10,50,50);
  ctx.clearRect(0, 0, canvas.width, canvas.height);



  let currentLang = localStorage.getItem("theme") || "dark";
  if (currentLang === "dark") {
    ctx.fillStyle = "#f8f9fa"; // Light color for dark mode
  } else {
    ctx.fillStyle = "#0f172a"; // Dark color for light mode
  }


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

  requestAnimationFrame(draw);
}

