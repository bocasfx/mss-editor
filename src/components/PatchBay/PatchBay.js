import { useCallback, useRef, useState } from "react";
import "./PatchBay.css";
import { Jack } from "../common";
import { transformCoords } from "../../utils";
import { IN, OUT } from "../../constants";
import { INDICATOR_COLOR } from "../../constants/colors";
import { getRandomColor } from "../../utils/color";

const PatchBay = ({ width, height, top, left }) => {
  const [dragging, setDragging] = useState(false);
  const [coords, setCoords] = useState([]);
  const [currentCoord, setCurrentCoord] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    color: INDICATOR_COLOR
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
        color: getRandomColor(),
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
      const { x1, y1, x2, y2, color } = coord;
      return (
        <line
          key={index}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={5}
          opacity={dragging ? 0.3 : 1}
        />
      );
    });
  };

  const renderCurrentPatchCord = (coord) => {
    if (!dragging) {
      return null;
    }

    const { x1, y1, x2, y2, color } = coord;

    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={5}
      />
    );
  };

  const renderJacks = (count) => {
    const jacks = [];
    for (let i = 0; i < count; i++) {
      const type = i % 2 === 0 ? IN : OUT;
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
          {renderCurrentPatchCord(currentCoord)}
        </svg>
      </div>
    </div>
  );
};

export { PatchBay };
