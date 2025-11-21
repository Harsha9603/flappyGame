// src/App.jsx
import "./App.css";
import Game from "./Game.jsx";

function App() {
  return (
    <div className="app">
      <h1 className="title">FlappyGame</h1>
      <Game />
      <p className="hint"> Press SPACE to jump</p>
    </div>
  );
}

export default App;
