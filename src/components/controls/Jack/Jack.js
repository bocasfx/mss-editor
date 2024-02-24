import "./Jack.css";

const Jack = ({ type, onMouseDown, onMouseUp }) => {
  return (
    <div
      className={`jack ${type}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export { Jack };
