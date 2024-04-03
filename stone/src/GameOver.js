import React from 'react';

function GameOver({ player1, player2, player1Score, player2Score }) {
  return (
    <div className="scoreboard">
      <h2>Game Over!</h2>
      <h3>Final Scores:</h3>
      <p>{player1}: {player1Score} - {player2}: {player2Score}</p>
    </div>
  );
}

export default GameOver;