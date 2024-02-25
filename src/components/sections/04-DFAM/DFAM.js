import "./DFAM.css";
import { Knob, Toggle } from "../../controls";
import { usePatch } from "../../../state/Context";
import { DT, SYNTH_SECTION_HEIGHT, TT } from "../../../constants";
import { DFAM as DFAM_ID } from "../../../constants";

const DFAM = ({ dragHandleProps }) => {
  const patch = usePatch();

  const {
    [DFAM_ID]: {
      VCODecay: { angle },
    },
  } = patch;

  return (
    <div className="dfam-container" style={{ height: SYNTH_SECTION_HEIGHT }}>
      <div className="drag-handle" {...dragHandleProps}></div>
      <Knob
        top={59}
        left={126}
        size={80}
        type="dot"
        id="dfam.VCODecay"
        loadedAngle={angle}
      />
      <Knob top={280} left={349} size={30} type="line" id="dfam.seq-pitch0" />
      <Toggle left={223} top={192} type={DT} />
      <Toggle left={222} top={87} type={TT} />
    </div>
  );
};

export { DFAM };
