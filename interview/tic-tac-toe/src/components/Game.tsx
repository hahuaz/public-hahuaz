import { useGameContext } from "../context/GameContext";

const cellStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ccc",
  fontSize: "24px",
  cursor: "pointer",
};

function Cell({ index }: { index: number }) {
  const {
    state: { board },
    dispatch,
  } = useGameContext();

  return (
    <div
      className="cell"
      style={cellStyle}
      onClick={() => dispatch({ type: "MAKE_MOVE", index })}
    >
      {board[index]}
    </div>
  );
}

export default function Game() {
  const {
    state: { winner },
    dispatch,
  } = useGameContext();

  const gameStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
  };

  const restartButtonStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={gameStyle}>
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div style={rowStyle} key={row}>
            {[0, 1, 2].map((col) => (
              <Cell key={col} index={row * 3 + col} />
            ))}
          </div>
        ))}
      </div>
      {winner && <p>Winner: {winner}</p>}
      <button
        style={restartButtonStyle}
        onClick={() => dispatch({ type: "RESTART_GAME" })}
      >
        Restart Game
      </button>
    </div>
  );
}
