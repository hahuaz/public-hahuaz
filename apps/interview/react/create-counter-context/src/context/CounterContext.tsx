import React, { createContext, useContext, useReducer, useEffect } from "react";

type State = {
  count: number;
};

type Action =
  | { type: "INCREMENT"; by: number }
  | { type: "DECREMENT"; by: number }
  | { type: "RESET" };

const initialState: State = {
  count: 0,
};

const CounterContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.by };
    case "DECREMENT":
      return { count: state.count - action.by };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function CounterProvider({ children }: { children: React.ReactNode }) {
  // you could use useImmerReducer here to directly mutate the state instead of returning a new object, which would be more efficient
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(`The current count is: ${state.count}`);
  }, [state.count]);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounterContext() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }
  return context;
}
