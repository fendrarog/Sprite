export class Player extends Character {
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
    }
  
    setDirection(e) {
      if (e.keyCode === 87) {
        this.numberOfSprites = 8;
        console.log(this.numberOfSprites);
      }
      if (e.keyCode === 68) {
        this.numberOfSprites = 11;
        console.log(this.numberOfSprites);
      }
      if (e.keyCode === 83) {
        this.numberOfSprites = 10;
        console.log(this.numberOfSprites);
      }
      if (e.keyCode === 65) {
        this.numberOfSprites = 9;
        console.log(this.numberOfSprites);
      }
    }
  
    // принимает tic-и
    play(ticksPerFrame, canvasWidth, canvasHeight) {
      const loop = () => {
        this.update(ticksPerFrame);
        this.walk();
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
  
    walk() {
      switch (this.numberOfSprites) {
        case 8:
          this.y--;
          break;
        case 9:
          this.x--;
          break;
        case 10:
          this.y++;
          break;
        case 11:
          this.x++;
          break;
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