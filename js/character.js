export class Character {
  constructor(options) {
    this.ctx = options.ctx;

    this.image = options.image;
    this.width = options.width;
    this.height = options.height;

    this.frameIndex = 1;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.numberOfSprites = options.numberOfSprites || 0;

    this.x = 0;
    this.y = 0;

    this.start();
  }

  start() {
    const loop = () => {
      this.update();
      this.render();

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  update() {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 1;
      }
      /*         if (this.y === 720 - 64) {
          this.numberOfSprite = 11;
          this.x = this.x + 3;
        }
        if (this.numberOfSprites === 10) {
          this.y = this.y + 3;
        } */
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
    this.ctx.drawImage(
      this.image,
      this.frameIndex * 64,
      this.numberOfSprites * 64,
      64,
      64,
      this.x,
      this.y,
      64,
      64
    );
  }
}
