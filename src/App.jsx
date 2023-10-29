import Board from './components/Board';

import './styles.scss';
import { useState } from 'react';

function App() {
  // const [state,setState] = useState(1);
  const onBtnClick = () => {
    console.log('hello');
    // setCounter(counter + 1);
    // send a callback fuction here in place of this
    setCounter(currentCounter => {
      return currentCounter + 1;
    });
  };
  const [counter, setCounter] = useState(1);

  return (
    <div className="app">
      <Board />
      <button type="button" onClick={onBtnClick}>
        click Me
      </button>
      <h1>{counter}</h1>
    </div>
  );
}

export default App;
