console.log("[Header] header-loader.js initialized");

document.addEventListener("DOMContentLoaded", function () {
  let header = document.querySelector(".header");

  if (!header) {
    throwNewError("[Header] Header element not found");
    return;
  }

  fetch("/src/components/header/header.html")
    .then((response) => {
      if (!response.ok) {
        throwNewError(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      header.innerHTML = data;
      document.dispatchEvent(new CustomEvent("headerLoaded"));
      console.log("[Header] Header geladen und Event ausgelöst");
    })
    .catch((error) => {
      throwNewError("Error loading header:", error);
    });
});
