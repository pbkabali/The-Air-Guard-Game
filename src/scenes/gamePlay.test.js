import Phaser from 'phaser';
import GamePlay from './gamePlay';

describe('Game Play scene', () => {
  const scene = new GamePlay();
  test('inherits from Phaser class', () => {
    expect(scene instanceof Phaser.Scene).toBeTruthy();
  });

  test('has preload method', () => {
    expect(typeof scene.preload).toBe('function');
  });

  test('has create method', () => {
    expect(typeof scene.create).toBe('function');
  });

  test('has create method', () => {
    expect(typeof scene.update).toBe('function');
  });
});
