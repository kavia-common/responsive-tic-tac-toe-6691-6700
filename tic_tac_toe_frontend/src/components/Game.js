import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner, getAIMove } from '../utils/gameLogic';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAIMode, setIsAIMode] = useState(false);
  
  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo?.winner;
  const isDraw = !winner && !current.squares.includes(null);
  
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "Game Draw!" 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  useEffect(() => {
    // AI move
    if (isAIMode && !xIsNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(current.squares, 'O');
        if (aiMove !== -1) {
          handleClick(aiMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAIMode, xIsNext, winner, isDraw]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = [...current.squares];

    // Return if square is filled or game is won
    if (squares[i] || calculateWinner(squares)) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares }]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((_, move) => (
    <button key={move} onClick={() => jumpTo(move)}>
      {move === 0 ? 'Go to game start' : `Go to move #${move}`}
    </button>
  ));

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
  };

  return (
    <div className="container">
      <div className="game-info">
        <div className="status">{status}</div>
        <div className="game-controls">
          <button className="btn" onClick={resetGame}>
            New Game
          </button>
          <button 
            className={`btn ${isAIMode ? 'btn-secondary' : ''}`} 
            onClick={toggleAIMode}
          >
            {isAIMode ? 'Two Players' : 'Play vs AI'}
          </button>
        </div>
      </div>
      
      <Board 
        squares={current.squares}
        onClick={handleClick}
        winningLine={winnerInfo?.line}
      />
      
      <div className="moves-list">
        <h3>Game History</h3>
        {moves}
      </div>
    </div>
  );
};

export default Game;
