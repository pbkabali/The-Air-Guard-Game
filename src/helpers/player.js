import Entity from "./entitity";
import Missile from "./missile";

class Player extends Entity {
  constructor(scene, x, y, key, rounds) {
    super(scene, x, y, key);
    this.rounds = rounds;
    this.setData("speed", 200);
    this.setData("rounds", rounds);
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 50);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
  }

  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  explode() {
    this.setTexture("sprExplosion");
    this.setScale(2);
    this.play("sprExplosion");
    this.scene.sfx.explosion.play();
    this.on(
      "animationcomplete",
      () => {
        this.scene.scene.start("GameOver", { score: this.scene.score });
        this.scene.score = 0;
      },
      this
    );
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("rounds") === this.rounds) {
      this.scene.reloadMsg.setText("");
    }

    if (this.getData("rounds") > 0) {
      if (this.getData("isShooting")) {
        if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
          this.setData("timerShootTick", this.getData("timerShootTick") + 1);
        } else {
          const missile = new Missile(
            this.scene,
            this.x,
            this.y,
            "playerMissile",
            0,
            -300
          );
          missile.setScale(0.05);
          this.scene.playerMissiles.add(missile);

          this.scene.sfx.laser.play();
          this.setData("timerShootTick", 0);
          this.setData("rounds", this.getData("rounds") - 1);
        }
      }
    } else {
      this.scene.reloadMsg.setText("RELOADING ROUNDS...");
      setTimeout(() => {
        this.setData("rounds", this.rounds);
      }, 3 * 1000);
    }
  }
}

export default Player;
