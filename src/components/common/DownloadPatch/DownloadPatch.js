import './DownloadPatch.css';
import { usePatchDispatch } from "../../../state/Context";
import { DOWNLOAD } from '../../../constants/actions';

const DownloadPatch = () => {
  const dispatch = usePatchDispatch();
  return (
    <>
      <button className='download-patch'
        onClick={() => {
          dispatch({
            type: DOWNLOAD,
          });
        }}
      >
        Download
      </button>
    </>
  );
};

export { DownloadPatch };
