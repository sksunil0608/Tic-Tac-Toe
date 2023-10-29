/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//React.Fragment is the empty tag we can use <> </>
const StatusMessage = ({ winner, gamingBoard, noMovesLeft }) => {
  const { squares, isXNext } = gamingBoard;

  const nextPlayer = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          {' '}
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }

    if (!winner && noMovesLeft) {
      return (
        <>
          <span className="text-green">X</span> and{' '}
          <span className="text-orange">O</span> ties
        </>
      );
    }

    if (!winner && !noMovesLeft) {
      return (
        <>
          Next Player is{' '}
          <span className={isXNext ? 'text-green' : 'text-orange'}>
            {nextPlayer}
          </span>
        </>
      );
    }

    return null;
  };

  //   return <div>{winner ? <div></div> : null}</div>;
  return <div className="status-message">{renderStatusMessage()}</div>;
};

export default StatusMessage;
