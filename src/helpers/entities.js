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
    this.destroy();
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.setData("speed", 160);
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

  stayStill() {
    this.body.velocity.x = 0;
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1);
      } else {
        const missile = new PlayerMissile(
          this.scene,
          this.x,
          this.y,
          "playerMissile"
        );
        missile.setScale(0.05);
        this.scene.playerMissiles.add(missile);

        // this.scene.sfx.laser.play();
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerMissile extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.body.velocity.y = -500;
  }
}

export default Player;
