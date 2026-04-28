let currentLanguage = localStorage.getItem("lang") || "en";
let projectsData = [];
let translations = null;

// Translations
const defaultTranslations = {
  github: "GitHub",
  liveDemo: "Live Demo",
  technologies: "Technologies",
  role: "Role",
  duration: "Duration",
  users: "Users",
  status: "Status",
  projects: "Projects",
  loadError: "Error loading projects.",
};

const germanTranslations = {
  github: "GitHub",
  liveDemo: "Live Demo",
  technologies: "Technologien",
  role: "Rolle",
  duration: "Dauer",
  users: "Nutzer",
  status: "Status",
  projects: "Projekte",
  loadError: "Fehler beim Laden der Projekte.",
};

// Translation helper
function t(key) {
  if (currentLanguage === "de") {
    return germanTranslations[key] || defaultTranslations[key] || key;
  }
  return (translations && translations[key]) || defaultTranslations[key] || key;
}

// Icon mapping für Technologien (dark + light)
const techIcons = {
  "HTML":        { dark: "/public/assets/svg/technologies/dark-html5.svg",        light: "/public/assets/svg/technologies/light-html5.svg" },
  "JavaScript":  { dark: "/public/assets/svg/technologies/dark-javascript.svg",  light: "/public/assets/svg/technologies/light-javascript.svg" },
  "CSS":         { dark: "/public/assets/svg/technologies/dark-css.svg",         light: "/public/assets/svg/technologies/light-css.svg" },
  "Supabase":    { dark: "/public/assets/svg/platforms/dark-supabase.svg",    light: "/public/assets/svg/platforms/light-supabase.svg" }
};

// Render tech badges with dark/light icons
function renderTechBadges(technologies) {
  return technologies.map(tech => {
    const icons = techIcons[tech];
    const iconHtml = icons
      ? `<img src="${icons.dark}"  alt="${tech}" class="dark-icon"  onerror="this.style.display='none'">
         <img src="${icons.light}" alt="${tech}" class="light-icon" onerror="this.style.display='none'">`
      : `<span class="tech-icon-fallback">${tech.charAt(0)}</span>`;
    return `<span class="tech-badge">${iconHtml}${tech}</span>`;
  }).join("");
}

// Load all projects via index.json
async function loadProjects() {
  const container = document.getElementById("projects-container");

  try {
    // 1. Index laden
    const indexResponse = await fetch("/src/projects/index.json");
    if (!indexResponse.ok) throw new Error("index.json nicht gefunden");
    const index = await indexResponse.json();

    // 2. Alle Projekt-JSONs parallel laden
    const results = await Promise.allSettled(
      index.projects.map(path => fetch(path).then(r => {
        if (!r.ok) throw new Error(`Fehler beim Laden: ${path}`);
        return r.json();
      }))
    );

    // 3. Erfolgreiche Ergebnisse sammeln, fehlgeschlagene loggen
    projectsData = [];
    results.forEach((result, i) => {
      if (result.status === "fulfilled") {
        const data = result.value;
        // Unterstützt sowohl { projects: [...] } als auch direkt [...]
        const entries = Array.isArray(data) ? data : data.projects ?? [];
        projectsData.push(...entries);
      } else {
        console.warn(`Projekt ${index.projects[i]} konnte nicht geladen werden:`, result.reason);
      }
    });

    displayProjects(projectsData);

  } catch (error) {
    console.error("Fehler beim Laden der Projekte:", error);
    if (container) container.innerHTML = `<p>${t("loadError")}</p>`;
  }
}

// Render project list
function displayProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) {
    console.warn("displayProjects: #projects-container not found in DOM.");
    return;
  }

  container.innerHTML = "";
  projects.forEach((project) =>
    container.appendChild(createProjectCard(project))
  );
}

// Build a single project card
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  card.addEventListener("click", (e) => {
    if (!e.target.closest(".project-links a")) {
      window.location.href = `${project.detailsUrl}`;
    }
  });

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title[currentLanguage]}">
    <div class="informations">
      <div class="main-informations">
        <h3>${project.title[currentLanguage]}</h3>
        <p>${project.description[currentLanguage]}</p>
      </div>
      <div class="project-links">
        <a href="${project.githubUrl}" class="github-link" target="_blank" onclick="event.stopPropagation()">
          <img src="/public/assets/svg/platforms/dark-github.svg" alt="GitHub" class="dark-icon">
          <img src="/public/assets/svg/platforms/light-github.svg" alt="GitHub" class="light-icon">
          ${t("github")}
        </a>
        ${project.liveUrl ? `
          <a href="${project.liveUrl}" class="live-demo-link" target="_blank" onclick="event.stopPropagation()">
            ${t("liveDemo")}
            <img src="/public/assets/svg/dark-open-in-new.svg" alt="Live Demo" class="dark-icon">
            <img src="/public/assets/svg/light-open-in-new.svg" alt="Live Demo" class="light-icon">
          </a>
        ` : ""}
      </div>
      <div class="more-informations">
        <div class="tech-badges">
          <strong>${t("technologies")}:</strong>
          <div class="tech-badges-list">
            ${renderTechBadges(project.technologies)}
          </div>
        </div>
        <p><strong>${t("role")}:</strong> ${project.role[currentLanguage]}</p>
        <p><strong>${t("duration")}:</strong> ${project.duration[currentLanguage]}</p>
        <p><strong>${t("users")}:</strong> ${project.users}</p>
        <p><strong>${t("status")}:</strong>
          <span class="status ${project.status[currentLanguage].toLowerCase()}">
            ${project.status[currentLanguage]}
          </span>
        </p>
      </div>
    </div>
  `;

  return card;
}

document.addEventListener("DOMContentLoaded", loadProjects);
document.addEventListener("changeLanguage", (e) => {
  currentLanguage = e.detail.lang;
  displayProjects(projectsData);
});