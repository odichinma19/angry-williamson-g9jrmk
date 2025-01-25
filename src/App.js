import React, { useState } from "react";
import "./App.css"; // Import the CSS file to style the app

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
    checkWinner(newSquares);
  };

  const checkWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        return;
      }
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

export default App;
