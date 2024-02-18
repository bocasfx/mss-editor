import "./App.css";
import mssPatchBlack from "./assets/mss-patch-black.svg";
import Knob from "./components/Knob";
import { Notes } from "./components/Notes";
import { PatchBay } from "./components/PatchBay";

function App() {
  return (
    <div className="App">
      <div className="mss-container">
        <img src={mssPatchBlack} className="mss-patch-black" alt="logo" />
        <Notes multiline={false} top={65} left={425} width={351} height={92} />
        <Notes multiline top={200} left={121} width={953} height={125} />
        <PatchBay 
          top={609}
          left={906}
          width={175}
          height={1257}
        />
        <Knob />
      </div>
    </div>
  );
}

export default App;
