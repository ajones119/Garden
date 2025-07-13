import { CanvasObject } from "./CanvasObject";

export class CanvasSprite extends CanvasObject {
  lastDrawTime: number = 0;
  image: HTMLImageElement | null = null;
  frameWidth = 0;
  frameHeight = 0;
  fps = 12;
  currentFrame = 0;
  totalFrames = 1;
  isPlaying = false;

  constructor(
    x: number,
    y: number,
    imageUrl: string,
    frameWidth: number,
    frameHeight: number,
    fps: number,
    totalFrames: number,
  ) {
    super(x, y);
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.fps = fps;
    this.totalFrames = totalFrames;

    const newImage = new Image();
    newImage.src = imageUrl;

    this.image = newImage;
  }

  update() {
    const frameDuration = this.fps / 1000;
    const currentTime = Date.now();

    if (this.isPlaying && currentTime - this.lastDrawTime >= frameDuration) {
      this.currentFrame++;
      if (this.currentFrame >= this.totalFrames) {
        this.currentFrame = 0;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.clearRect(this.x, this.y, this.frameWidth, this.frameHeight);
      ctx.drawImage(
        this.image,
        this.currentFrame * this.frameWidth,
        0,
        this.frameWidth,
        this.frameHeight,
        100,
        100,
        this.frameWidth,
        this.frameHeight,
      );
    }
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  stop() {
    this.isPlaying = false;
    this.currentFrame = 0;
  }
}
