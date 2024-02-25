import { DFAM, MOTHER32, SUBHARMONICON } from "../constants";

const initialState = {
  name: "MSS Patch",
  notes: "This is a patch for the MSS.",
  sectionOrder: [
    {
      id: DFAM,
    },
    {
      id: MOTHER32,
    },
    {
      id: SUBHARMONICON,
    },
  ],
  DFAM: {
    volume: 0,
    VCODecay: 0,
    seq: [
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
      { pitch: 0, velocity: 0 },
    ],
  },
  Mother32: {},
  Subharmonicon: {},
  patchBay: {},
};

export { initialState };
