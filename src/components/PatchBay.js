import { useCallback, useState } from "react";
import "./PatchBay.css";
import { Jack } from "./Jack";

const PatchBay = ({ width, height, top, left }) => {
  const [dragging, setDragging] = useState(false);
  const [coords, setCoords] = useState([]);
  const [currentCoord, setCurrentCoord] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const onMouseDown = useCallback(
    (event) => {
      event.stopPropagation();
      setDragging(true);
      setCurrentCoord({
        x1: event.clientX - left - 100,
        y1: event.clientY - top,
        x2: event.clientX - left - 100,
        y2: event.clientY - top,
      });
    },
    [setDragging, top, left]
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
        console.log(event.clientX - left, event.clientY - top);
        setCurrentCoord({
          ...currentCoord,
          x2: event.clientX - left - 100,
          y2: event.clientY - top,
        });
      }
    },
    [dragging, left, top, currentCoord]
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
        <Jack type="in" coords={coords} onMouseDown={onMouseDown} />
        <Jack type="out" coords={coords} onMouseDown={onMouseDown} />
        <svg className="svg">
          {renderPatchCords()}
          <rect x="0" y="0" width="100" height="100" />
        </svg>
      </div>
    </div>
  );
};

export { PatchBay };
