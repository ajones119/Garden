export abstract class CanvasObject {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    ((this.x = x), (this.y = y));
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  abstract update(): void;
}
