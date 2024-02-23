import './CheckBox.css';

const CheckBox = ({ left, top }) => {
  return (
    <div className='checkbox-container' style={{ left: `${left}px`, top: `${top}px` }}>
    </div>
  );
};

export { CheckBox };
