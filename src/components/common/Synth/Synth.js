import './Synth.css';
import { DFAM, Mother32, Subharmonicon } from "../../sections";
import { forwardRef } from "react";

const Synth = forwardRef(
  ({ id, dragHandleProps, snapshot, ...props }, ref) => {
    const renderSynth = () => {
      switch (id) {
        case "MOTHER32":
          return <Mother32 dragHandleProps={dragHandleProps} />;
        case "DFAM":
          return <DFAM dragHandleProps={dragHandleProps} />;
        case "SUBHARMONICON":
          return <Subharmonicon dragHandleProps={dragHandleProps} />;
        default:
          return <Mother32 />;
      }
    };
    return (
      <li
        ref={ref}
        {...props}
      >
        <div>
          {renderSynth()}
        </div>
      </li>
    );
  }
);

export { Synth };
