import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [historyList, setHistoryList] = useState([]);

  // Declaring a Winner
  useEffect(() => {
    if (calculateWinner(squares) === "X") {
      setWinner("Player");
    } else if (calculateWinner(squares) === "O") {
      setWinner("Computer");
    }

    // Handle machine's turn
    const handleComputerTurn = () => {
      // User wins, computer is not allowed to played
      if (calculateWinner(squares)) {
        return;
      }

      let randomNumber = Math.floor(Math.random() * 9);

      // check if anyone already played that spot
      if (squares[randomNumber]) {
        handleComputerTurn();
      } else {
        squares.map((square, index) => {
          if (index === randomNumber) {
            squares[randomNumber] = "O";
            setXIsNext(true);
          }
          return null;
        });

        setSquares([...squares]);
        setHistoryList([...historyList, "Computer's turn"]);
      }
    };

    if (xIsNext === false) {
      // Computer's turn
      const machineTurn = setTimeout(handleComputerTurn, 1000);

      if (calculateWinner(squares)) {
        clearTimeout(machineTurn);
      }
    }
  }, [squares, xIsNext, historyList]);

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

    // When players click on available spot, don't run the system
    if (squares[i]) return;

    // "Your code here";
    squares.map((square, index) => {
      if (index === i) {
        squares[i] = "X";
        setXIsNext(false);
      }
      return null;
    });

    setSquares([...squares]);
    setHistoryList([...historyList, "Player's turn"]);

    // Draw feature:
    // After the player plays, and no winner is found
    //  The system announces it is a draw
    if (historyList.length === 8 && calculateWinner(squares) === null) {
      setWinner("Draw");
      return;
    }
  };

  // Restart game
  const handleRestart = () => {
    console.log("Call handleRestart");
    setSquares(Array(9).fill(null));
    setHistoryList([]);
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>

      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <div className="board-history-container">
          <Board squares={squares} handleClick={handleClick} />
          <History historyList={historyList} />
        </div>
      </div>

      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
