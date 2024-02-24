import { SYNTH_SECTION_HEIGHT } from "../../../constants";
import "./Subharmonicon.css";

const Subharmonicon = ({ dragHandleProps }) => {
  return (
    <div
      className="subharmonicon-container"
      style={{ height: SYNTH_SECTION_HEIGHT }}
    >
      <div className="drag-handle" {...dragHandleProps}></div>
    </div>
  );
};

export { Subharmonicon };
