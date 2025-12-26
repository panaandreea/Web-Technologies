import React, { StrictMode, useReducer } from "react";
import { createRoot } from "react-dom/client";


const initialState = {
  count: 0,
};


function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return initialState;

    default:
      return state;
  }
}


const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>useReducer Example</h2>
      <p>Count: {state.count}</p>

      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>

      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </>
  );
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Counter />
  </StrictMode>
);
