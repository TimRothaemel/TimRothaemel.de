document.addEventListener("headerLoaded", function () {
  document.getElementById("skills-btn")?.classList.add("active-btn");
});

GitHubCalendar(".calendar", "TimRothaemel", {
  responsive: true,
});

const skillsContainer = document.getElementById("skills-container");
const certificatesContainer = document.getElementById("certificates-container");

async function loadSkills() {
  try {
    const response = await fetch("skills.json");
    const skills = await response.json();

    renderSkills(skills);
  } catch (error) {
    console.error("Fehler beim Laden der Skills:", error);
  }
}

function renderSkills(skills) {
  skillsContainer.innerHTML = "";

  skills.forEach(skill => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("skill-card");
    if (skill.featured) {
      wrapper.classList.add("skill-card--featured");
    }

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const list = document.createElement("ul");

    skill.details.forEach(detail => {
      const li = document.createElement("li");

      const label = document.createElement("span");
      label.textContent = detail.label;
      li.appendChild(label);

      if (detail.usedIn) {
        li.classList.add("has-link");

        const link = document.createElement("a");
        link.href = detail.usedIn.url;
        link.textContent = detail.usedIn.text;
        link.classList.add("used-in-link");
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        li.appendChild(link);
      }

      list.appendChild(li);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(list);

    skillsContainer.appendChild(wrapper);
  });
}

async function loadCertificates() {
  if (!certificatesContainer) return;

  try {
    const response = await fetch("certificates.json");
    const certificates = await response.json();

    renderCertificates(certificates);
  } catch (error) {
    console.error("Fehler beim Laden der Zertifikate:", error);
  }
}

function renderCertificates(certificates) {
  certificatesContainer.innerHTML = "";

  certificates.forEach(cert => {
    const hasLink = Boolean(cert.url);
    const card = document.createElement(hasLink ? "a" : "div");
    card.classList.add("certificate-card");

    if (hasLink) {
      card.href = cert.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    const title = document.createElement("p");
    title.classList.add("certificate-title");
    title.textContent = cert.title;

    const meta = document.createElement("p");
    meta.classList.add("certificate-meta");
    meta.textContent = [cert.issuer, cert.date].filter(Boolean).join(" · ");

    card.appendChild(title);
    card.appendChild(meta);
    certificatesContainer.appendChild(card);
  });
}

loadSkills();
loadCertificates();
