import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Snake from "./components/snake";
import Food from "./components/food";
import SelectDifficulty from "./components/select-difficulty";
import "./App.css";

const maxDim = 700;
const minDim = 500;
const randomDimension =
  Math.floor((Math.random() * (maxDim - minDim + 1) + minDim) / 2) * 2;

const maxFoodCount = 40;
const minFoodCount = 30;
var randomFoodCount =
  Math.floor(
    (Math.random() * (maxFoodCount - minFoodCount + 1) + minFoodCount) / 2
  ) * 2;

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const App = () => {
  const [firstSnakeState, setSnakeState] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [secondSnakeState, setSecondSnakeState] = useState([
    [96, 98],
    [98, 98],
  ]);
  const [foodState, setFoodState] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState("RIGHT");
  const [secondSnakeDirection, setSecondSnakeDirection] = useState("LEFT");
  const [speed, setSpeed] = useState(null);
  const [time, setTime] = useState(0);
  const [openModal, setOpenModal] = useState(true);

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

      case 65:
        setSecondSnakeDirection("LEFT");
        break;
      case 87:
        setSecondSnakeDirection("UP");
        break;
      case 68:
        setSecondSnakeDirection("RIGHT");
        break;
      case 83:
        setSecondSnakeDirection("DOWN");
        break;
    }
  };

  const changeTime = () => {
    setTime(time + 1);
  };

  const onCrossingBorder = () => {
    var firstSnakeHead = firstSnakeState[firstSnakeState.length - 1];
    var secondSnakeHead = secondSnakeState[secondSnakeState.length - 1];
    var firstSnakeHits =
      firstSnakeHead[0] >= 100 ||
      firstSnakeHead[1] >= 100 ||
      firstSnakeHead[0] < 0 ||
      firstSnakeHead[1] < 0;
    var secondSnakeHits =
      secondSnakeHead[0] >= 100 ||
      secondSnakeHead[1] >= 100 ||
      secondSnakeHead[0] < 0 ||
      secondSnakeHead[1] < 0;
    if (firstSnakeHits || secondSnakeHits) {
      gameOver();
    }
  };

  const onEatingItself = () => {
    var snake = [...firstSnakeState];
    var head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        gameOver();
      }
    });
  };

  const onEatingFood = () => {
    var firstSnakeHead = firstSnakeState[firstSnakeState.length - 1];
    var secondSnakeHead = secondSnakeState[secondSnakeState.length - 1];
    var food = foodState;
    var first = firstSnakeHead[0] == food[0] && firstSnakeHead[1] == food[1];
    var second = secondSnakeHead[0] == food[0] && secondSnakeHead[1] == food[1];

    if (first || second) {
      setFoodState(getRandomCoordinates());
      randomFoodCount--;
      if (randomFoodCount > 0) {
        if (first) {
          enlargeSnake(firstSnakeState);
        } else {
          enlargeSnake(secondSnakeState);
        }
      } else if (randomFoodCount == 0) {
        gameOver();
      }
    }
  };

  const enlargeSnake = (state) => {
    var enlargedSnake = [...state];
    var tail = enlargedSnake[0];
    enlargedSnake.unshift([tail[0], tail[1]]);
    console.log(enlargedSnake);
    setSnakeState(enlargedSnake);
  };

  const moveFirstSnake = () => {
    var snake = [...firstSnakeState];
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

  const moveSecondSnake = () => {
    var snake = [...secondSnakeState];
    var head = snake[snake.length - 1];

    switch (secondSnakeDirection) {
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
    setSecondSnakeState(snake);
  };

  const gameOver = () => {
    alert("Game Over");
    window.location.href = "/";
  };

  useEffect(() => {
    if (speed != null) {
      const id = setInterval(changeTime, speed);
      return () => clearInterval(id);
    }
  }, [time]);

  useEffect(() => {
    onEatingFood();
  }, [time]);

  useEffect(() => {
    onCrossingBorder();
    onEatingItself();
    moveFirstSnake();
    moveSecondSnake();
  }, [time]);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  }, []);

  return (
    <div className="App">
      <Dialog open={openModal}>
        <DialogTitle>Snake Game 🐍</DialogTitle>
        <DialogContent>
          <SelectDifficulty />
        </DialogContent>
      </Dialog>
      <div
        className="board"
        style={{
          height: `${randomDimension}px`,
          width: `${randomDimension}px`,
        }}
      >
        <Snake snakeState={firstSnakeState} />
        <Food foodState={foodState} />
        <Snake snakeState={secondSnakeState} />
      </div>
    </div>
  );
};

export default App;
