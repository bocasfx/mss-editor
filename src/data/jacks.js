import { DFAM, IN, MOTHER32, OUT, SUBHARMONICON } from "../constants";

const jackData = {
  [DFAM]: [
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
      id: "vca-decay",
      type: IN,
    },
    {
      id: "vca-eg",
      type: OUT,
    },
    {
      id: "ext-audio",
      type: IN,
    },
    {
      id: "vcf-decay",
      type: IN,
    },
    {
      id: "vfc-eg",
      type: OUT,
    },
    {
      id: "noise-level",
      type: IN,
    },
    {
      id: "vco-decay",
      type: IN,
    },
    {
      id: "vco-eg",
      type: OUT,
    },
    {
      id: "vcf-mod",
      type: IN,
    },
    {
      id: "vco-1-cv",
      type: IN,
    },
    {
      id: "vco-1",
      type: OUT,
    },
    {
      id: "1-1-fm-amt",
      type: IN,
    },
    {
      id: "vco-2-cv",
      type: IN,
    },
    {
      id: "vco-2",
      type: OUT,
    },
    {
      id: "tempo",
      type: IN,
    },
    {
      id: "run-stop",
      type: IN,
    },
    {
      id: "adv-clock",
      type: IN,
    },
    {
      id: "trigger",
      type: OUT,
    },
    {
      id: "velocity",
      type: OUT,
    },
    {
      id: "pitch",
      type: OUT,
    },
  ],
  [MOTHER32]: [
    {
      id: "ext-audio",
      type: IN,
    },
    {
      id: "mix-cv",
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
      id: "noise",
      type: OUT,
    },
    {
      id: "vcf-cutoff",
      type: IN,
    },
    {
      id: "vcf-res",
      type: IN,
    },
    {
      id: "vcf",
      type: OUT,
    },
    {
      id: "vco-1v-oct",
      type: IN,
    },
    {
      id: "vco-lin-fm",
      type: IN,
    },
    {
      id: "vco-saw",
      type: OUT,
    },
    {
      id: "vco-pulse",
      type: OUT,
    },
    {
      id: "vco-mod",
      type: IN,
    },
    {
      id: "lfo-rate",
      type: IN,
    },
    {
      id: "lfo-tri",
      type: OUT,
    },
    {
      id: "lfo-sq",
      type: OUT,
    },
    {
      id: "mix-1",
      type: IN,
    },
    {
      id: "mix-2",
      type: IN,
    },
    {
      id: "vc-mix-ctrl",
      type: IN,
    },
    {
      id: "vc-mix",
      type: OUT,
    },
    {
      id: "mult",
      type: IN,
    },
    {
      id: "mult-1",
      type: OUT,
    },
    {
      id: "mult-2",
      type: OUT,
    },
    {
      id: "assign",
      type: OUT,
    },
    {
      id: "gate",
      type: IN,
    },
    {
      id: "eg",
      type: OUT,
    },
    {
      id: "kb",
      type: OUT,
    },
    {
      id: "gate",
      type: OUT,
    },
    {
      id: "tempo",
      type: IN,
    },
    {
      id: "run-stop",
      type: IN,
    },
    {
      id: "reset",
      type: IN,
    },
    {
      id: "hold",
      type: IN,
    },
  ],
  [SUBHARMONICON]: [
    {
      id: "vco-1",
      type: IN,
    },
    {
      id: "vco-1-sub",
      type: IN,
    },
    {
      id: "vco-1-pwm",
      type: IN,
    },
    {
      id: "vca",
      type: OUT,
    },
    {
      id: "vco-1",
      type: OUT,
    },
    {
      id: "vco-1-sub",
      type: OUT,
    },
    {
      id: "vco-1-sub-2",
      type: OUT,
    },
    {
      id: "vca",
      type: IN,
    },
    {
      id: "vco-2",
      type: IN,
    },
    {
      id: "vco-2-sub",
      type: IN,
    },
    {
      id: "vco-2-pwm",
      type: IN,
    },
    {
      id: "vca-eg",
      type: OUT,
    },
    {
      id: "vco-2",
      type: OUT,
    },
    {
      id: "vco-2-sub-1",
      type: OUT,
    },
    {
      id: "vco-2-sub-2",
      type: OUT,
    },
    {
      id: "cutoff",
      type: IN,
    },
    {
      id: "play",
      type: IN,
    },
    {
      id: "reset",
      type: IN,
    },
    {
      id: "trigger",
      type: IN,
    },
    {
      id: "vcf-eg",
      type: OUT,
    },
    {
      id: "rhythm-1",
      type: IN,
    },
    {
      id: "rhythm-2",
      type: IN,
    },
    {
      id: "rhythm-3",
      type: IN,
    },
    {
      id: "rhythm-4",
      type: IN,
    },
    {
      id: "seq-1",
      type: OUT,
    },
    {
      id: "seq-1-clk",
      type: OUT,
    },
    {
      id: "seq-2",
      type: OUT,
    },
    {
      id: "seq-2-clk",
      type: OUT,
    },
    {
      id: "midi-in",
      type: IN,
    },
    {
      id: "clock",
      type: IN,
    },
    {
      id: "clock",
      type: OUT,
    },
    {
      id: "trigger",
      type: OUT,
    },
  ],
};

export { jackData };
