import './DownloadPatch.css';
import { usePatchDispatch } from "../../state/Context";

const DownloadPatch = () => {
  const dispatch = usePatchDispatch();
  return (
    <>
      <button className='download-patch'
        onClick={() => {
          dispatch({
            type: "download",
          });
        }}
      >
        Download
      </button>
    </>
  );
};

export { DownloadPatch };
