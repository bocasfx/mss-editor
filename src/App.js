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
import { usePatch, usePatchDispatch } from "./state/Context";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const patch = usePatch();
  const dispatch = usePatchDispatch();

  const { sectionOrder } = patch;

  const dragEnded = (param) => {
    const { source, destination } = param;
    let _arr = [...sectionOrder];

    // Extracting the source item from the list
    const _item = _arr.splice(source.index, 1)[0];

    // Inserting it at the destination index.
    _arr.splice(destination.index, 0, _item);
    dispatch({ type: "REORDER", payload: _arr });
  };

  const renderSynths = () => {
    return (
      <DragDropContext onDragEnd={dragEnded}>
        <Droppable droppableId="synths-wrapper">
          {(provided, snapshot) => (
            <SynthList ref={provided.innerRef} {...provided.droppableProps}>
              {sectionOrder.map((_synth, index) => {
                return (
                  <Draggable
                    draggableId={`synth-${_synth.id}`}
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
        <PatchBay />
      </div>
      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
