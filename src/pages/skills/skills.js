document.addEventListener("headerLoaded", function () {
  document.getElementById("skills-btn")?.classList.add("active-btn"); // Highlight the current page in the header
});
GitHubCalendar(".calendar", "TimRothaemel", { //add calendar to page
  responsive: true,
});
