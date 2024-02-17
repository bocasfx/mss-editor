import { useCallback, useMemo, useState } from "react";
import "./Knob.css";

const MAX_ANGLE = 290;
const DEFAULT_KNOB_SIZE = 80;

const Knob = ({ mini, label, size }) => {
  const [angle, setAngle] = useState(290);
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(0);

  const onMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      event.target.requestPointerLock();
      setDragging(true);
    },
    [setDragging]
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
      setValue(newValue);
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
    },
    [setDragging]
  );

  const knobSize = useMemo(() => size || DEFAULT_KNOB_SIZE, [size]);

  return (
    <div
      style={{
        transform: "rotate(" + angle + "deg)",
        width: `${knobSize}px`,
        height: `${knobSize}px`,
      }}
      className="knob-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <span className="knob-dot"></span>
    </div>
  );
};

export default Knob;
