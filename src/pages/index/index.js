import { draw } from "../../components/particles/particles.js";
import { animateWords } from "../../components/write-animation/write-animation.js";

// Start the particle animation
draw();

document.addEventListener("headerLoaded", function () {
  document.getElementById("home-btn")?.classList.add("active-btn"); // Highlight the current page in the header
});

document.addEventListener("DOMContentLoaded", () => {
  animateWords();
});
