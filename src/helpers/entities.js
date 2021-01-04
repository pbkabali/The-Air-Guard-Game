class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
  }
}

export class StrayPlane extends Entity {
  constructor(scene, x, y, key, minSpeed, maxSpeed) {
    super(scene, x, y, key);
    this.body.velocity.x = -Phaser.Math.Between(minSpeed, maxSpeed);
  }

  explode() {
    this.scene.strayPlanes.remove(this);
    this.scene.score += 1;
    this.setTexture("sprExplosion");
    this.body.setVelocity(-150, 0);
    this.setScale(1);
    this.play("sprExplosion");
    this.scene.sfx.explosion.play();
    this.on(
      "animationcomplete",
      function () {
        this.destroy();
      },
      this
    );
  }
}

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
      function () {
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

export class Missile extends Entity {
  constructor(scene, x, y, key, velocityX, velocityY) {
    super(scene, x, y, key);
    this.body.velocity.x = velocityX;
    this.body.velocity.y = velocityY;
  }
}

export default Player;
