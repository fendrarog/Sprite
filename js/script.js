let canvas = document.getElementById("canvas");

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

let arab = new Image();
arab.src = "./img/arab-sprite.png";

document.addEventListener("keydown", setDirection);

let dir = 10;

function setDirection(e) {
  if (e.keyCode === 87) {
    dir = 8;
    console.log(dir);
  }
  if (e.keyCode === 68) {
    dir = 11;
    console.log(dir);
  }
  if (e.keyCode === 83) {
    dir = 10;
    console.log(dir);
  }
  if (e.keyCode === 65) {
    dir = 9;
    console.log(dir);
  }
}

class Character {
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

arab.onload = () => {
  const arabCharacter = new Character({
    ctx: canvas.getContext("2d"),
    image: arab,
    width: 832,
    height: 1344,
    ticksPerFrame: 4,
    numberOfFrames: 9,
    numberOfSprites: dir,
  });
};
