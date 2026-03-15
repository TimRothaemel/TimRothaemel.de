document.addEventListener("headerLoaded", function () {
  document.getElementById("project-btn")?.classList.add("active-btn"); // Highlight the current page in the header
});

import { marked } from 'marked';

async function loadReadme() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/TimRothaemel/TuningHub/main/README.md');
    const md = await res.text();
    document.querySelector('.readme-content').innerHTML = marked.parse(md);
  } catch (error) {
    console.error('Error loading README:', error);
    document.querySelector('.readme-content').innerHTML = '<p>README konnte nicht geladen werden.</p>';
  }
}

loadReadme();