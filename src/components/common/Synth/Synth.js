import "./Synth.css";
import {
  DFAM as DFAMSection,
  Mother32 as Mother32Section,
  Subharmonicon as SubharmoniconSection,
} from "../../sections";
import { forwardRef } from "react";
import { DFAM, MOTHER32, SUBHARMONICON } from "../../../constants";

const Synth = forwardRef(
  ({ id, dragHandleProps, snapshot, ...props }, ref) => {
    const renderSynth = () => {
      switch (id) {
        case MOTHER32:
          return <Mother32Section dragHandleProps={dragHandleProps} />;
        case DFAM:
          return <DFAMSection dragHandleProps={dragHandleProps} />;
        case SUBHARMONICON:
          return <SubharmoniconSection dragHandleProps={dragHandleProps} />;
        default:
          return null;
      }
    };
    return (
      <li ref={ref} {...props}>
        <div>{renderSynth()}</div>
      </li>
    );
  }
);

export { Synth };
