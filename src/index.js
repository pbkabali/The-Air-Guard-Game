import MainMenu from "./scenes/mainMenu";
import GamePlay from "./scenes/gamePlay";
import GameOver from "./scenes/gameOver";

var config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
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
