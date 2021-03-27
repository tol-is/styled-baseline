import { RATIOS } from "./ratios";

export const modularScale = ({
  base = 16,
  ratio = RATIOS.PERFECT_FOURTH,
  interval = 2,
}) => {
  return (step) => {
    const v = Math.floor(base * Math.pow(ratio, step / interval));

    return v + (v % 2);
  };
};

export default modularScale;
