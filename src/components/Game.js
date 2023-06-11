import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [counter, setCounter] = useState(1);

  // Declaring a Winner
  useEffect(() => {
    // "Your code here";
    console.log(12, "run useEffect");
    if (calculateWinner(squares) === "X") {
      setWinner("Player");
    } else if (calculateWinner(squares) === "O") {
      setWinner("Computer");
    }
  }, [squares]);

  // function to check if a player has won.
  // If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  // Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
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
      // i: 0, i < 8
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle player
  const handleClick = (i) => {
    // User wins, players are not allowed to click on board
    if (calculateWinner(squares)) {
      return;
    }

    if (squares[i]) return;

    // "Your code here";
    squares.map((square, index) => {
      if (index === i) {
        squares[i] = "X";
        setXIsNext(false);
      }
      return null;
    });

    const newSquares = [...squares];

    // setSquares(squares);
    setSquares(newSquares);
    const machineTurn = setTimeout(handleComputerTurn, 1000);

    if (calculateWinner(squares)) {
      clearTimeout(machineTurn);
    }
  };

  // Handle machine's turn
  const handleComputerTurn = () => {
    // generate a random number, 0-8
    let randomNumber = Math.floor(Math.random() * 9);

    if (counter === 9) {
      setWinner("Draw");
      return;
    }

    // check if anyone already played that spot
    if (squares[randomNumber]) {
      setCounter(counter + 1);
      console.log(92, counter);

      handleComputerTurn();
    } else {
      squares.map((square, index) => {
        if (index === randomNumber) {
          squares[randomNumber] = "O";
          setXIsNext(true);
        }
        return null;
      });

      const newSquares = [...squares];

      setSquares(newSquares);
    }
  };

  // Restart game
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>

      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
      </div>

      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
