document.addEventListener("headerLoaded", function () {
  document.getElementById("project-btn")?.classList.add("active-btn"); // Highlight the current page in the header
});

async function loadReadme() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/TimRothaemel/pokeronline/main/README.md');
    const md = await res.text();
    document.getElementById('readme-content').innerHTML = marked.parse(md);
  } catch (error) {
    console.error('Error loading README:', error);
    document.getElementById('readme-content').innerHTML = '<p>README konnte nicht geladen werden.</p>';
  }
}

document.addEventListener("DOMContentLoaded", function() {
loadReadme();
});