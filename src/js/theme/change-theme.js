import { loadTheme } from "./apply-theme.js";

export function changeTheme(theme) {
  loadTheme(theme);
}

// Make it available globally for onclick handlers in HTML
window.changeTheme = changeTheme;