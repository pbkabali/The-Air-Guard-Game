export const postScore = (score, baseURL, gameID) => {
  fetch(`${baseURL}/games/${gameID}/scores/`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(score),
  });
};

const getScores = (baseURL, gameID) => {
  return fetch(`${baseURL}/games/${gameID}/scores/`, {
    mode: "cors",
  }).then((response) => response.json());
};

export default getScores;
