import React from "react";
import "./App.css";
import mssPatchBlack from "./assets/mss-patch-black.svg";
import Knob from "./components/Knob.tsx";

function App() {
  return (
    <div className="App">
      <div className="mss-container">
        <img src={mssPatchBlack} className="mss-patch-black" alt="logo" />
        <header className="mss-header">
          <div className="dark">
            <input type="text" />
          </div>
        </header>
        <Knob />
      </div>
    </div>
  );
}

export default App;
