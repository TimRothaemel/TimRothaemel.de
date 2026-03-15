import { loadLang } from "./lang/apply-language.js";
import { loadTheme } from "./theme/apply-theme.js";
import { changeLanguage } from "./lang/change-language.js";
import { changeTheme } from "./theme/change-theme.js";

window.changeLanguage = changeLanguage; // Expose to global scope (header onclick)
window.changeTheme = changeTheme; // Expose to global scope (header onclick)

function updateLanguageButtonStyle(lang) {
  if (lang === "en") {
    document.getElementById("en-btn")?.classList.add("active-btn");
    document.getElementById("de-btn")?.classList.remove("active-btn");
  } else if (lang === "de") {
    document.getElementById("de-btn")?.classList.add("active-btn");
    document.getElementById("en-btn")?.classList.remove("active-btn");
  }
}

document.addEventListener("headerLoaded", function () {
  // Wait for header to load before applying theme and language
  // Load saved theme or default to dark
  let currentTheme = localStorage.getItem("theme") || "dark";
  loadTheme(currentTheme);

  // Load saved language or default to english
  let currentLang = localStorage.getItem("lang") || "en";
  loadLang(currentLang);
  updateLanguageButtonStyle(currentLang);

  // Add mobile menu toggle functionality
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function() {
      navLinks.classList.toggle("open");
    });

    // Close menu when clicking on a link
    navLinks.addEventListener("click", function(e) {
      if (e.target.classList.contains("nav-link")) {
        navLinks.classList.remove("open");
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
      }
    });
  }
});

// Update language button style when language is changed
document.addEventListener("changeLanguage", function (event) {
  updateLanguageButtonStyle(event.detail.lang);
});