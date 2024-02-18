import { useCallback, useRef, useState } from "react";
import "./PatchBay.css";
import { Jack } from "./Jack";
import { transformCoords } from "../utils";

const PatchBay = ({ width, height, top, left }) => {
  const [dragging, setDragging] = useState(false);
  const [coords, setCoords] = useState([]);
  const [currentCoord, setCurrentCoord] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const svgRef = useRef(null);

  const onMouseDown = useCallback(
    (event) => {
      event.stopPropagation();
      const { x, y } = transformCoords(svgRef, event.clientX, event.clientY);
      setDragging(true);
      setCurrentCoord({
        x1: x,
        y1: y,
        x2: x,
        y2: y,
      });
    },
    [setDragging]
  );

  const onMouseUp = useCallback(
    (event) => {
      event.stopPropagation();
      setDragging(false);
      setCoords([...coords, currentCoord]);
    },
    [coords, currentCoord]
  );

  const onMouseMove = useCallback(
    (event) => {
      event.stopPropagation();
      if (dragging) {
        const { x, y } = transformCoords(svgRef, event.clientX, event.clientY);
        setCurrentCoord({
          ...currentCoord,
          x2: x,
          y2: y,
        });
      }
    },
    [dragging, currentCoord]
  );

  const renderPatchCords = () => {
    return coords.map((coord, index) => {
      return (
        <line
          key={index}
          x1={coord.x1}
          y1={coord.y1}
          x2={coord.x2}
          y2={coord.y2}
          stroke="gray"
          strokeWidth={5}
        />
      );
    });
  };

  const renderJacks = (count) => {
    const jacks = [];
    for (let i = 0; i < count; i++) {
      const type = i % 2 === 0 ? "in" : "out";
      jacks.push(<Jack type={type} key={i} onMouseDown={onMouseDown} />);
    }
    return jacks;
  };

  return (
    <div
      className="patch-bay-container"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div className="svg-container">
        <div className="dfam-jacks">{renderJacks(24)}</div>
        <div className="mother32-jacks">{renderJacks(32)}</div>
        <div className="subharmonicon-jacks">{renderJacks(32)}</div>
        <svg className="svg" ref={svgRef}>
          {renderPatchCords()}
        </svg>
      </div>
    </div>
  );
};

export { PatchBay };
