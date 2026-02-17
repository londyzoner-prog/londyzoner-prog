const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

function fitCanvas() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

fitCanvas();
window.addEventListener("resize", fitCanvas);

let t = 0;

function draw() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  t += 0.02;

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "rgba(4, 17, 24, 0.9)");
  bg.addColorStop(1, "rgba(9, 37, 42, 0.94)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const mid = h * 0.58;
  const bars = Math.max(40, Math.floor(w / 12));
  const barWidth = w / bars;

  for (let i = 0; i < bars; i += 1) {
    const x = i * barWidth;
    const pulse =
      Math.sin(i * 0.22 + t * 2.1) * 0.4 +
      Math.sin(i * 0.09 - t * 3.2) * 0.3 +
      Math.sin(i * 0.6 + t * 1.2) * 0.2;
    const amp = Math.max(0.04, 0.1 + Math.abs(pulse));
    const barH = amp * h * (0.22 + (i % 7) * 0.02);

    const grad = ctx.createLinearGradient(0, mid - barH, 0, mid + barH);
    grad.addColorStop(0, "rgba(247, 185, 85, 0.9)");
    grad.addColorStop(0.45, "rgba(98, 242, 190, 0.82)");
    grad.addColorStop(1, "rgba(79, 201, 240, 0.25)");
    ctx.fillStyle = grad;

    ctx.fillRect(x + 1, mid - barH, Math.max(2, barWidth - 2), barH * 2);
  }

  ctx.lineWidth = 2;
  for (let r = 1; r <= 4; r += 1) {
    const radius = 40 + r * 38 + Math.sin(t * 2 + r) * 8;
    const alpha = 0.16 - r * 0.02;
    ctx.strokeStyle = `rgba(98, 242, 190, ${alpha})`;
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.52, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(247, 185, 85, 0.95)";
  ctx.font = "700 14px Manrope";
  ctx.fillText("ZONERS SUPPORTING ZONERS", 18, 28);

  requestAnimationFrame(draw);
}

draw();
