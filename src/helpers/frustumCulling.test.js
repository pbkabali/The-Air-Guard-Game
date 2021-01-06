import applyFrustumCulling from './frustumCulling';

describe('Frustum culling', () => {
  test('Calls destroy when object is out of display area', () => {
    const action = jest.fn();
    const obj = {
      x: 20,
      y: 35,
      displayWidth: 2,
      displayHeight: 1,
      destroy: action,
    };

    const scene = {
      game: {
        config: {
          width: 4,
          height: 4,
        },
      },
    };
    applyFrustumCulling(scene, [obj]);
    expect(action).toHaveBeenCalled();
  });

  test("Doesn't call destroy when object is not out display area", () => {
    const action = jest.fn();
    const obj = {
      x: 2,
      y: 3,
      displayWidth: 2,
      displayHeight: 1,
      destroy: action,
    };

    const scene = {
      game: {
        config: {
          width: 4,
          height: 4,
        },
      },
    };
    applyFrustumCulling(scene, [obj]);
    expect(action).not.toHaveBeenCalled();
  });
});
