import { Knob } from '../../common';
import './DFAM.css';

const DFAM = () => {
  return (
    <div className='dfam-container'>
      <Knob top={39} left={17} size={80} type="dot" />
      <Knob top={261} left={240} size={30} type="line" />
    </div>
  );
}

export { DFAM };
