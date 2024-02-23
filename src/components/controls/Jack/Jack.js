import "./Jack.css";

const Jack = ({ type, onMouseDown }) => {
  return <div className={`jack ${type}`} onMouseDown={onMouseDown}></div>;
};

export { Jack };
