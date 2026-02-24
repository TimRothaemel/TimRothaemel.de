document.addEventListener("headerLoaded", function () {
  document.getElementById("skills-btn")?.classList.add("active-btn");
});

GitHubCalendar(".calendar", "TimRothaemel", {
  responsive: true,
});

const container = document.getElementById("skills-container");

async function loadSkills() {// loaded from skills.json
  try {
    const response = await fetch("skills.json"); 
    const skills = await response.json();// parsed as JSON

    renderSkills(skills);
  } catch (error) {
    console.error("Fehler beim Laden der Skills:", error);
  }
}

function renderSkills(skills) {// clear the container before rendering new content
  container.innerHTML = "";

  skills.forEach(skill => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("skill-card");

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const list = document.createElement("ul");

    skill.details.forEach(detail => {
      const li = document.createElement("li");
      li.textContent = detail;
      list.appendChild(li);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(list);

    container.appendChild(wrapper);
  });
}

loadSkills();