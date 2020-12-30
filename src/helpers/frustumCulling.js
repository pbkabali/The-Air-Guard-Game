const applyFrustumCulling = (scene, group) => {
  group.forEach((object) => {
    if (
      object.x < -object.displayWidth ||
      object.x > scene.game.config.width + object.displayWidth ||
      object.y < -object.displayHeight * 4 ||
      object.y > scene.game.config.height + object.displayHeight
    ) {
      if (object) {
        object.destroy();
      }
    }
  });
};

export default applyFrustumCulling;
