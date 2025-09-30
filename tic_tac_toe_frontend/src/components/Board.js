import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinner={winningLine?.includes(i)}
      />
    );
  };

  return (
    <div className="board" role="grid">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(i))}
    </div>
  );
};

export default Board;
