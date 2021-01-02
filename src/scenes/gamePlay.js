import bg from "../assets/full-bg.png";
import airplane from "../assets/airplane.png";
import launcher from "../assets/launcher.png";
import missile1 from "../assets/Missile04N.png";
import sprExplosion from "../assets/sprExplosion.png";
import sndExplode from "../assets/sndExplode.wav";
import sndMissile from "../assets/sndMissile.wav";
import applyFrustumCulling from "../helpers/frustumCulling";
import Player, { StrayPlane } from "../helpers/entities";

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlay" });
    this.score = 0;
  }

  preload() {
    this.load.spritesheet("sprExplosion", sprExplosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("bg", bg);
    this.load.image("airplane", airplane);
    this.load.image("rocketLauncher", launcher);
    this.load.image("playerMissile", missile1);
    this.load.audio("sndExplode", sndExplode);
    this.load.audio("sndMissile", sndMissile);
  }

  create() {
    const exp = this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0,
    });

    this.sfx = {
      explosion: this.sound.add("sndExplode"),
      laser: this.sound.add("sndMissile"),
    };

    const bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "bg"
    );
    bg.setScale(0.5);

    this.strayPlanes = this.add.group();
    this.playerMissiles = this.add.group();

    this.time.addEvent({
      delay: 500,
      callback: function () {
        const strayPlane = new StrayPlane(
          this,
          this.game.config.width,
          Phaser.Math.Between(
            this.game.config.height / 15,
            this.game.config.height / 4
          ),
          "airplane",
          400,
          700
        );
        strayPlane.setScale(Phaser.Math.Between(5, 10) * 0.05);
        this.strayPlanes.add(strayPlane);
      },
      callbackScope: this,
      loop: true,
    });

    this.player = new Player(
      this,
      this.game.config.width / 2.5,
      this.game.config.height * 0.9,
      "rocketLauncher",
      20
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(
      this.playerMissiles,
      this.strayPlanes,
      function (missile, plane) {
        if (plane) {
          plane.explode();
          missile.destroy();
        }
      }
    );

    this.reloadMsg = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      "",
      {
        fontFamily: "monospace",
        fontSize: 30,
        fontStyle: "bold",
        color: "red",
        align: "center",
      }
    );

    this.reloadMsg.setOrigin(0.5);

    setTimeout(() => {
      this.scene.start("GameOver", { score: this.score });
    }, 30 * 1000);
  }

  update() {
    this.player.update();
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    }
    if (this.cursors.up.isDown) {
      this.player.setData("isShooting", true);
    } else {
      this.player.setData(
        "timerShootTick",
        this.player.getData("timerShootDelay") - 1
      );
      this.player.setData("isShooting", false);
    }
    applyFrustumCulling(this, this.playerMissiles.getChildren());
    applyFrustumCulling(this, this.strayPlanes.getChildren());
  }
}

export default GamePlay;
