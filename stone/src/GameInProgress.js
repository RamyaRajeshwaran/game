import React from 'react';

function GameInProgress({ gameState, handlePlayer1Choice, handlePlayer2Choice, determineWinner }) {
  return (
    <div className="choices">
      <p>{gameState.player1}'s Turn:</p>
      <button onClick={() => handlePlayer1Choice('stone')}>Stone</button>
      <button onClick={() => handlePlayer1Choice('paper')}>Paper</button>
      <button onClick={() => handlePlayer1Choice('scissors')}>Scissors</button>
      <p>{gameState.player2}'s Turn:</p>
      <button onClick={() => handlePlayer2Choice('stone')}>Stone</button>
      <button onClick={() => handlePlayer2Choice('paper')}>Paper</button>
      <button onClick={() => handlePlayer2Choice('scissors')}>Scissors</button>
      <button onClick={determineWinner}>Submit</button>
      <div className="rounds">
        {gameState.rounds.map(round => (
          <div key={round.round} className="round">
            <p>Round {round.round}: {round.player1} vs {round.player2} - Winner: {round.winner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameInProgress;