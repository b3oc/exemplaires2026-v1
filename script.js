document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("scPlayer");
  const toggleBtn = document.getElementById("audioToggle");
  const label = toggleBtn.querySelector("h2");

  let widget = SC.Widget(iframe);
  let isPlaying = false;
  let hasStarted = false;

  // 自动播放逻辑（只有在 widget 准备好之后才能触发）
  widget.bind(SC.Widget.Events.READY, function () {
    widget.play(); // 尝试自动播放

    // 检查是否播放成功
    setTimeout(() => {
      widget.isPaused(function (paused) {
        if (!paused) {
          // 自动播放成功
          isPlaying = true;
          hasStarted = true;
          label.textContent = "Pause";
          label.classList.remove("blinking");
          label.classList.add("static-underline");
        }
      });
    }, 500); // 给 widget 一点时间准备好
  });

  // 第一次真实点击页面播放（仅当没自动播放成功）
  const startMusicOnce = function () {
    if (!hasStarted) {
      widget.play();
      isPlaying = true;
      hasStarted = true;

      label.textContent = "Pause";
      label.classList.remove("blinking");
      label.classList.add("static-underline");
    }
  };
  document.addEventListener("click", startMusicOnce, { once: true });

  // 手动点击播放/暂停
  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // 避免触发首次播放
    if (!widget) return;

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
