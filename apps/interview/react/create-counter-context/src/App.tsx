import { CounterProvider } from "./context/CounterContext";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </>
  );
}

export default App;
