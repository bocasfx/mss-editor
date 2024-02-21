import { useCallback, useEffect, useMemo, useState } from "react";
import "./Knob.css";
import { usePatchDispatch } from "../../state/Context";
import { DEFAULT_KNOB_SIZE, MAX_ANGLE, MIN_ANGLE } from "../../constants";
import { calculateValue } from "../../utils/knob";

const Knob = ({ top, left, size, type, id, loadedAngle }) => {
  const [angle, setAngle] = useState(MIN_ANGLE);
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(0);
  const dispatch = usePatchDispatch();

  useEffect(() => {
    if (loadedAngle) {
      const newValue = calculateValue(loadedAngle);
      setAngle(loadedAngle);
      setValue(newValue);
    }
  }, [loadedAngle]);

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
      newAngle = newAngle >= MAX_ANGLE ? MAX_ANGLE : newAngle;
      newAngle = newAngle <= MIN_ANGLE ? MIN_ANGLE : newAngle;

      const newValue = calculateValue(newAngle);

      setAngle(newAngle);
      setValue(newValue);
    },
    [dragging, angle]
  );

  const onMouseUp = useCallback(
    (event) => {
      event.preventDefault();
      setDragging(false);
      document.exitPointerLock();
      dispatch({
        type: "update",
        id: id,
        value: { value, angle },
      });
    },
    [angle, dispatch, id, value, setDragging]
  );

  const knobSize = useMemo(() => size || DEFAULT_KNOB_SIZE, [size]);
  const indicatorClass = useMemo(() => {
    return type === "dot" ? "dot" : "line";
  }, [type]);

  return (
    <div
      style={{
        transform: "rotate(" + angle + "deg)",
        width: `${knobSize}px`,
        height: `${knobSize}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="knob-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <span className={`indicator ${indicatorClass}`}></span>
    </div>
  );
};

export { Knob };
