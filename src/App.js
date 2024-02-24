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
} from "./components";
import { PatchProvider } from "./state/Context";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SYNTHS } from "./data/synths";

function App() {
  const [synths, setSynths] = useState(SYNTHS);

  const dragEnded = (param) => {
    const { source, destination } = param;
    let _arr = [...synths];
    //extracting the source item from the list
    const _item = _arr.splice(source.index, 1)[0];
    //inserting it at the destination index.
    _arr.splice(destination.index, 0, _item);
    setSynths(_arr);
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

            <DragDropContext onDragEnd={dragEnded}>
              <Droppable droppableId="synths-wrapper">
                {(provided, snapshot) => (
                  <SynthList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {synths.map((_comment, index) => {
                      return (
                        <Draggable
                          draggableId={`comment-${_comment.id}`}
                          index={index}
                          key={_comment.id}
                        >
                          {(_provided, _snapshot) => (
                            <Synth
                              ref={_provided.innerRef}
                              dragHandleProps={_provided.dragHandleProps}
                              {..._provided.draggableProps}
                              snapshot={_snapshot}
                              {..._comment}
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
            <Footer />
          </div>
        {/* </React.StrictMode> */}
      </div>
    </PatchProvider>
  );
}

export default App;
