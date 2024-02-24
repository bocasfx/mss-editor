import './Subharmonicon.css';

const Subharmonicon = ({ dragHandleProps }) => {
  return (
    <div className="subharmonicon-container">
      <div className="drag-handle" {...dragHandleProps}></div>
    </div>
  );
}

export { Subharmonicon };
