let currentLanguage = localStorage.getItem("lang") || "en";
let projectsData = null;
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

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch("/src/projects/tuninghub/tuninghub.json");
    const data = await response.json();
    projectsData = data.projects;
    displayProjects(projectsData);
  } catch (error) {
    console.error("Error loading projects:", error);
    const container = document.getElementById("projects-container");
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
    container.appendChild(createProjectCard(project)),
  );
}

// Build a single project card
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  card.addEventListener("click", (e) => {
    if (!e.target.closest(".project-links a")) {
      window.location.href = `${project.detailsUrl}&lang=${currentLanguage}`;
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
        <a href="${project.githubUrl}" target="_blank" onclick="event.stopPropagation()">
          <img src="/public/assets/svg/platforms/dark-github.svg" alt="GitHub" class="light-icon">
          <img src="/public/assets/svg/platforms/light-github.svg" alt="GitHub" class="dark-icon">
        </a>
        <a href="${project.liveUrl}" target="_blank" onclick="event.stopPropagation()">${t("liveDemo")}</a>
      </div>
      <div class="more-informations">
        <p><strong>${t("technologies")}:</strong> ${project.technologies.join(", ")}</p>
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
document.addEventListener("changeLanguage", (e) => { // Listen for language change events
    currentLanguage = e.detail.lang; 
    displayProjects(projectsData);
});