const transformCoords = (svgRef, clientX, clientY) => {
  const pt = svgRef.current.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const { x, y } = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
  return { x, y };
};

export { transformCoords };
