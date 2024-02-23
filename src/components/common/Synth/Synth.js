import './Synth.css';
import { DFAM, Mother32, Subharmonicon } from "../../sections";
import { forwardRef } from "react";

const Synth = forwardRef(
  ({ id, dragHandleProps, snapshot, ...props }, ref) => {
    const renderSynth = () => {
      switch (id) {
        case "MOTHER32":
          return <Mother32 dragHandleProps={dragHandleProps}/>;
        case "DFAM":
          return <DFAM />;
        case "SUBHARMONICON":
          return <Subharmonicon />;
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
