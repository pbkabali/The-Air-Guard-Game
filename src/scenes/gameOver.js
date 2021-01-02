import bg from "../assets/full-bg.png";

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  init(data) {
    this.score = data.score;
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

    this.displayScore = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.3,
      `Your Score: ${this.score}`,
      {
        fontFamily: "monospace",
        fontSize: 30,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    this.displayScore.setOrigin(0.5);
  }
}

export default GameOver;
