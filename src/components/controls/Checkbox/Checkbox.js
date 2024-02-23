import './Checkbox.css';

const Checkbox = ({ left, top }) => {
  return (
    <div className='checkbox-container' style={{ left: `${left}px`, top: `${top}px` }}>
    </div>
  );
};

export { Checkbox };
