document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("scPlayer");
  const widget = SC.Widget(iframe);
  const toggleBtn = document.getElementById("audioToggle");
  const label = toggleBtn.querySelector("h2");

  let isPlaying = false;

  toggleBtn.addEventListener("click", function () {
    if (!isPlaying) {
      widget.play();
      label.textContent = "Pause";
      label.classList.remove("blinking");
      label.classList.add("static-underline");
    } else {
      widget.pause();
      label.textContent = "Play";
      label.classList.remove("static-underline");
      label.classList.add("blinking");
    }
    isPlaying = !isPlaying;
  });
});