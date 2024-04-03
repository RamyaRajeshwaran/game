import React from 'react';

function GameSetup({ gameState, setGameState, startGame }) {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Player 1 Name" 
        value={gameState.player1} 
        onChange={e => setGameState({...gameState, player1: e.target.value})} 
      />
      <input 
        type="text" 
        placeholder="Player 2 Name" 
        value={gameState.player2} 
        onChange={e => setGameState({...gameState, player2: e.target.value})} 
      />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default GameSetup;