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

    this.title = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.2,
      "THE AIR GUARD",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    this.title.setOrigin(0.5);

    const player = prompt("Please enter your name", "Guest");

    if (
      player === null ||
      player.toLowerCase === "name" ||
      player.trim() === ""
    ) {
      localStorage.setItem("playerName", "Guest");
    } else {
      localStorage.setItem("playerName", player);
    }

    this.playerName = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.3,
      `Hi ${localStorage.getItem("playerName")}`,
      {
        fontFamily: "monospace",
        fontSize: 24,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    this.playerName.setOrigin(0.5);

    this.intro = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.4,
      `Shoot down as many stray planes as you can to protect our airspace.
      Use the left and right arrow-keys to move the player and the up arrow-key to shoot missiles`,
      {
        fontFamily: "monospace",
        fontSize: 16,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    this.intro.setOrigin(0.5);

    this.start = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      "START GAME >",
      {
        fontFamily: "monospace",
        fontSize: 30,
        fontStyle: "bold",
        color: "red",
        align: "center",
      }
    );

    this.start.setOrigin(0.5);

    this.start.setInteractive();

    this.start.on(
      "pointerup",
      function () {
        this.scene.start("GamePlay");
      },
      this
    );
  }
}

export default MainMenu;
