import { Typography } from "@mui/material";
import React from "react";

const GameStats = (props) => {
  const speed = props.speed;

  const showDiff = () => {
    switch (speed) {
      case 50:
        return "H";
      case 150:
        return "N";
      case 250:
        return "E";
    }
  };

  return (
    <div className="game-stats-container">
      <div className="game-stats">
        <Typography style={{ color: "#595858" }}>FIRST SNAKE SCORE</Typography>
        <Typography variant="h2">{props.snakeOne.length}</Typography>
      </div>
      <div className="game-stats">
        <Typography style={{ color: "#595858" }}>SECOND SNAKE SCORE</Typography>
        <Typography variant="h2">{props.snakeTwo.length}</Typography>
      </div>
      <div className="game-stats">
        <Typography style={{ color: "#595858" }}>DIFFICULTY</Typography>
        <Typography variant="h2">
          {props.speed == null ? "-" : showDiff()}
        </Typography>
      </div>
    </div>
  );
};

export default GameStats;
