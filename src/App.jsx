/* eslint-disable no-unused-vars */
import Board from './components/Board';
import { useState } from 'react';
import './styles.scss';
import { calculateWinner } from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';
import Navigaton from './components/Navigation';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const noMovesLeft = gamingBoard.squares.every(
    squareValue => squareValue !== null
  );

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquareState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <Navigaton />
      <h1>
        <span className="text-orange">TIC </span>
        <span className="text-green">TAC </span>
        <span className="text-orange">TOE</span>
      </h1>
      <StatusMessage
        winner={winner}
        gamingBoard={gamingBoard}
        noMovesLeft={noMovesLeft}
      />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />

      <button
        type="button"
        className={`btn-reset ${winner || noMovesLeft ? 'active' : ''}`}
        onClick={onNewGameStart}
      >
        {' '}
        Start New Game
      </button>
      <p style={{ fontWeight: 'bold' }}>Current Gaming History</p>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>
  );
}

export default App;
