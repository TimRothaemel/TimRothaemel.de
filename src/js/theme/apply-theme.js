let currentTheme = localStorage.getItem("theme") || "dark"; // Default to dark 

export async function loadTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("darkmode");
  } else {
    document.body.classList.remove("darkmode");
  }

  localStorage.setItem("theme", theme);
  currentTheme = theme;
}

// Initialize theme on page load
export function initTheme() {
  loadTheme(currentTheme);
}

// Call this when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}