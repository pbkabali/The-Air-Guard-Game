import bg from "../assets/full-bg.png";

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
      this.game.config.height * 0.3,
      "Top Scores",
      {
        fontFamily: "monospace",
        fontSize: 36,
        fontStyle: "bold",
        color: "#000",
        align: "center",
      }
    );

    const postScore = (score) => {
      fetch(`${this.baseURL}/games/${this.gameID}/scores/`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(score),
      }).then(console.log("Posted"));
    };

    (() => {
      fetch(`${this.baseURL}/games/${this.gameID}/scores/`, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((response) => {
          const scores = response.result;
          const currentScore = {
            user: localStorage.getItem("playerName"),
            score: this.score,
          };
          if (currentScore.user !== "Guest") {
            scores.push(currentScore);
            postScore(currentScore);
          }
          const sortedScores = scores.sort((a, b) =>
            a.score >= b.score ? -1 : 1
          );
          const topScores =
            sortedScores.length > 5 ? sortedScores.slice(0, 5) : sortedScores;
          let verticlePosition = 0.4;
          let position = 1;
          topScores.forEach((obj) => {
            this.add.text(
              this.game.config.width * 0.5,
              this.game.config.height * verticlePosition,
              `${position}. ${obj.user} ${obj.score}`,
              {
                fontFamily: "monospace",
                fontSize: 24,
                fontStyle: "bold",
                color: "#000",
                align: "center",
              }
            );
            verticlePosition += 0.05;
            position += 1;
          });
        });
    })();
  }
}

export default GameOver;
