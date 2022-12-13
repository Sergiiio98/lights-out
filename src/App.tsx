import { useState } from "react";
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

// this nickname is used
// end game handle
