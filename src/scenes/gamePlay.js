import bg from "../assets/full-bg.png";
import airplane from "../assets/airplane.png";
import launcher from "../assets/launcher.png";
import missile1 from "../assets/Missile04N.png";
import sprExplosion from "../assets/sprExplosion.png";
import applyFrustumCulling from "../helpers/frustumCulling";
import Player, { StrayPlane } from "../helpers/entities";

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlay" });
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
  }

  create() {
    const exp = this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0,
    });

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
          200,
          500
        );
        strayPlane.setScale(Phaser.Math.Between(5, 20) * 0.05);
        this.strayPlanes.add(strayPlane);
      },
      callbackScope: this,
      loop: true,
    });

    this.player = new Player(
      this,
      this.game.config.width / 2.5,
      this.game.config.height * 0.9,
      "rocketLauncher"
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
