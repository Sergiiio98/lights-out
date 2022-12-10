import React from "react";
import "./App.scss";
import GameDevice from "./components/gameDevice/gameDevice";

function App() {
  return (
    <div className="App">
      <div className="topBar">
        <h1 style={{ textAlign: "center", color: "white" }}>Lights </h1>{" "}
        <h1 style={{ textAlign: "center", color: "#b39ddb" }}> Out</h1>
      </div>
      <GameDevice />
    </div>
  );
}

export default App;

// time stop
// display sorted
// sound off
// help modal === same as how to play
// first nickname then how to play
// this nickname is used
// end game handle
