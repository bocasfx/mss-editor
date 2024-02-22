import React from "react";
import "./App.css";
import mssPatchBlack from "./assets/mss-patch-black.svg";
import {
  DFAM,
  Mother32,
  Subharmonicon,
  Notes,
  PatchBay,
  DownloadPatch,
  OpenPatch,
  Mother32Seq,
} from "./components";
import { PatchProvider } from "./state/Context";

function App() {
  return (
    <PatchProvider>
      <div className="App">
        <DownloadPatch />
        <OpenPatch />
        <React.StrictMode>
          <div className="mss-container">
            <img src={mssPatchBlack} className="mss-patch-black" alt="logo" />
            <Notes
              id="patch-name"
              multiline={false}
              top={65}
              left={425}
              width={351}
              height={92}
            />
            <Notes
              id="patch-notes"
              multiline
              top={200}
              left={121}
              width={953}
              height={125}
            />
            <PatchBay top={615} left={911} width={173} height={1241} />
            <Mother32Seq left={197} top={403}/>
            <DFAM />
            <Mother32 />
            <Subharmonicon />
          </div>
        </React.StrictMode>
      </div>
    </PatchProvider>
  );
}

export default App;
