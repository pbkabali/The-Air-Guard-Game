import Entity from "./entitity";

class StrayPlane extends Entity {
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
      () => {
        this.destroy();
      },
      this
    );
  }
}

export default StrayPlane;
