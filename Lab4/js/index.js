const toggleButton = document.getElementById("theme-change");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});