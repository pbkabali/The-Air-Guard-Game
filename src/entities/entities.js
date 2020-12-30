class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("isDead", false);
  }
}

export class StrayPlane extends Entity {
  constructor(scene, x, y, key, minSpeed, maxSpeed) {
    super(scene, x, y, key);
    this.body.velocity.x = -Phaser.Math.Between(minSpeed, maxSpeed);
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.setData("speed", 160);
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
  }
}

export default Player;
