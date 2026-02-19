document.addEventListener("headerLoaded", function () {
  // Wait for header to load before applying theme and language

  let currentSide = document.getElementById("project-btn"); // Highlight the current page in the header
  currentSide.classList.add("active-btn");
});
