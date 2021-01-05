import Phaser from "phaser";
import MainMenu from "./mainMenu";

describe("Main Menu scene", () => {
  const scene = new MainMenu();
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
