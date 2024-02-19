import "./App.css";
import mssPatchBlack from "./assets/mss-patch-black.svg";
import Knob from "./components/Knob";
import { Notes } from "./components/Notes";
import { PatchBay } from "./components/PatchBay";
import { saveFile } from "./utils/file";

const obj = { hello: "world" };
const blob = new Blob([JSON.stringify(obj, null, 2)], {
  type: "application/json",
});

function App() {
  return (
    <div className="App">
      <button
        className="download-button"
        onClick={() => saveFile(blob, 'patch.json')}
      >
        Download
      </button>
      <div className="mss-container">
        <img src={mssPatchBlack} className="mss-patch-black" alt="logo" />
        <Notes multiline={false} top={65} left={425} width={351} height={92} />
        <Notes multiline top={200} left={121} width={953} height={125} />
        <PatchBay top={615} left={911} width={173} height={1241} />
        <Knob top={610} left={867} />
      </div>
    </div>
  );
}

export default App;
