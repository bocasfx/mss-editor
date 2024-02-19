import "./Notes.css";

const Notes = ({ id, top, left, width, height, multiline = false }) => {
  return (
    <div className="notes-container">
      {multiline ? (
        <textarea
          id={id}
          placeholder=""
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            position: "absolute",
          }}
        ></textarea>
      ) : (
        <input
          id={id}
          placeholder=""
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            position: "absolute",
          }}
        ></input>
      )}
    </div>
  );
};

export { Notes };
