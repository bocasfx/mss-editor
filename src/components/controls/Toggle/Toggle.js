import { useEffect, useState } from "react";
import { INDICATOR_COLOR } from "../../../constants/colors";
import { DOWN, DT } from "../../../constants/toggle";
import "./Toggle.css";

const Toggle = ({ left, top, type }) => {
  const [state, setState] = useState(DOWN);
  const [indicatorClass, setIndicatorClass] = useState("down");
  const [stateCount, setStateCount] = useState(type === "DT" ? 2 : 3);

  const onMouseDown = () => {
    const newState = (state + 1) % stateCount;
    setState(newState);
    setIndicatorClass(newState === 0 ? "down" : newState === 1 ? "up" : "mid");
  };

  useEffect(() => {
    setStateCount(type === DT ? 2 : 3);
  }, [type, setStateCount]);
  
  return (
    <div
      className='toggle-container'
      onMouseDown={onMouseDown}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <span
        className={`dot ${indicatorClass}`}
        style={{
          backgroundColor: INDICATOR_COLOR,
        }}
      ></span>
    </div>
  );
};

export { Toggle };
