// src/App.jsx
import "./App.css";
import Game from "./Game.jsx";

function App() {
  return (
    <div className="app">
      <h1 className="title">Flappy Box</h1>
      <Game />
      <p className="hint">Click or press SPACE to jump</p>
    </div>
  );
}

export default App;
