import { IN, OUT } from "../constants";

const jackData = {
  DFAM: [
    {
      id: "trigger",
      type: IN,
    },
    {
      id: "vca-cv",
      type: IN,
    },
    {
      id: "vca",
      type: OUT,
    },
    {
      id: "velocity",
      type: IN,
    },
    {
      id: 'vca-decay',
      type: IN,
    },
    {
      id: 'vca-eg',
      type: OUT,
    },
    {
      id: 'ext-audio',
      type: IN,
    },
    {
      id: 'vcf-decay',
      type: IN,
    },
    {
      id: 'vfc-eg',
      type: OUT,
    },
    {
      id: 'noise-level',
      type: IN,
    },
    {
      id: 'vco-decay',
      type: IN,
    },
    {
      id: 'vco-eg',
      type: OUT,
    },
    {
      id: 'vcf-mod',
      type: IN,
    },
    {
      id: 'vco-1-cv',
      type: IN,
    },
    {
      id: 'vco-1',
      type: OUT,
    },
    {
      id: '1-1-fm-amt',
      type: IN,
    },
    {
      id: 'vco-2-cv',
      type: IN,
    },
    {
      id: 'vco-2',
      type: OUT,
    },
    {
      id: 'tempo',
      type: IN,
    },
    {
      id: 'run-stop',
      type: IN,
    },
    {
      id: 'adv-clock',
      type: IN,
    },
    {
      id: 'trigger',
      type: OUT,
    },
    {
      id: 'velocity',
      type: OUT,
    },
    {
      id: 'pitch',
      type: OUT,
    }
  ],
  MOTHER32: [],
  SUBHARMONICON: [],
};

export { jackData };
