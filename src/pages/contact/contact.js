document.addEventListener("headerLoaded", function () {
  document.getElementById("contact-btn")?.classList.add("active-btn");
  updateContactPlaceholders(localStorage.getItem("lang") || "en");
});

document.addEventListener("changeLanguage", function (event) {
  updateContactPlaceholders(event.detail.lang);
});

async function updateContactPlaceholders(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = data[key] || "";
  });
}

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:timrothaemel@outlook.de?subject=${subject}&body=${body}`;
  });
}
