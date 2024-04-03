// App.js

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import GameSetup from './GameSetup';
import GameInProgress from './GameInProgress';
import GameOver from './GameOver';

function App() {
  const [gameState, setGameState] = useState({
    player1: '',
    player2: '',
    rounds: [],
    gameStarted: false,
    gameOver: false,
    currentRound: 1,
    player1Choice: '',
    player2Choice: '',
    player1Score: 0,
    player2Score: 0,
    gameId: null
  });

  const startGame = async () => {
    if (gameState.player1.trim() === '' || gameState.player2.trim() === '') {
      alert('Please enter names for both players.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/games', { player1: gameState.player1, player2: gameState.player2 });
      const { data } = response;
      setGameState({
        ...gameState,
        gameId: data._id,
        gameStarted: true,
        currentRound: 1,
        rounds: [],
        player1Choice: '',
        player2Choice: '',
        player1Score: 0,
        player2Score: 0,
        gameOver: false
      });
    } catch (error) {
      console.error('Error starting game:', error);
      alert('Failed to start game. Please check your network connection and try again.');
    }
  };

  const handlePlayer1Choice = (choice) => {
    if (gameState.currentRound > 6) {
      alert('Game Over! Please start a new game.');
      return;
    }
    setGameState({
      ...gameState,
      player1Choice: choice
    });
  };

  const handlePlayer2Choice = (choice) => {
    if (gameState.currentRound > 6) {
      alert('Game Over! Please start a new game.');
      return;
    }
    setGameState({
      ...gameState,
      player2Choice: choice
    });
  };

  const determineWinner = async () => {
    if (gameState.player1Choice === '' || gameState.player2Choice === '') {
      alert('Both players need to make a selection.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/games/${gameState.gameId}`, {
        round: gameState.currentRound,
        player1Choice: gameState.player1Choice,
        player2Choice: gameState.player2Choice,
      });
      const { data } = response;
      const { rounds, player1Score: newPlayer1Score, player2Score: newPlayer2Score } = data;
      setGameState({
        ...gameState,
        rounds,
        player1Score: newPlayer1Score,
        player2Score: newPlayer2Score,
        currentRound: gameState.currentRound + 1,
        player1Choice: '',
        player2Choice: '',
        gameOver: gameState.currentRound === 6
      });
    } catch (error) {
      console.error('Error determining winner:', error);
      alert('Failed to determine winner. Please check your network connection and try again.');
    }
  };

  return (
    <div className="App">
      <h1>Rock Paper Scissors Game</h1>
      {!gameState.gameStarted && (
        <GameSetup
          gameState={gameState}
          setGameState={setGameState}
          startGame={startGame}
        />
      )}
      {gameState.gameStarted && !gameState.gameOver && gameState.currentRound <= 6 && (
        <GameInProgress
          gameState={gameState}
          handlePlayer1Choice={handlePlayer1Choice}
          handlePlayer2Choice={handlePlayer2Choice}
          determineWinner={determineWinner}
        />
      )}
      {gameState.gameOver && (
        <GameOver
          player1={gameState.player1}
          player2={gameState.player2}
          player1Score={gameState.player1Score}
          player2Score={gameState.player2Score}
        />
      )}
    </div>
  );
}

export default App;
