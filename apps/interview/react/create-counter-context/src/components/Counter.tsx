import { useCounterContext } from "../context/CounterContext";

export default function Counter() {
  const {
    state: { count },
    dispatch,
  } = useCounterContext();

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT", by: 1 })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", by: 1 })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
