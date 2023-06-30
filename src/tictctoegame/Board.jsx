import React, { useState } from "react";
import Square from "./Square";
import winSound from "../audio/mixkit-animated-small-group-applause-523.wav";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const winAudio = new Audio(winSound);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        winAudio.play();
        return state[a];
      }
    }

    // Check for a draw
    if (state.every((value) => value !== null)) {
      return "draw";
    }

    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (state[index] !== null) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setScoreX(0); // Reset the score for X
    setScoreO(0); // Reset the score for O
    winAudio.pause();
    winAudio.currentTime = 0;
  };

  return (
    <div className="board-container">
      {isWinner && isWinner !== "draw" ? (
        <>
          <span className="winner-text">{isWinner} WON THE GAME</span>{" "}
          <button onClick={handleReset} className="play-again-button">
            Play Again
          </button>
          <h4 className="score-label">Score:</h4>
          <div className="score">
            <span>X:</span> {isWinner === "X" ? scoreX + 1 : scoreX}
          </div>
          <div className="score">
            <span>O:</span> {isWinner === "O" ? scoreO + 1 : scoreO}
          </div>
        </>
      ) : isWinner === "draw" ? (
        <>
          It's a Draw
          <button onClick={handleReset} className="play-again-button">
            Play Again
          </button>
        </>
      ) : (
        <>
          <h4 className="hello">PLAYER {isXTurn ? "X" : "O"} PLEASE MOVE</h4>
          <div className="board-row">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
