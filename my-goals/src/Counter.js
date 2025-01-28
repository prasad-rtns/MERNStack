import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  // Access state using useSelector
  //const count = useSelector((state) => state.count);
  const count = useSelector((state) => {
    console.log('Current count from Redux store:', state.count);
    console.trace();
    return state.count;
  });
  // Dispatch actions using useDispatch
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React-Redux Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        style={{ marginLeft: '10px' }}
      >
        Decrement
      </button>
    </div>
  );
};

export default Counter;