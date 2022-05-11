import React from "react";

const Food = (props) => {
  const coordinates = {
    left: `${props.foodPos[0]}%`,
    top: `${props.foodPos[1]}%`,
  };

  return <div className="food" style={coordinates}></div>;
};

export default Food;
