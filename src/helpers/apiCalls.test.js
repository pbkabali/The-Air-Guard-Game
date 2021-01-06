import getScores, { postScore } from './apiCalls';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ result: { user: 'Jane', score: 12 } }),
}));
const URL = 'www.xxx.nm';
const ID = '1234';
const score = {
  user: 'Doe',
  score: 25,
};

describe('getScores', () => {
  it('makes a fetch API call', () => {
    expect(getScores(URL, ID) instanceof Promise).toBeTruthy();
  });
});

describe('postScore', () => {
  it('makes a fetch API call', () => {
    postScore(score, URL, ID);
    expect(fetch).toHaveBeenCalled();
  });
});
