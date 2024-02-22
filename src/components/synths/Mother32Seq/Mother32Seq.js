import { CheckBox } from '../../common/CheckBox';
import './Mother32Seq.css';

const Mother32Seq = ({ left, top }) => {
  return (
    <div className='mother32-seq-container' style={{
      left: `${left}px`,
      top: `${top}px`,
    }}>
      <CheckBox left={2} top={2} />
    </div>
  );
};

export { Mother32Seq };
