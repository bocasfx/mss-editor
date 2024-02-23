// import { Knob } from "../../common";
import "./Mother32.css";

const Mother32 = ({dragHandleProps}) => {
  return <div className="mother32-container">
    <div className="drag-handle" {...dragHandleProps}></div>
    {/* <Knob top={20} left={36} size={80} type="dot" id="mother32-frequency" /> */}
  </div>;
};

export { Mother32 };
