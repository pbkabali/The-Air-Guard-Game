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
