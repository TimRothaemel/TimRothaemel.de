document.addEventListener("headerLoaded", function () {
  let currentSide = document.getElementById("legal-notice-btn"); // Highlight the current page in the header
  currentSide.classList.add("active-btn");
});
function renderImprint() {
  const container = document.getElementById("imprint-container");
  if (!container) return;

  const isGerman = currentLanguage === "de";

  container.innerHTML = `
    <h1>${isGerman ? "Impressum" : t("imprintTitle")}</h1>
    <p>${isGerman ? "Angaben gemäß § 5 DDG" : t("legalReference")}</p>

    <p>
      Tim Rothämel<br>
      Dammstraße 23<br>
      37339 Breitenworbis<br>
      ${isGerman ? "Deutschland" : "Germany"}
    </p>

    <h2>${isGerman ? "Kontakt" : t("contact")}</h2>
    <p>
      Telefon: +49 1525 9850350<br>
      E-Mail: timrothamel@gmail.com
    </p>

    <p>
      ${isGerman 
        ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Tim Rothämel, Anschrift wie oben."
        : t("responsible") + ": Tim Rothämel, address as stated above."
      }
    </p>
  `;
}
renderImprint();