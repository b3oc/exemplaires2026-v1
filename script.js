
document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("scPlayer");
  const toggleBtn = document.getElementById("audioToggle");
  const label = toggleBtn.querySelector("h2");

  let widget = SC.Widget(iframe);
  let isPlaying = false;
  let hasStarted = false;

  // ✅ 自动播放逻辑（只有在 widget 准备好之后才能触发）
  widget.bind(SC.Widget.Events.READY, function () {
    widget.play();

    // 检查是否成功播放
    setTimeout(() => {
      widget.isPaused(function (paused) {
        if (!paused) {
          isPlaying = true;
          hasStarted = true;
          label.textContent = "Pause";
          label.classList.remove("blinking");
          label.classList.add("static-underline");
        }
      });
    }, 300);
  });

  // ✅ 用户首次交互（点击或滚动）播放
  const tryStartMusic = function () {
    if (!hasStarted) {
      widget.play();
      isPlaying = true;
      hasStarted = true;
      label.textContent = "Pause";
      label.classList.remove("blinking");
      label.classList.add("static-underline");

      // 移除 scroll 监听，防止重复触发
      document.removeEventListener("scroll", tryStartMusic);
    }
  };

  // 用户首次交互（点击 / 滚动 / 触摸 / 按键）触发播放
    document.addEventListener("click", tryStartMusic, { once: true });
    document.addEventListener("scroll", tryStartMusic);
    document.addEventListener("touchstart", tryStartMusic, { once: true });
    document.addEventListener("keydown", tryStartMusic, { once: true }); 


  // ✅ 播放按钮控制
  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // 避免触发首次播放逻辑

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
