import { createContext, useContext, useReducer } from "react";
import { saveFile } from "../utils/file";
import { initialState } from "./initialState";
import { CLEAR, DOWNLOAD, OPEN, REORDER, UPDATE } from "../constants/actions";

const Context = createContext(null);
const DispatchContext = createContext(null);

const handleDownload = (patch) => {
  saveFile(patch, "patch.json");
  return { ...patch };
};

// TODO: Not saving the patch correctly
const handleUpdate = (patch, action) => {
  const { id, value } = action;
  const newPatch = { ...patch };
  const [section, element] = id.split(".");
  newPatch[section] = { ...newPatch[section], [element]: value };
  return newPatch;
};

const patchReducer = (patch, action) => {
  switch (action.type) {
    case DOWNLOAD: {
      return handleDownload(patch);
    }
    case OPEN: {
      const { patch: newPatch } = action;
      return { ...JSON.parse(newPatch) };
    }
    case UPDATE: {
      return handleUpdate(patch, action);
    }
    case CLEAR: {
      return { ...initialState };
    }
    case REORDER: {
      return { ...patch, sectionOrder: action.payload };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const PatchProvider = ({ children }) => {
  const [patch, dispatch] = useReducer(patchReducer, initialState);

  return (
    <Context.Provider value={patch}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

const usePatch = () => {
  return useContext(Context);
};

const usePatchDispatch = () => {
  return useContext(DispatchContext);
};

export { PatchProvider, usePatch, usePatchDispatch };
