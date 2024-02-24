import "./OpenPatch.css";
import { usePatchDispatch } from "../../../state/Context";
import { OPEN, LOAD } from "../../../constants/actions";
import { useState } from "react";

const OpenPatch = () => {
  const dispatch = usePatchDispatch();
  const [fileName, setFileName] = useState("");

  const loadHandler = (event) => {
    const patch = event.target.result;
    dispatch({
      type: OPEN,
      patch,
    });
    setFileName('');
  };

  return (
    <label className="open-patch-container">
      <input
        type="file"
        required
        value={fileName}
        onChange={(event) => {
          const reader = new FileReader();
          const file = event.target.files[0];
          reader.removeEventListener(LOAD, loadHandler);
          reader.addEventListener(LOAD, loadHandler);
          reader.readAsText(file);
        }}
      />
      <span>Open</span>
    </label>
  );
};

export { OpenPatch };
