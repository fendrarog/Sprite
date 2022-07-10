export class Character {
  constructor(options) {
    this.ctx = options.ctx;

    this.image = options.image;
    this.width = options.width;
    this.height = options.height;

    this.frameIndex = 1;
    this.tickCount = 0;

    this.numberOfFrames = options.numberOfFrames || 1;
    this.numberOfSprites = options.numberOfSprites || 0;

    this.x = 0;
    this.y = 0;

    this.keyPress = {};
  }

  keyDownListener(e) {
    this.keyPress[e.code] = true;
    console.log(this.keyPress);
  }

  keyUpListener(e) {
    this.keyPress[e.code] = false;
    console.log(this.keyPress);
  }

  // принимает tic-и
  play(ticksPerFrame, canvasWidth, canvasHeight) {
    const loop = () => {
      this.update(ticksPerFrame);
      this.walk(this.keyPress);
      this.render(canvasWidth, canvasHeight);

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  update(ticksPerFrame) {
    this.tickCount++;
    if (this.tickCount > ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 1;
      }
    }
  }

  walk(keyPress) {
    switch (true) {
      case keyPress.KeyW:
        this.y--;
        this.numberOfSprites = 8;
        break;
      case keyPress.KeyA:
        this.x--;
        this.numberOfSprites = 9;
        break;
      case keyPress.KeyS:
        this.y++;
        this.numberOfSprites = 10;
        break;
      case keyPress.KeyD:
        this.x++;
        this.numberOfSprites = 11;
        break;
      default:
        this.frameIndex = 0;
    }
  }

  render(canvasWidth, canvasHeight) {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
