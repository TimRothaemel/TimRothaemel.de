let currentLanguage = localStorage.getItem("lang") || "en";

// Translations
const defaultTranslations = {
  imprintTitle: "Imprint",
  legalReference: "Information according to § 5 DDG",
  country: "Germany",
  contactTitle: "Contact",
  responsible: "Responsible for content under § 18 para. 2 MStV: Tim Rothämel, address as stated above.",
  loadError: "Error rendering imprint.",
};

const germanTranslations = {
  imprintTitle: "Impressum",
  legalReference: "Angaben gemäß § 5 DDG",
  country: "Deutschland",
  contactTitle: "Kontakt",
  responsible: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Tim Rothämel, Anschrift wie oben.",
  loadError: "Fehler beim Anzeigen des Impressums.",
};

// Translation helper
function t(key) {
  if (currentLanguage === "de") {
    return germanTranslations[key] || defaultTranslations[key] || key;
  }
  return defaultTranslations[key] || key;
}

// Highlight active nav button
document.addEventListener("headerLoaded", function () {
  document.getElementById("legal-notice-btn")?.classList.add("active-btn");// Highlight the current page in the header
});

// Render imprint content
function renderImprint() {
  const container = document.getElementById("imprint-container");
  if (!container) {
    console.warn("renderImprint: #imprint-container not found in DOM.");
    return;
  }

  container.innerHTML = `
    <h1>${t("imprintTitle")}</h1>
    <p>${t("legalReference")}</p>

    <p>
      Tim Rothämel<br>
      Dammstraße 23<br>
      37339 Breitenworbis<br>
      ${t("country")}
    </p>

    <h2>${t("contactTitle")}</h2>
    <p>
      Telefon: +49 1525 9850350<br>
      E-Mail: timrothamel@gmail.com
    </p>

    <p>${t("responsible")}</p>
  `;
}

document.addEventListener("DOMContentLoaded", renderImprint);