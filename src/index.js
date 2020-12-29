import MainMenu from "./scenes/mainMenu";
import GamePlay from "./scenes/gamePlay";
import GameOver from "./scenes/gameOver";

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [MainMenu, GamePlay, GameOver],
  pixelArt: true,
  roundPixels: true,
};

var game = new Phaser.Game(config);
