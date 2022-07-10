let canvas = document.getElementById("canvas");

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

let arab = new Image();
arab.src = "./img/yasha.png";

// function setDirection(e) {
//   if (e.keyCode === 87) {
//     dir = 8;
//     console.log(dir);
//   }
//   if (e.keyCode === 68) {
//     dir = 11;
//     console.log(dir);
//   }
//   if (e.keyCode === 83) {
//     dir = 10;
//     console.log(dir);
//   }
//   if (e.keyCode === 65) {
//     dir = 9;
//     console.log(dir);
//   }
// }

class Game {
  constructor(options) {
    this.$canvas = document.getElementById("canvas");
    this.$canvas.width = options.width || 720;
    this.$canvas.height = options.height || 720;

    this.player = options.player;

    // привязка клавиш WASD
    const setDirectionBinded = arabCharacter.setDirection.bind(arabCharacter);

    // тики хуики
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;

    document.addEventListener("keydown", setDirectionBinded);
  }

  start() {
    this.player.play(
      this.ticksPerFrame,
      this.$canvas.width,
      this.$canvas.height
    );
  }
}

const numberOfFrames = 9;

class Character {
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
      if (this.frameIndex < numberOfFrames - 1) {
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

const arabCharacter = new Character({
  ctx: canvas.getContext("2d"),
  image: arab,
  width: 832,
  height: 1344,
  numberOfFrames: 9,
  numberOfSprites: 10,
});

arab.onload = () => {
  const game = new Game({
    player: arabCharacter,
    ticksPerFrame: 10,
  });

  game.start();
};

//const setDirectionBinded = arabCharacter.setDirection.bind(arabCharacter);

//document.addEventListener("keydown", setDirectionBinded);
