import Entity from "./entitity";

class Missile extends Entity {
  constructor(scene, x, y, key, velocityX, velocityY) {
    super(scene, x, y, key);
    this.body.velocity.x = velocityX;
    this.body.velocity.y = velocityY;
  }
}

export default Missile;
