import { Knob } from '../../common';
import './DFAM.css';

const DFAM = () => {
  return (
    <div className='dfam-container'>
      <Knob top={39} left={17} size={80} type="dot" id="dfam-vco-decay" />
      <Knob top={261} left={240} size={30} type="line" id="dfam-seq-pitch-0" />
    </div>
  );
}

export { DFAM };
