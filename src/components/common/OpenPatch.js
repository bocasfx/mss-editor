import { usePatchDispatch } from "../../state/Context";

const OpenPatch = () => {
  const dispatch = usePatchDispatch();
  return (
    <label className="open-patch-container">
      <input
        type="file"
        required
        onChange={(event) => {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            (event) => {
              const patch = event.target.result;
              dispatch({
                type: "open",
                patch,
              });
            },
            { once: true }
          );
          reader.readAsText(event.target.files[0]);
        }}
      />
      <span>My Label</span>
    </label>
  );
};

export { OpenPatch };
