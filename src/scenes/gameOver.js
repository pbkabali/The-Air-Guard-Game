import Phaser from "phaser";
import bg from "../assets/full-bg.png";
import getScores, { postScore } from "../helpers/apiCalls";

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
    this.gameID = "bXHIzTBstNE7F6Arp2tl";
    this.baseURL =
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api";
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

    this.add
      .text(
        this.game.config.width * 0.5,
        this.game.config.height * 0.15,
        "Game Over",
        {
          fontFamily: "monospace",
          fontSize: 40,
          fontStyle: "bold",
          color: "red",
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        this.game.config.width * 0.5,
        this.game.config.height * 0.2,
        `Your Score: ${this.score}`,
        {
          fontFamily: "monospace",
          fontSize: 30,
          fontStyle: "bold",
          color: "#000",
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.27,
      "Top Scores",
      {
        fontFamily: "monospace",
        fontSize: 36,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    const topScoresLoader = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.4,
      "Fetching...",
      {
        fontFamily: "monospace",
        fontSize: 24,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    getScores(this.baseURL, this.gameID).then((response) => {
      const scores = response.result;
      const currentScore = {
        user: localStorage.getItem("playerName"),
        score: this.score,
      };
      scores.push(currentScore);
      if (currentScore.user !== "Guest") {
        postScore(currentScore, this.baseURL, this.gameID);
      }
      const sortedScores = scores.sort((a, b) => (a.score >= b.score ? -1 : 1));
      const topScores =
        sortedScores.length > 5 ? sortedScores.slice(0, 5) : sortedScores;
      let verticlePosition = 0.35;
      let position = 1;
      topScoresLoader.setText("");
      topScores.forEach((obj) => {
        this.add.text(
          this.game.config.width * 0.5,
          this.game.config.height * verticlePosition,
          `${position}. ${obj.user} ${obj.score}`,
          {
            fontFamily: "monospace",
            fontSize: 24,
            fontStyle: "bold",
            color: obj.user === currentScore.user ? "red" : "#000",
            align: "center",
          }
        );
        verticlePosition += 0.05;
        position += 1;
      });
    });

    this.restart = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.65,
      "< PLAY AGAIN >",
      {
        fontFamily: "monospace",
        fontSize: 30,
        fontStyle: "bold",
        color: "red",
        align: "center",
      }
    );

    this.restart.setOrigin(0.5);

    this.restart.setInteractive();

    this.restart.on(
      "pointerup",
      () => {
        this.scene.start("GamePlay");
      },
      this
    );
  }
}

export default GameOver;
