import React, { createContext, useContext, useReducer, useEffect } from "react";

type CellValue = "X" | "O" | "";

type State = {
  board: CellValue[];
  currentPlayer: CellValue;
  winner: CellValue | null;
};

type Action = { type: "MAKE_MOVE"; index: number } | { type: "RESTART_GAME" };

const initialState: State = {
  board: Array(9).fill(""),
  currentPlayer: "X",
  winner: null,
};

const GameContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "MAKE_MOVE": {
      if (state.board[action.index] || state.winner) {
        return state;
      }
      const newBoard = [...state.board];
      newBoard[action.index] = state.currentPlayer;
      const winner = checkForWinner(newBoard);
      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
      };
    }
    case "RESTART_GAME":
      return initialState;
    default:
      return state;
  }
}

function checkForWinner(board: CellValue[]): CellValue | null {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.winner) {
      console.log(`Player ${state.winner} wins!`);
    }
  }, [state.winner]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
