export class Character {
  constructor(options) {
    this.ctx = options.ctx;

    this.image = options.image;
    this.audio = options.audio;
    this.width = options.width;
    this.height = options.height;

    this.frameIndex = 1;
    this.tickCount = 0;

    this.numberOfFrames = options.numberOfFrames || 1;
    this.numberOfSprites = options.numberOfSprites || 0;

    this.x = 340;
    this.y = 180;

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
      if (this.numberOfSprites >= 21) {
        this.renderAttack(canvasWidth, canvasHeight);
      } else {
        this.render(canvasWidth, canvasHeight);
      }

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  update(ticksPerFrame) {
    console.log(this.frameIndex);
    this.tickCount++;
    if (this.tickCount > ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
        console.log(this.frameIndex);
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
        this.numberOfFrames = 9;
        this.audio.armorWalk.play();
        break;
      case keyPress.KeyA:
        this.x--;
        this.numberOfSprites = 9;
        this.numberOfFrames = 9;
        this.audio.armorWalk.play();
        break;
      case keyPress.KeyS:
        this.y++;
        this.numberOfSprites = 10;
        this.numberOfFrames = 9;
        this.audio.armorWalk.play();
        break;
      case keyPress.KeyD:
        this.x++;
        this.numberOfSprites = 11;
        this.numberOfFrames = 9;
        this.audio.armorWalk.play();
        break;
      case keyPress.Space:
        if (this.numberOfSprites === 8) {
          this.numberOfSprites = 21;
          this.numberOfFrames = 6;
        } else if (this.numberOfSprites === 9) {
          this.numberOfSprites = 24;
          this.numberOfFrames = 6;
        } else if (this.numberOfSprites === 10) {
          this.numberOfSprites = 27;
          this.numberOfFrames = 6;
        } else if (this.numberOfSprites === 11) {
          this.numberOfSprites = 30;
          this.numberOfFrames = 6;
        }
        this.audio.armorWalk.pause();
        this.audio.swordSwipe.play();
        break;
      default:
        this.frameIndex = 0;
        this.audio.armorWalk.pause();
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

  renderAttack(canvasWidth, canvasHeight) {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.drawImage(
      this.image,
      this.frameIndex * 192,
      this.numberOfSprites * 64,
      192,
      192,
      this.x - 64,
      this.y - 64,
      192,
      192
    );
  }
}
