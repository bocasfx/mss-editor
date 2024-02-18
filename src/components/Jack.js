import "./Jack.css";

const Jack = ({ type, onMouseDown }) => {
  let className = "jack";
  className += type === "in" ? " in" : " out";

  return <div className={className} onMouseDown={onMouseDown}></div>;
};

export { Jack };
