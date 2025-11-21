// src/Game.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Game.css";

export default function Game() {
  const gameRef = useRef(null);
  const manRef = useRef(null);

  const [score, setScore] = useState(0);
  const [isOver, setIsOver] = useState(false);

  // Jump / movement handler
  const handleJump = () => {
    if (isOver) return;
    let man = manRef.current;
    if (!man) return;

    man.style.transition = "bottom 0.2s";
    man.style.bottom = "180px";

    setTimeout(() => {
      man.style.bottom = "120px";
    }, 250);
  };

  // Game loop + obstacle movement
  useEffect(() => {
    const game = gameRef.current;
    const man = manRef.current;

    if (!game || !man) return;

    let obstacles = [];
    let frame = 0;

    const spawnObstacle = () => {
      const obstacle = document.createElement("div");
      obstacle.className = "obstacle";

      obstacle.style.height = `${Math.random() * 120 + 80}px`;
      obstacle.style.width = "40px";
      obstacle.style.right = "-60px";
      obstacle.style.bottom = "40px";

      game.appendChild(obstacle);
      obstacles.push(obstacle);
    };

    const interval = setInterval(() => {
      if (isOver) return;

      frame++;

      // Spawn new obstacles
      if (frame % 100 === 0) {
        spawnObstacle();
      }

      // Move obstacles
      obstacles.forEach((obs, index) => {
        let x = parseInt(obs.style.right);
        obs.style.right = x + 4 + "px";

        // Collision Check
        const manRect = man.getBoundingClientRect();
        const obsRect = obs.getBoundingClientRect();

        if (
          manRect.left < obsRect.right &&
          manRect.right > obsRect.left &&
          manRect.bottom > obsRect.top
        ) {
          setIsOver(true);
        }

        // Score update & cleanup
        if (x > window.innerWidth) {
          obs.remove();
          obstacles.splice(index, 1);
          setScore((prev) => prev + 1);
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isOver]);

  return (
    <div className="game-wrapper">
      <div className="game" ref={gameRef} onClick={handleJump}>
        {/* Score Badge */}
        <div className="score">{score}</div>

        {/* Player */}
        <div className="animated-man" ref={manRef}></div>

        {/* Ground */}
        <div className="ground"></div>

        {/* Game Over Overlay */}
        {isOver && (
          <div className="overlay">
            <h2>Game Over</h2>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
