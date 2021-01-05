import Phaser from "phaser";
import GameOver from "./gameOver";

describe("Game Over scene", () => {
  const scene = new GameOver();
  test("inherits from Phaser class", () => {
    expect(scene instanceof Phaser.Scene).toBeTruthy();
  });

  test("has preload method", () => {
    expect(typeof scene.preload).toBe("function");
  });

  test("has create method", () => {
    expect(typeof scene.create).toBe("function");
  });

  test("has create method", () => {
    expect(typeof scene.update).toBe("function");
  });
});
