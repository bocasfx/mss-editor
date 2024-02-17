import { useCallback, useState } from "react";
import "./Knob.css";

const MAX_ANGLE = 290;

const Knob = ({ mini, label }) => {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [y, setY] = useState(0);
  const [value, setValue] = useState(0);

  const onMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      event.target.requestPointerLock();
      setDragging(true);
      setY(event.pageY);

      // window.onmousemove = this.onMouseMove.bind(this);
      // window.onmouseup = this.onMouseUp.bind(this);
      console.log("dragging", dragging);
    },
    [setDragging, setY, dragging]
  );

  const onMouseMove = useCallback(
    (event) => {
      event.preventDefault();
      if (!dragging || !event.movementY) {
        return;
      }

      let newAngle = angle - event.movementY;
      newAngle = newAngle >= 2 * MAX_ANGLE ? 2 * MAX_ANGLE : newAngle;
      newAngle = newAngle <= MAX_ANGLE ? MAX_ANGLE : newAngle;

      let newValue = (newAngle - MAX_ANGLE) / MAX_ANGLE;

      newValue *= 100;
      newValue = parseFloat(value.toFixed(1));

      setAngle(newAngle);
      setY(event.pageY);
      setValue(newValue);
      console.log("newAngle", newAngle);
    },
    [dragging, angle, value]
  );

  const onMouseUp = useCallback(
    (event) => {
      event.preventDefault();
      setDragging(false);
      window.onmousemove = null;
      window.onmouseup = null;
      document.exitPointerLock();
      console.log(dragging);
    },
    [setDragging, dragging]
  );

  const ignoreMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="knob-container">
        <div
          className="knob-dot"
          style={{
            transform: "rotate(" + angle + "deg)",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          &middot;
        </div>
    </div>
  );
};

export default Knob;
