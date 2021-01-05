import Phaser from 'phaser';
import bg from '../assets/full-bg.png';

class Welcome extends Phaser.Scene {
  constructor() {
    super({ key: 'Welcome' });
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    const bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'bg',
    );

    bg.setScale(0.5);

    this.add
      .text(
        this.game.config.width * 0.5,
        this.game.config.height * 0.1,
        'Welcome to',
        {
          fontFamily: 'monospace',
          fontSize: 38,
          fontStyle: 'bold',
          color: '#000',
          align: 'center',
        },
      )
      .setOrigin(0.5);

    this.title = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.2,
      'THE AIR GUARD GAME',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#000',
        align: 'center',
      },
    );

    this.title.setOrigin(0.5);

    this.nameInput = document.getElementById('player-name');
    this.nameInput.classList.toggle('hidden');

    this.intro = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.45,
      'OR Leave it blank to play as GUEST',
      {
        fontFamily: 'monospace',
        fontSize: 16,
        fontStyle: 'bold',
        color: '#000',
        align: 'center',
      },
    );

    this.intro.setOrigin(0.5);

    this.start = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      'ENTER >',
      {
        fontFamily: 'monospace',
        fontSize: 30,
        fontStyle: 'bold',
        color: 'red',
        align: 'center',
      },
    );

    this.start.setOrigin(0.5);

    this.start.setInteractive();

    this.start.on(
      'pointerup',
      () => {
        const player = this.nameInput.value;
        if (
          player === null
          || player.toLowerCase === 'name'
          || player.trim() === ''
        ) {
          localStorage.setItem('playerName', 'Guest');
        } else {
          localStorage.setItem('playerName', player);
        }
        this.nameInput.classList.toggle('hidden');
        this.scene.start('MainMenu');
      },
      this,
    );
  }
}

export default Welcome;
