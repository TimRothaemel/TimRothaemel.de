import { loadLang } from "../../js/lang/apply-language.js";
import { changeLanguage } from "../../js/lang/change-language.js";
import { loadTheme } from "../../js/theme/apply-theme.js";
import { changeTheme } from "../../js/theme/change-theme.js";
import { draw } from "../../components/particles/particles.js";

// Start the particle animation
draw();

// Make functions available globally for onclick handlers in HTML

window.changeLanguage = changeLanguage;  // Expose to global scope (inde.html onclick)
window.changeTheme = changeTheme;      // Expose to global scope (inde.html onclick)

// Load saved theme or default to dark
let currentTheme = localStorage.getItem("theme") || "dark";
loadTheme(currentTheme);

// Load saved language or default to German

let currentLang = localStorage.getItem("lang") || "de";
loadLang(currentLang);