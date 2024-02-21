import { usePatch } from '../../../state/Context';
import { Knob } from '../../common';
import './DFAM.css';

const DFAM = () => {
  const patch = usePatch();

  const { dfam: { VCODecay: { angle } } } = patch;

  return (
    <div className='dfam-container'>
      <Knob top={39} left={17} size={80} type="dot" id="dfam.VCODecay" loadedAngle={angle} />
      <Knob top={261} left={240} size={30} type="line" id="dfam.seq-pitch0" />
    </div>
  );
}

export { DFAM };
