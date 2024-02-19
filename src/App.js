import { useState } from "react";
import "./App.css";
import mssPatchBlack from "./assets/mss-patch-black.svg";
import { Notes, PatchBay } from "./components";
import { saveFile } from "./utils/file";
import { DFAM, Mother32, Subharmonicon } from "./components/synths";

const defaultPatch = {
  name: "MSS Patch",
  notes: "This is a patch for the MSS",
  dfam: {
    volume: 0,
    seq: [
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
    ],
  },
};

function App() {
  const [patch] = useState(defaultPatch);

  const downloadPatch = () => {
    const blob = new Blob([JSON.stringify(patch, null, 2)], {
      type: "application/json",
    });
    saveFile(blob, "patch.json");
  };

  return (
    <div className="App">
      <button className="download-button" onClick={downloadPatch}>
        Download
      </button>
      <div className="mss-container">
        <img src={mssPatchBlack} className="mss-patch-black" alt="logo" />
        <Notes multiline={false} top={65} left={425} width={351} height={92} />
        <Notes multiline top={200} left={121} width={953} height={125} />
        <PatchBay top={615} left={911} width={173} height={1241} />
        <DFAM />
        <Mother32 />
        <Subharmonicon />
      </div>
    </div>
  );
}

export default App;
