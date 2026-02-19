import { loadLang } from "./lang/apply-language.js";
import { loadTheme } from "./theme/apply-theme.js";
import { changeLanguage } from "./lang/change-language.js";
import { changeTheme } from "./theme/change-theme.js";

window.changeLanguage = changeLanguage; // Expose to global scope (header onclick)
window.changeTheme = changeTheme; // Expose to global scope (header onclick)

document.addEventListener("headerLoaded", function () {
  // Wait for header to load before applying theme and language
  // Load saved theme or default to dark
  let currentTheme = localStorage.getItem("theme") || "dark";
  loadTheme(currentTheme);

  // Load saved language or default to english
  let currentLang = localStorage.getItem("lang") || "en";
  loadLang(currentLang);
});
