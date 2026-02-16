// Globale Variablen
let currentLanguage = localStorage.getItem("lang") || "en";
let projectsData = null;
let translations = null;

const defaultTranslations = {
  github: "GitHub",
  liveDemo: "Live Demo",
  technologies: "Technologies",
  role: "Role",
  duration: "Duration",
  users: "Users",
  status: "Status",
  projects: "Projects",
};

// Projekte laden
async function loadProjects() {
  try {
    const response = await fetch("/src/projects/tuninghub/tuninghub.json");
    const data = await response.json();
    projectsData = data.projects;
    displayProjects(projectsData);
  } catch (error) {
    console.error("Fehler beim Laden der Projekte:", error);
    const container = document.getElementById("projects-container");
    if (container)
      container.innerHTML = "<p>Fehler beim Laden der Projekte.</p>";
  }
}

// Übersetzung holen
function t(key) {
  return (translations && translations[key]) || defaultTranslations[key] || key;
}

// Projekte anzeigen
function displayProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) {
    console.warn("displayProjects: #projects-container not found in DOM.");
    return;
  }

  container.innerHTML = ""; // Container leeren

  projects.forEach((project) => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  // Klick auf die gesamte Karte führt zur Detailseite
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
                <a href="${project.githubUrl}" target="_blank" onclick="event.stopPropagation()">${t("github")}</a>
                <a href="${project.liveUrl}" target="_blank" onclick="event.stopPropagation()">${t("liveDemo")}</a>
            </div>
            <div class="more-informations">
                <p><strong>${t("technologies")}:</strong> ${project.technologies.join(", ")}</p>
                <p><strong>${t("role")}:</strong> ${project.role[currentLanguage]}</p>
                <p><strong>${t("duration")}:</strong> ${project.duration[currentLanguage]}</p>
                <p><strong>${t("users")}:</strong> ${project.users}</p>
                <p><strong>${t("status")}:</strong> <span class="status ${project.status[currentLanguage].toLowerCase()}">${project.status[currentLanguage]}</span></p>
            </div>
        </div>
    `;

  return card;
}

// Projekte beim Laden der Seite anzeigen
document.addEventListener("DOMContentLoaded", loadProjects);
