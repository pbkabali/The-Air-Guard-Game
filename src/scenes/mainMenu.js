import bg from "../assets/full-bg.png";

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.image("bg", bg);
  }

  create() {
    const bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "bg"
    );

    bg.setScale(0.5);

    this.scene.start("GamePlay");
  }
}

export default MainMenu;
