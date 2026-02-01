import { loadLang } from "../js/lang/apply-language.js";
import { changeLanguage } from "../js/lang/change-language.js";

window.changeLanguage = changeLanguage;  // Expose to global scope (inde.html onclick)

let currentLang = localStorage.getItem("lang") || "de";
loadLang(currentLang);