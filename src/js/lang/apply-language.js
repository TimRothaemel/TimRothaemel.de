let currentLang = localStorage.getItem("lang") || "de";

export async function loadLang(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = data[key];
  });

  localStorage.setItem("lang", lang);
}
