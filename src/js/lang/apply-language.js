let currentLang = localStorage.getItem("lang") || "en"; // Default to English

export async function loadLang(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  const data = await res.json();

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (typeof data[key] === "string") el.textContent = data[key];
  });
  localStorage.setItem("lang", lang);
}
