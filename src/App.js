import React, { useState } from "react";
import "./App.css";
import {
  DownloadPatch,
  OpenPatch,
  Synth,
  Header,
  Sequencer,
  Divider,
  Footer,
  SynthList,
  PatchBay,
} from "./components";
import { PatchProvider } from "./state/Context";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { synthData } from "./data/synths";

function App() {
  const [synths, setSynths] = useState(synthData);

  const dragEnded = (param) => {
    const { source, destination } = param;
    let _arr = [...synths];

    // Extracting the source item from the list
    const _item = _arr.splice(source.index, 1)[0];

    // Inserting it at the destination index.
    _arr.splice(destination.index, 0, _item);
    setSynths(_arr);
  };

  const renderSynths = () => {
    return (
      <DragDropContext onDragEnd={dragEnded}>
        <Droppable droppableId="synths-wrapper">
          {(provided, snapshot) => (
            <SynthList ref={provided.innerRef} {...provided.droppableProps}>
              {synths.map((_synth, index) => {
                return (
                  <Draggable
                    draggableId={`comment-${_synth.id}`}
                    index={index}
                    key={_synth.id}
                  >
                    {(_provided, _snapshot) => (
                      <Synth
                        ref={_provided.innerRef}
                        dragHandleProps={_provided.dragHandleProps}
                        {..._provided.draggableProps}
                        snapshot={_snapshot}
                        {..._synth}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </SynthList>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <PatchProvider>
      <div className="App">
        <DownloadPatch />
        <OpenPatch />
        {/* <React.StrictMode> */}
        <div className="mss-container">
          <Header />
          <Sequencer />
          <Divider />
          {renderSynths()}
          <Footer />
          <PatchBay synths={synths} />
        </div>
        {/* </React.StrictMode> */}
      </div>
    </PatchProvider>
  );
}

export default App;
