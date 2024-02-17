import { useEffect, useState } from "react";
const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextItem() {
    setCurrentIndex(currentIndex + 1);
  }
  function previousItem() {
    setCurrentIndex(currentIndex - 1);
  }
  return (
    <div>
      <button onClick={previousItem}>Previous</button>
      <button onClick={nextItem}>Next</button>
    </div>
  );
};
export default Test;
