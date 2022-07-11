import { Character } from "./character.js";

let canvas = document.getElementById("canvas");

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

const swordSwipe = new Audio();
swordSwipe.src = "./audio/sword-swipe.mp3";
const armorWalk = new Audio();
armorWalk.src = "./audio/armor-walking.mp3";

const arab = new Image();
arab.src = "./img/dark-knight.png";

class Game {
  constructor(options) {
    this.$canvas = document.getElementById("canvas");
    this.$canvas.width = options.width || 720;
    this.$canvas.height = options.height || 720;

    this.player = options.player;

    // привязка клавиш WASD
    /* const setDirectionBinded = arabCharacter.setDirection.bind(arabCharacter); */

    const keyDownListenerBinded =
      arabCharacter.keyDownListener.bind(arabCharacter);
    const keyUpListenerBinded = arabCharacter.keyUpListener.bind(arabCharacter);

    // тики хуики
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;

    document.addEventListener("keydown", keyDownListenerBinded);

    document.addEventListener("keyup", keyUpListenerBinded);
  }

  start() {
    this.player.play(
      this.ticksPerFrame,
      this.$canvas.width,
      this.$canvas.height
    );
  }
}

const arabCharacter = new Character({
  ctx: canvas.getContext("2d"),
  image: arab,
  audio: { swordSwipe, armorWalk },
  width: 832,
  height: 1344,
  numberOfFrames: 9,
  numberOfSprites: 10,
});

arab.onload = () => {
  const game = new Game({
    player: arabCharacter,
    ticksPerFrame: 8,
  });

  game.start();
};

//const setDirectionBinded = arabCharacter.setDirection.bind(arabCharacter);

//document.addEventListener("keydown", setDirectionBinded);
