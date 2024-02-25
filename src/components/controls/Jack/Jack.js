import "./Jack.css";

const Jack = ({ type, onMouseDown, onMouseUp }) => {
  const mouseDownHandler = (event) => {
    onMouseDown(event, type);
  }

  const mouseUpHandler = (event) => {
    onMouseUp(event, type);
  }

  return (
    <div
      className={`jack ${type}`}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    ></div>
  );
};

export { Jack };
