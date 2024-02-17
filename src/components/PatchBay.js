import "./PatchBay.css";

const PatchBay = ({ width, height, top, left }) => {
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
    >
    </div>
  );
};

export { PatchBay };
