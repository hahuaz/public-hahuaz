import { createContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const AppWideContext = createContext('');

export const AppWideContextProvider = ({ children }) => {
  const initialState = {
    todos: null,
  };

  function reducer(draft, { type, payload }) {
    switch (type) {
      case 'RESET':
        return initialState;
      case 'SET_TODOS':
        draft.todos = payload;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <AppWideContext.Provider value={{ state, dispatch }}>
      {children}
    </AppWideContext.Provider>
  );
};
