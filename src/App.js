import "./App.css";
import mssPatchBlack from "./assets/mss-patch-black.svg";

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
      </div>
    </div>
  );
}

export default App;
