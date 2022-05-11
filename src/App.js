import React, { useEffect, useState } from "react";
import Snake from "./components/snake";
import Food from "./components/food";
import "./App.css";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const App = () => {
  const [snakeState, setSnakeState] = useState({
    snakeDots: [
      [0, 0],
      [2, 0],
    ],
  });
  const [foodState, setFoodState] = useState({
    foodPos: getRandomCoordinates(),
  });
  const [direction, setDirection] = useState({
    direction: "RIGHT",
  });

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setDirection({ direction: "LEFT" });
        break;
      case 38:
        setDirection({ direction: "UP" });
        break;
      case 39:
        setDirection({ direction: "RIGHT" });
        break;
      case 40:
        setDirection({ direction: "DOWN" });
        break;
    }
  };

  useEffect(() => {
    document.onkeydown = onKeyDown;
  }, []);

  return (
    <div className="App">
      <div className="board">
        <Snake snakeDots={snakeState.snakeDots} />
        <Food foodPos={foodState.foodPos} />
      </div>
    </div>
  );
};

export default App;
