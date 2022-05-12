import React from "react";

const Snake = (props) => {
  return (
    <div>
      {props.snakeState.map((state, i) => {
        const coordinates = {
          left: `${state[0]}%`,
          top: `${state[1]}%`,
        };
        return <div className="snake" key={i} style={coordinates}></div>;
      })}
    </div>
  );
};

export default Snake;
