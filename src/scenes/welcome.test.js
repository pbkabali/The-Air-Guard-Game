import Phaser from "phaser";
import Welcome from "./welcome";

describe("Welcome scene", () => {
  const scene = new Welcome();
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
