document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("audioToggle");
  const label = toggleBtn.querySelector("h2");

  let isPlaying = false;
  let hasStarted = false;

  // 用户首次交互（点击或滚动）播放
  const tryStartMusic = function () {
    if (!hasStarted) {
      audio.play().then(() => {
        isPlaying = true;
        hasStarted = true;
        label.textContent = "Pause";
        label.classList.remove("blinking");
        label.classList.add("static-underline");

        // 移除 scroll 监听，防止重复触发
        document.removeEventListener("scroll", tryStartMusic);
      }).catch(err => {
        console.warn("Autoplay blocked by browser:", err);
      });
    }
  };

  // 用户首次交互（点击 / 滚动 / 触摸 / 按键）触发播放
  document.addEventListener("click", tryStartMusic, { once: true });
  document.addEventListener("scroll", tryStartMusic);
  document.addEventListener("touchstart", tryStartMusic, { once: true });
  document.addEventListener("keydown", tryStartMusic, { once: true }); 

  // 播放按钮控制
  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // 避免触发首次播放逻辑

    if (!isPlaying) {
      audio.play().then(() => {
        label.textContent = "Pause";
        label.classList.remove("blinking");
        label.classList.add("static-underline");
        isPlaying = true;
        hasStarted = true;
      }).catch(err => {
        console.warn("Play failed:", err);
      });
    } else {
      audio.pause();
      label.textContent = "Play";
      label.classList.remove("static-underline");
      label.classList.add("blinking");
      isPlaying = false;
    }
  });
});