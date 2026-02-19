import { draw } from "../../components/particles/particles.js";
import { animateWords } from "../../components/write-animation/write-animation.js";

// Start the particle animation
draw();

document.addEventListener("headerLoaded", function () {
  // Wait for header to load before applying theme and language

  let currentSide = document.getElementById("home-btn"); // Highlight the current page in the header
  currentSide.classList.add("active-btn");
});

document.addEventListener("DOMContentLoaded", () => {
  animateWords();
});
