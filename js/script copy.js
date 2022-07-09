let canvas = document.getElementById("canvas");

let coinImage = new Image();
coinImage.src = "./img/arab-sprite.png";

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

coinImage.onload = function () {
  class Sprite {
    constructor(options) {
      this.ctx = options.ctx;

      this.image = options.image;

      this.width = options.width;
      this.height = options.height;

      this.frameIndex = 0;
      this.tickCount = 0;
      this.ticksPerFrame = options.ticksPerFrame || 0;
      this.numberOfFrames = options.numberOfFrames || 1;

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
          this.frameIndex = 0;
        }
      }
    }

    render() {
      this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
      this.ctx.drawImage(
        this.image,
        this.frameIndex * (this.width / this.numberOfFrames),
        130,
        this.width / this.numberOfFrames,
        this.height,
        0,
        0,
        this.width / this.numberOfFrames,
        this.height
      );
    }
  }

  let sprite = new Sprite({
    ctx: canvas.getContext("2d"),
    image: coinImage,
    width: 448,
    height: 60,
    numberOfFrames: 7,
    ticksPerFrame: 10,
  });

  console.log(canvas);
  console.log(sprite);
};
