document.addEventListener("headerLoaded", function () {
  document.getElementById("project-btn")?.classList.add("active-btn"); // Highlight the current page in the header
});
// readme.js
import { marked } from 'marked';
// oder wenn du marked per npm hast: import { marked } from 'marked';

async function loadReadme() {
  const res = await fetch('./README.md');
  const md = await res.text();
  document.getElementById('readme-content').innerHTML = marked.parse(md);
}

loadReadme();