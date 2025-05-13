document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  const gradientStops = [
    '#765BA7 14%',
    '#FF1C26 35%',
    '#FF7AAB 67%',
    '#FFF875 89%'
  ];

  const angles = [0, 90, 180, 270];
  const lastAngle = parseInt(localStorage.getItem("lastGradientAngle"), 10);

  // 过滤掉上一次使用的角度
  const filteredAngles = angles.filter(a => a !== lastAngle);
  const angle = filteredAngles[Math.floor(Math.random() * filteredAngles.length)];

  // 存储本次使用的角度
  localStorage.setItem("lastGradientAngle", angle);
  const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`;
  body.style.background = gradient;
  body.style.backgroundSize = "120% 130%"; // 提大范围以便动画有余地

  // 判断方向
  const useVertical = (
    (angle >= 315 || angle < 45) ||        // 接近 0deg
    (angle >= 135 && angle < 225)          // 接近 180deg
  );

  body.style.animation = useVertical
    ? "gradientShiftVertical 7s ease-in-out infinite"
    : "gradientShiftHorizontal 7s ease-in-out infinite";
});