import './SynthList.css';
import { forwardRef } from "react";

const SynthList = forwardRef(({ children, ...props }, ref) => {
  return (
    <ul ref={ref} className="synth-list">
      {children}
    </ul>
  );
});

export { SynthList };