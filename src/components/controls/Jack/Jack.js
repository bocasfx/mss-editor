import { useRef } from "react";
import "./Jack.css";

const Jack = ({ type, onMouseDown, onMouseUp }) => {
  const element = useRef(null);

  const getCenter = () => {
    if (element.current === null) return;

    const { left, width, top, height } =
      element.current.getBoundingClientRect();

    const _center = {
      x: left + width / 2,
      y: top + height / 2,
    };

    return _center;
  };

  const mouseDownHandler = (event) => {
    onMouseDown(event, type, getCenter());
  };

  const mouseUpHandler = (event) => {
    onMouseUp(event, type, getCenter());
  };

  return (
    <div
      ref={element}
      className={`jack ${type}`}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    ></div>
  );
};

export { Jack };
