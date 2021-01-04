/* eslint-disable no-unused-vars */

import Phaser from 'phaser';
import MainMenu from './scenes/mainMenu';
import GamePlay from './scenes/gamePlay';
import GameOver from './scenes/gameOver';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [MainMenu, GamePlay, GameOver],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);

/* eslint-enable no-unused-vars */
