import confetti from "canvas-confetti";

export function fireWeddingConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  // Custom palette: antique gold, sage green, forest green, warm rose, ivory
  const colors = ["#B68D4C", "#D4AF37", "#3F4F3D", "#2C3826", "#F3D9DC", "#FAF3E4"];

  // Heart shapes
  const heart = confetti.shapeFromPath({
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  });

  // Single elegant burst from left and right
  confetti({
    particleCount: 25,
    angle: 60,
    spread: 60,
    origin: { x: 0.1, y: 0.8 },
    colors,
    shapes: [heart, "circle"],
    scalar: 1.2,
    ticks: 150,
  });

  confetti({
    particleCount: 25,
    angle: 120,
    spread: 60,
    origin: { x: 0.9, y: 0.8 },
    colors,
    shapes: [heart, "circle"],
    scalar: 1.2,
    ticks: 150,
  });

  // A light sprinkle from the top center slightly delayed
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 90,
      spread: 90,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes: [heart, "circle"],
      scalar: 1.0,
      ticks: 200,
      gravity: 0.8,
    });
  }, 250);
}
