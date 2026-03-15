currentLanguage = localStorage.getItem("lang") || "en";

document.addEventListener("headerLoaded", function () {
  document.getElementById("cv-btn")?.classList.add("active-btn"); // Highlight the current page in the header
});

document.addEventListener("DOMContentLoaded", function () {
  loadCV();
});

document.addEventListener("changeLanguage", function (e) {
  currentLanguage = e.detail.lang;
  loadCV();
});

async function loadCV() {
  let cvElement = document.getElementById("cv-section");
  cvElement.innerHTML = `
<h1 data-i18n="cv_title"></h1>
<p data-i18n="cv_description"></p>
  <iframe src="/public/assets/cv/${currentLanguage}.pdf" class="cv-iframe"></iframe>
<a href="/public/assets/cv/${currentLanguage}.pdf" download class="download-cv-btn" target="_blank" data-i18n="cv_download"></a>
  `;
}
