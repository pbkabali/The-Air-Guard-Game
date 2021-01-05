import Phaser from "phaser";
import "./css/styles.css";
import Welcome from "./scenes/welcome";
import MainMenu from "./scenes/mainMenu";
import GamePlay from "./scenes/gamePlay";
import GameOver from "./scenes/gameOver";

const config = {
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
  scene: [Welcome, MainMenu, GamePlay, GameOver],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);

export default game;
