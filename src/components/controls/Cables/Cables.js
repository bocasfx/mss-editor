import "./Cables.css";
import React, { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";
import {
  FORCE_Y,
  CABLE_SEGMENTS,
  FORCE_Y_STRENGTH,
  FORCE_COLLIDE,
  FORCE_LINK_STRENGTH,
} from "../../../constants";
import { transformCoords } from "../../../utils";

const Cables = () => {
  const d3Container = useRef(null);

  const cable = useRef(null);
  const cableCount = useRef(0);

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
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);

      svg
        .on("mousedown", (event) => {
          // Start a new cable
          let c = svg
            .append("path")
            .attr("stroke", d3.schemeCategory10[cableCount.current % 10])
            .attr("stroke-width", 5)
            .attr("fill", "none");

          cable.current = c;

          // Create the nodes: o  o  o  o  o
          const nodes = d3.range(CABLE_SEGMENTS).map(() => ({}));

          // Link the nodes:  o-->o-->o-->o-->o
          const links = d3
            .pairs(nodes)
            .map(([source, target]) => ({ source, target }));

          // fix the position of the first node where you clicked

          const { x, y } = transformCoords(d3Container, event.clientX, event.clientY);

          nodes[0].fx = x
          nodes[0].fy = y
          nodes[nodes.length - 1].fx = x
          nodes[nodes.length - 1].fy = y

          // use a force simulation to simulate the cable
          const sim = d3
            .forceSimulation(nodes)
            .force("gravity", d3.forceY(FORCE_Y).strength(FORCE_Y_STRENGTH)) // simulate gravity
            .force("collide", d3.forceCollide(FORCE_COLLIDE)) // simulate cable auto disentanglement (cable nodes will push each other away)
            .force("links", d3.forceLink(links).strength(FORCE_LINK_STRENGTH)) // string the cables nodes together
            .on("tick", () =>
              c.attr("d", (d) => simulationNodeDrawer(d.nodes))
            ); // draw the path on each simulation tick

          // each cable has its own nodes and simulation
          cable.current.datum({ nodes, sim });
          cableCount.current += 1;
        })
        .on("mousemove", (event) => {
          if (cable.current) {
            const { nodes, sim } = cable.current.datum();
            const start = nodes[0];
            const end = nodes[nodes.length - 1];

            const { x, y } = transformCoords(d3Container, event.clientX, event.clientY);
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
        })
        .on("mouseup", () => (cable.current = undefined));
    }
  }, [d3Container, cableCount, simulationNodeDrawer]);

  return (
    <svg className="cables-svg" width={400} height={200} ref={d3Container} />
  );
};

export { Cables };
