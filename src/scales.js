import { RATIOS } from "./ratios";

export const modularScale = ({
  base = 16,
  ratio = RATIOS.PERFECT_FOURTH,
  interval = 1,
}) => {
  return (step) => {
    const v = Math.floor(base * Math.pow(ratio, step / interval));

    return v;
  };
};

export const carbonScale = (params = {}) => {
  const { base = 8, intervals = 4, increment = 2 } = params;

  function getStep(step) {
    if (step <= 1) {
      return base;
    }

    return (
      getStep(step - 1) + Math.floor((step - 2) / intervals + 1) * increment
    );
  }

  return (v) => getStep(v + 1);
};
