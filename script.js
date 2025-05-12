document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("audioToggle");

  toggleBtn.addEventListener("click", function () {
    const label = toggleBtn.querySelector("h2");

    if (audio.paused) {
      audio.play();
      label.textContent = "Pause";
    } else {
      audio.pause();
      label.textContent = "Play";
    }
  });
});