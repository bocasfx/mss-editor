import { createContext, useContext, useReducer } from "react";
import { saveFile } from "../utils/file";
import { initialState } from "./initialState";

const Context = createContext(null);
const DispatchContext = createContext(null);

const handleDownload = (patch) => {
  saveFile(patch, "patch.json");
  return patch;
};

const patchReducer = (patch, action) => {
  switch (action.type) {
    case "download": {
      return handleDownload(patch);
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
