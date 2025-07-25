type ImageLayerProps = {
    imgMeta: ImageMetadata;
    parallaxStrength?: number;
    scale?: number;
    amplitude?: number
    swaySpeed?: number

};

export class ImageLayer {
    x: number = 0;
    y: number = 0;
    parXOffset = 0;
    parYOffset = 0;
    imgMeta: ImageMetadata;
    img: HTMLImageElement;
    width: number = 0;
    height: number = 0;
    parallaxStrength: number;
    scale: number;
    amplitude: number;
    swaySpeed: number;

  constructor(props: ImageLayerProps) {
    const {
        imgMeta,
        parallaxStrength = 0.01,
        scale = 1,
        amplitude = 0,
        swaySpeed = 0
    } = props;
    this.imgMeta = imgMeta;
    this.parallaxStrength = parallaxStrength;

    this.img = new Image();
    this.img.src = imgMeta.src;
    this.scale = scale;
    this.amplitude = amplitude;
    this.swaySpeed = swaySpeed;
  }

    setupImage(canvas: HTMLCanvasElement) {
        return new Promise<void>((resolve, reject) => {
            this.img.onload = () => {
            const {img, scale} = this;
                const aspectRatio = img.width / img.height;
                const maxWidth = (canvas.parentElement?.clientWidth || window.innerWidth) - 24;
                const maxHeight = (canvas.parentElement?.clientHeight || window.innerHeight) - 24;

                if (img.width > maxWidth || img.height > maxHeight) {
                    if (img.width > img.height) {
                        img.width = maxWidth;
                        img.height = maxWidth / aspectRatio;
                    } else {
                        img.height = maxHeight;
                        img.width = maxHeight * aspectRatio;
                    }
                }
                this.width = img.width * scale;
                this.height = img.height * scale;
                console.log("img width", img.width, "img height", img.height);

                this.x = (maxWidth - this.width) / 2;
                this.y = (maxHeight - this.height) / 2;
                resolve();
            };
            this.img.onerror = (err) => {
                reject(err);
            };
        });
    }

    getSwayOffset() {
        const time = performance.now();

        const xOffset = Math.sin(time * this.swaySpeed) * this.amplitude;
        const yOffset = Math.cos(time * this.swaySpeed) * this.amplitude;

        return [xOffset, yOffset];
    }


    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        
        const {img, x, y, parXOffset, parYOffset, width, height} = this;
        const [swayX] = this.getSwayOffset();
        const drawX = this.x + this.parXOffset + swayX;
        const drawY = this.y + this.parYOffset;
        ctx.drawImage(img, drawX, drawY, width, height);
        ctx.save();
        ctx.fillStyle = "black"
        // Top
        ctx.fillRect(drawX - 60, drawY - 60, this.width + 120, 60);

        // Bottom
        ctx.fillRect(drawX - 60, drawY + this.height, this.width + 120, 60);

        // Left
        ctx.fillRect(drawX - 60, drawY, 60, this.height);

        // Right
    ctx.fillRect(drawX + this.width, drawY, 60, this.height);
        ctx.restore();
        
    }

    update(time = 0, pos?: { xPos: number; yPos: number }) {
        if (pos) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            this.parXOffset = (pos.xPos - centerX) * this.parallaxStrength;
            this.parYOffset = (pos.yPos - centerY) * this.parallaxStrength;
        }
    }
}