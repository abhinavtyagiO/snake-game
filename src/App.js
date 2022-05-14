import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Slide } from "@mui/material";
import Snake from "./components/snake";
import Food from "./components/food";
import SelectDifficulty from "./components/select-difficulty";
import GameStats from "./components/game-stats";
import GameOver from "./components/game-over";
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
  const [openResultModal, setOpenResultModal] = useState(false);
  const [whichSnakeHits, setWhichSnakeHits] = useState(null);

  useEffect(() => {
    if (speed != null) {
      const id = setInterval(changeTime, speed);
      return () => clearInterval(id);
    }
  }, [time, speed]);

  useEffect(() => {
    onEatingFood();
  }, [time]);

  useEffect(() => {
    onCrossingWall();
    onEatingOtherSnake();
    moveFirstSnake();
    moveSecondSnake();
  }, [time]);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  }, []);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setSecondSnakeDirection("LEFT");
        break;
      case 38:
        setSecondSnakeDirection("UP");
        break;
      case 39:
        setSecondSnakeDirection("RIGHT");
        break;
      case 40:
        setSecondSnakeDirection("DOWN");
        break;

      case 65:
        setDirection("LEFT");
        break;
      case 87:
        setDirection("UP");
        break;
      case 68:
        setDirection("RIGHT");
        break;
      case 83:
        setDirection("DOWN");
        break;
    }
  };

  const changeTime = () => {
    setTime(time + 1);
  };

  const onCrossingWall = () => {
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
      if (firstSnakeHits) {
        setWhichSnakeHits(1);
      } else if (secondSnakeHits) {
        setWhichSnakeHits(2);
      }
      gameOver();
    }
  };

  const onEatingOtherSnake = () => {
    var firstSnake = [...firstSnakeState];
    var secondSnake = [...secondSnakeState];
    var firstSnakeHead = firstSnakeState[firstSnakeState.length - 1];
    var secondSnakeHead = secondSnakeState[secondSnakeState.length - 1];
    var isSecondSnake = false;
    var isFirstSnake = false;

    isSecondSnake = firstSnake.forEach((dot) => {
      if (secondSnakeHead[0] == dot[0] || secondSnakeHead[1] == dot[1]) {
        return true;
      }
    });

    isFirstSnake = secondSnake.forEach((dot) => {
      if (firstSnakeHead[0] == dot[0] || firstSnakeHead[1] == dot[1]) {
        return true;
      }
    });

    if (isSecondSnake || isFirstSnake) {
      if (isFirstSnake) {
        setWhichSnakeHits(1);
      } else if (isSecondSnake) {
        setWhichSnakeHits(2);
      }

      gameOver();
    }
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
    setSpeed(null);
    setOpenResultModal(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div className="App">
      <Dialog open={openModal}>
        <DialogTitle>Welcome to Snakes! 🐍</DialogTitle>
        <DialogContent>
          <img
            className="snake-image"
            src={process.env.PUBLIC_URL + "/snake.png"}
          />{" "}
          <SelectDifficulty
            speed={speed}
            setSpeed={setSpeed}
            setOpenModal={setOpenModal}
          />
        </DialogContent>
      </Dialog>

      <GameStats
        dim={randomDimension}
        snakeOne={firstSnakeState}
        snakeTwo={secondSnakeState}
        speed={speed}
      />

      <div
        className="board"
        style={{
          height: `${randomDimension}px`,
          width: `${randomDimension}px`,
        }}
      >
        <Snake snakeState={firstSnakeState} />
        <Food foodState={foodState} />
        <Snake
          style={{ backgroundColor: "#bb1068" }}
          snakeState={secondSnakeState}
        />
      </div>

      <Dialog
        open={openResultModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>GAME OVER</DialogTitle>
        <DialogContent>
          <img
            className="snake-image"
            src={process.env.PUBLIC_URL + "/gameover.jpeg"}
          />
          <GameOver
            whichSnakeHits={whichSnakeHits}
            firstSnakeState={firstSnakeState}
            secondSnakeState={secondSnakeState}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
