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
  const [snakeState, setSnakeState] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [foodState, setFoodState] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(100);
  const [time, setTime] = useState(0);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setDirection("LEFT");
        break;
      case 38:
        setDirection("UP");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 40:
        setDirection("DOWN");
        break;
    }
  };

  const moveSnake = () => {
    var snake = [...snakeState];
    var head = snake[snake.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
    }
    snake.push(head);
    snake.shift();
    setSnakeState(snake);
  };

  const changeTime = () => {
    setTime(time + 1);
  };

  const onCrossingBorder = () => {
    var head = snakeState[snakeState.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  };

  const onEatingItself = () => {
    var snake = [...snakeState];
    var head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        gameOver();
      }
    });
  };

  const onEatingFood = () => {
    var head = snakeState[snakeState.length - 1];
    var food = foodState;
    if (head[0] == food[0] && head[1] == food[1]) {
      setFoodState(getRandomCoordinates());
      enlargeSnake();
    }
  };

  const enlargeSnake = () => {
    var enlargedSnake = [...snakeState];
    var tail = enlargedSnake[0];
    enlargedSnake.push([tail[0], tail[1]]);
    console.log(enlargedSnake);
    setSnakeState(enlargedSnake);
  };

  const gameOver = () => {
    alert("Game Over");
    window.location.href = "/";
  };

  useEffect(() => {
    const id = setInterval(changeTime, speed);
    return () => clearInterval(id);
  }, [time]);

  useEffect(() => {
    onEatingFood();
  }, [time]);

  useEffect(() => {
    onCrossingBorder();
    onEatingItself();
    moveSnake();
  }, [time]);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  }, []);

  return (
    <div className="App">
      <div className="board">
        <Snake snakeState={snakeState} />
        <Food foodState={foodState} />
      </div>
    </div>
  );
};

export default App;
