// Calculate winner by checking all possible winning combinations
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}

// Basic AI that looks for winning move or blocks opponent's winning move
export function getAIMove(squares, player) {
  // Check for winning move
  const winningMove = findWinningMove(squares, player);
  if (winningMove !== -1) return winningMove;

  // Block opponent's winning move
  const opponent = player === 'X' ? 'O' : 'X';
  const blockingMove = findWinningMove(squares, opponent);
  if (blockingMove !== -1) return blockingMove;

  // Take center if available
  if (!squares[4]) return 4;

  // Take any available corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !squares[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => !squares[i]);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  return -1;
}

// Helper function to find winning move
function findWinningMove(squares, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const squares_copy = [...squares];
    if (!squares_copy[a] && squares_copy[b] === player && squares_copy[c] === player) return a;
    if (squares_copy[a] === player && !squares_copy[b] && squares_copy[c] === player) return b;
    if (squares_copy[a] === player && squares_copy[b] === player && !squares_copy[c]) return c;
  }
  return -1;
}
