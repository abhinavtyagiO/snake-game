import React from "react";

const Snake = (props) => {
  return (
    <div>
      {props.snakeDots.map((snakeDot, i) => {
        const coordinates = {
          left: `${snakeDot[0]}%`,
          top: `${snakeDot[1]}%`,
        };
        return <div className="snake" key={i} style={coordinates}></div>;
      })}
    </div>
  );
};

export default Snake;
