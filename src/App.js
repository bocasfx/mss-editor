import React from "react";
import "./App.css";
import {
  DFAM,
  DownloadPatch,
  Mother32,
  OpenPatch,
  Subharmonicon,
} from "./components";
import { PatchProvider } from "./state/Context";
import { Header } from "./components";
import { Sequencer } from "./components/sections/02-Sequencer";
import { Divider } from "./components/sections/03-Divider";
import { Footer } from "./components/sections/07-Footer";

function App() {
  return (
    <PatchProvider>
      <div className="App">
        <DownloadPatch />
        <OpenPatch />
        <React.StrictMode>
          <div className="mss-container">
            <Header />
            <Sequencer />
            <Divider />
            <DFAM />
            <Mother32 />
            <Subharmonicon />
            <Footer />
          </div>
        </React.StrictMode>
      </div>
    </PatchProvider>
  );
}

export default App;
