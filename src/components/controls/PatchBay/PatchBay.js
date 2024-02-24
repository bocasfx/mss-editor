import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./PatchBay.css";
import { Jack } from "../../controls";
import { transformCoords } from "../../../utils";
import { IN, OUT, CLEAR, SYNTH_SECTION_HEIGHT } from "../../../constants";
import { usePatchDispatch } from "../../../state/Context";
import * as d3 from "d3";
import {
  FORCE_Y,
  CABLE_SEGMENTS,
  FORCE_Y_STRENGTH,
  FORCE_COLLIDE,
  FORCE_LINK_STRENGTH,
} from "../../../constants";

const PatchBay = ({ synths }) => {
  const dispatch = usePatchDispatch();
  const svgRef = useRef(null);
  const cable = useRef(null);
  const cableCount = useRef(0);
  const [coords, setCoords] = useState([]);
  const [currentCoord, setCurrentCoord] = useState({});

  const simulationNodeDrawer = useMemo(
    () =>
      d3
        .line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(d3.curveBasis),
    []
  );

  useEffect(() => {
    dispatch({
      type: CLEAR,
    });
  }, [dispatch, synths]);

  const onMouseDown = useCallback(
    (event) => {
      event.stopPropagation();
      const svg = d3.select(svgRef.current);
      let _cable = svg
        .append("path")
        .attr("stroke", d3.schemeCategory10[cableCount.current % 10])
        .attr("stroke-width", 5)
        .attr("fill", "none")
        .attr("id", `cable-${cableCount.current}`);

      cable.current = _cable;

      // Create the nodes
      const nodes = d3.range(CABLE_SEGMENTS).map(() => ({}));

      // Link the nodes
      const links = d3
        .pairs(nodes)
        .map(([source, target]) => ({ source, target }));

      // fix the position of the first node where you clicked
      const { x, y } = transformCoords(svgRef, event.clientX, event.clientY);
      nodes[0].fx = x;
      nodes[0].fy = y;
      nodes[nodes.length - 1].fx = x;
      nodes[nodes.length - 1].fy = y;
      setCurrentCoord({ x1: x, y1: y });

      // use a force simulation to simulate the cable
      const sim = d3
        .forceSimulation(nodes)
        .force("gravity", d3.forceY(FORCE_Y).strength(FORCE_Y_STRENGTH)) // simulate gravity
        .force("collide", d3.forceCollide(FORCE_COLLIDE)) // simulate cable auto disentanglement (cable nodes will push each other away)
        .force("links", d3.forceLink(links).strength(FORCE_LINK_STRENGTH)) // string the cables nodes together
        .on("tick", () =>
          _cable.attr("d", (d) => simulationNodeDrawer(d.nodes))
        ); // draw the path on each simulation tick

      // each cable has its own nodes and simulation
      cable.current.datum({ nodes, sim });
      cableCount.current += 1;
    },
    [simulationNodeDrawer]
  );

  const onMouseUp = useCallback(
    (event) => {
      event.stopPropagation();
      const { x, y } = transformCoords(svgRef, event.clientX, event.clientY);

      if (x === currentCoord.x1 && y === currentCoord.y1) {
        console.log("same position");
        cable.current.remove();
      } else {
        const { x1, y1 } = currentCoord;
        setCoords([...coords, { x1, y1, x2: x, y2: y }]);
        cable.current = undefined;
      }
    },
    [coords, currentCoord]
  );

  const onMouseMove = useCallback((event) => {
    event.stopPropagation();
    if (cable.current) {
      const { nodes, sim } = cable.current.datum();
      const start = nodes[0];
      const end = nodes[nodes.length - 1];

      const { x, y } = transformCoords(svgRef, event.clientX, event.clientY);
      // set new position of the end of the cable
      end.fx = x;
      end.fy = y;

      // measure distance
      const distance = Math.sqrt(
        Math.pow(end.fx - start.fx, 2) + Math.pow(end.fy - start.fy, 2)
      );

      // set the link distance
      sim.force("links").distance(distance / CABLE_SEGMENTS);
      sim.alpha(1);
      sim.restart();
    }
  }, []);

  const onContainerMouseUp = useCallback((event) => {
    event.stopPropagation();
    if (cable.current) {
      cable.current.remove();
    }
  }, []);

  const renderJacks = useCallback(
    (count) => {
      const jacks = [];
      for (let i = 0; i < count; i++) {
        const type = i % 2 === 0 ? IN : OUT;
        jacks.push(
          <Jack
            type={type}
            key={i}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        );
      }
      return jacks;
    },
    [onMouseDown, onMouseUp]
  );

  const renderSections = useCallback(() => {
    return synths.map((synth, index) => {
      const { id, patchBayJackCount } = synth;
      return (
        <div
          key={id}
          className={`jacks ${id.toLowerCase()}-jacks`}
          style={{
            top: `${index * SYNTH_SECTION_HEIGHT}px`,
          }}
        >
          {renderJacks(patchBayJackCount)}
        </div>
      );
    });
  }, [renderJacks, synths]);

  return (
    <div
      className="patch-bay-container"
      onMouseMove={onMouseMove}
      onMouseUp={onContainerMouseUp}
    >
      <div className="svg-container">
        {renderSections()}
        <svg className="svg" ref={svgRef}></svg>
      </div>
    </div>
  );
};

export { PatchBay };
