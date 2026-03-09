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
});

// Update language button style when language is changed
document.addEventListener("changeLanguage", function (event) {
  updateLanguageButtonStyle(event.detail.lang);
});