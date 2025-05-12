document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  const gradientStops = [
    '#765BA7 14%',
    '#FF1C26 35%',
    '#FF7AAB 67%',
    '#FFF875 89%'
  ];

  const angles = [0, 90, 180, 270];
  const angle = angles[Math.floor(Math.random() * angles.length)];

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