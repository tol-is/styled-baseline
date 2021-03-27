import { RATIOS } from "./ratios";

export const modularScale = ({
  base = 16,
  ratio = RATIOS.PERFECT_FOURTH,
  interval = 1,
}) => {
  return (step) => {
    const v = Math.floor(base * Math.pow(ratio, step / interval));

    return v; // + (v % 2);
  };
};

export const carbonScale = (params = {}) => {
  const { base = 8, length = 6, intervals = 4, increment = 2 } = params;

  const getStep = (count) => {
    if (count <= 1) {
      return base;
    }

    return (
      getStep(count - 1) + Math.floor((count - 2) / intervals + 1) * increment
    );
  };

  return (step) => getStep(step + 1);
};

export default modularScale;
