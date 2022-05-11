import React, { useState } from "react";
import Snake from "./components/snake";
import Food from "./components/food";
import "./App.css";

const App = () => {
  const [initialState, setinitialState] = useState({
    snakeDots: [
      [0, 0],
      [2, 0],
    ],
    foodPos: [98, 8],
  });

  return (
    <div className="App">
      <div className="board">
        <Snake snakeDots={initialState.snakeDots} />
        <Food foodPos={initialState.foodPos} />
      </div>
    </div>
  );
};

export default App;
