import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./PatchBay.css";
import { Jack } from "../../controls";
import { transformCoords } from "../../../utils";
import { CLEAR, SYNTH_SECTION_HEIGHT } from "../../../constants";
import { usePatchDispatch } from "../../../state/Context";
import * as d3 from "d3";
import {
  FORCE_Y,
  PATCH_CORD_SEGMENTS,
  FORCE_Y_STRENGTH,
  FORCE_COLLIDE,
  FORCE_LINK_STRENGTH,
} from "../../../constants";
import { jackData } from "../../../data";

const PatchBay = ({ synths }) => {
  const dispatch = usePatchDispatch();
  const svgRef = useRef(null);
  const patchCord = useRef(null);
  const patchCordCount = useRef(0);
  const [coords, setCoords] = useState([]);
  const [dragging, setDragging] = useState(false);
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
  }, [dispatch]);

  const calculatePatchCord = useCallback(
    (center) => {
      if (patchCord.current && dragging) {
        console.log("calculatePatchCord");
        const { nodes, sim } = patchCord.current.datum();
        const start = nodes[0];
        const end = nodes[nodes.length - 1];

        const { x, y } = transformCoords(svgRef, center.x, center.y);
        // set new position of the end of the patchCord
        end.fx = x;
        end.fy = y;

        // measure distance
        const distance = Math.sqrt(
          Math.pow(end.fx - start.fx, 2) + Math.pow(end.fy - start.fy, 2)
        );

        // set the link distance
        sim.force("links").distance(distance / PATCH_CORD_SEGMENTS);
        sim.alpha(1);
        sim.restart();
      }
    },
    [dragging]
  );

  const onMouseDown = useCallback(
    (event, type, center) => {
      event.stopPropagation();
      const svg = d3.select(svgRef.current);

      let _patchCord = svg
        .append("path")
        .attr("stroke", d3.schemeCategory10[patchCordCount.current % 10])
        .attr("stroke-width", 5)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
        .attr("id", `patchCord-${patchCordCount.current}`);

      patchCord.current = _patchCord;

      // Create the nodes
      const nodes = d3.range(PATCH_CORD_SEGMENTS).map(() => ({}));

      // Link the nodes
      const links = d3
        .pairs(nodes)
        .map(([source, target]) => ({ source, target }));

      // fix the position of the first node where you clicked
      const { x, y } = transformCoords(svgRef, center.x, center.y);
      nodes[0].fx = x;
      nodes[0].fy = y;
      nodes[nodes.length - 1].fx = x;
      nodes[nodes.length - 1].fy = y;
      setCurrentCoord({ x1: x, y1: y, type });

      // use a force simulation to simulate the patchCord
      const sim = d3
        .forceSimulation(nodes)
        .force("gravity", d3.forceY(FORCE_Y).strength(FORCE_Y_STRENGTH)) // simulate gravity
        .force("collide", d3.forceCollide(FORCE_COLLIDE)) // simulate patchCord auto disentanglement (patchCord nodes will push each other away)
        .force("links", d3.forceLink(links).strength(FORCE_LINK_STRENGTH)) // string the patchCords nodes together
        .on("tick", () =>
          _patchCord.attr("d", (d) => simulationNodeDrawer(d.nodes))
        ); // draw the path on each simulation tick

      // each patchCord has its own nodes and simulation
      patchCord.current.datum({ nodes, sim });
      patchCordCount.current += 1;

      setDragging(true);
    },
    [simulationNodeDrawer]
  );

  const onMouseMove = useCallback(
    (event) => {
      event.stopPropagation();
      calculatePatchCord({ x: event.clientX, y: event.clientY });
    },
    [calculatePatchCord]
  );

  const onMouseUp = useCallback(
    (event, type, center) => {
      event.stopPropagation();

      const { x, y } = transformCoords(svgRef, center.x, center.y);

      if (
        (x === currentCoord.x1 && y === currentCoord.y1) ||
        type === currentCoord.type
      ) {
        patchCord.current.remove();
      } else {
        calculatePatchCord(center);

        const { x1, y1 } = currentCoord;
        setCoords([...coords, { x1, y1, x2: x, y2: y }]);
        patchCord.current = undefined;

        setDragging(false);
      }
    },
    [calculatePatchCord, coords, currentCoord]
  );

  const containerMouseHandler = useCallback((event) => {
    event.stopPropagation();
    if (patchCord.current) {
      patchCord.current.remove();
    }
  }, []);

  const renderJacks = useCallback(
    (id, count) => {
      return jackData[id].map((jack, idx) => {
        const { type } = jack;
        return (
          <Jack
            id={id}
            type={type}
            key={idx}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        );
      });
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
          {renderJacks(id, patchBayJackCount)}
        </div>
      );
    });
  }, [renderJacks, synths]);

  return (
    <div
      className="patch-bay-container"
      onMouseMove={onMouseMove}
      onMouseUp={containerMouseHandler}
      onMouseLeave={containerMouseHandler}
    >
      <div className="svg-container">
        {renderSections()}
        <svg className="svg" ref={svgRef}></svg>
      </div>
    </div>
  );
};

export { PatchBay };
