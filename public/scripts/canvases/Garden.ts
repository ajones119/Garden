import { CanvasSprite } from "../../models/CanvasObject/CanvasSprite";
import Lumberjack from "../../assets/Woodcutter_run.png";

export function initGarden(canvas: HTMLCanvasElement) {
  canvas.width = screen.width;
  canvas.height = screen.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const jack = new CanvasSprite(200, 200, Lumberjack.src, 38, 38, 0.8, 6);

  let x = 0;
  let y = 200;
  let speed = 1;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "#5BA377";
    ctx.rect(100, 100, 100, 100);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#5BA377";
    ctx.fill();

    x += speed;
    if (x > canvas.width) x = -40;

    requestAnimationFrame(draw);
  };

  draw();
}

export default () => {
  const canvas = document.getElementById("garden-canvas");
  if (canvas instanceof HTMLCanvasElement) {
    console.log("FOUND CANVAS");
    initGarden(canvas);
  }
};
