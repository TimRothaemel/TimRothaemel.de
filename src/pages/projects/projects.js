document.addEventListener("headerLoaded", function () {
  let currentSide = document.getElementById("project-btn"); // Highlight the current page in the header
  currentSide.classList.add("active-btn");
});
