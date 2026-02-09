console.log("write-animation.js loaded");

// Array mit Wörtern, die animiert werden sollen
const words = ["JavaScript", "CSS", "HTML", "Supabase", "React"];

let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function animateWords() {
  const container = document.getElementById("animation-container");
  const currentWord = words[currentWordIndex];

  if (isDeleting) {
    // Zeichen löschen
    container.innerHTML = currentWord.substring(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(animateWords, 300);
      return;
    }
  } else {
    // Zeichen hinzufügen
    container.innerHTML = currentWord.substring(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(animateWords, 1500);
      return;
    }
  }

  const speed = isDeleting ? 75 : 120;
  setTimeout(animateWords, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  animateWords();
});
