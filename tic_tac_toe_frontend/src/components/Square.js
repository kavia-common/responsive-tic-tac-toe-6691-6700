import React from 'react';

const Square = ({ value, onClick, isWinner }) => {
  return (
    <button 
      className="square" 
      onClick={onClick}
      data-winner={isWinner}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
};

export default Square;
